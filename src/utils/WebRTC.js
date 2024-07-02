import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function initializeWebSocket(context) { // 변경필요, STOMP 파악필요
  const socket = new SockJS('http://localhost:8080/ws', null, { withCredentials: false });
  context.stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      context.isConnected = true;
      context.statusMessage = 'Connected to WebSocket server';
      context.stompClient.subscribe('/topic/offer', (message) => {console.log(message); handleOffer(context, message)});
      context.stompClient.subscribe('/topic/answer', (message) => handleAnswer(context, message));
    },
    onDisconnect: () => {
      context.isConnected = false;
      context.statusMessage = 'Disconnected from WebSocket server';
    },
    onStompError: (frame) => {
      context.statusMessage = 'Error: ' + frame.headers['message'];
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });
  context.stompClient.activate();
}

export function sendOffer(stompClient, offer) {
  stompClient.publish({ destination: '/app/offer', body: JSON.stringify(offer) });
}

export function sendAnswer(stompClient, answer) {
  stompClient.publish({ destination: '/app/answer', body: JSON.stringify(answer) });
}

export function handleOffer(context, message) {
  try {
    const offer = JSON.parse(message.body);
    context.peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(async () => {
      const answer = await context.peerConnection.createAnswer();
      await context.peerConnection.setLocalDescription(answer);
      if (context.isConnected) {
        sendAnswer(context.stompClient, answer);
        context.statusMessage = 'Received offer and sent answer';
      } else {
        context.statusMessage = 'Error: WebSocket connection is not established';
      }
    });
  } catch (error) {
    console.error('Failed to handle offer:', error);
    context.statusMessage = 'Error handling offer';
  }
}

export function handleAnswer(context, message) {
  try {
    const answer = JSON.parse(message.body);
    if (context.peerConnection.signalingState === 'have-local-offer') {
      context.peerConnection.setRemoteDescription(new RTCSessionDescription(answer)).then(async () => {
        context.statusMessage = 'Call established';
      });
    } else {
      console.error('Failed to handle answer: Incorrect signaling state', context.peerConnection.signalingState);
      context.statusMessage = 'Error: Incorrect signaling state for setting remote description';
    }
  } catch (error) {
    console.error('Failed to handle answer:', error);
    context.statusMessage = 'Error handling answer';
  }
}

export function createPeerConnection(context) {
  context.peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  // context.peerConnection.onicecandidate = event => {
  //   if (event.candidate && context.isConnected) {
  //     context.stompClient.publish({ destination: '/app/candidate', body: JSON.stringify({ candidate: event.candidate }) });
  //   }
  // };

  // context.peerConnection.ontrack = event => {
  //   if (context.remoteVideoRef) {
  //     context.remoteVideoRef.srcObject = event.streams[0];
  //   }
  // };

  // context.localStream.getTracks().forEach(track => {
  //   context.peerConnection.addTrack(track, context.localStream);
  // });
}

export function startLocalVideo(context) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      context.localStream = stream;
      if (context.$refs.local) {
        context.$refs.local.srcObject = stream;
      }
    });
}