import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function initializeWebSocket(context) {
  const socket = new SockJS('http://localhost:8080/ws', null, { withCredentials: false });
  context.stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      context.isConnected = true;
      context.statusMessage = 'Connected to WebSocket server';
      context.stompClient.subscribe('/topic/offer', (message) => handleOffer(context, message));
      context.stompClient.subscribe('/topic/answer', (message) => handleAnswer(context, message));
      context.stompClient.subscribe('/topic/candidate', (message) => handleCandidate(context, message));
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

export function handleOffer(context, message) {
  try {
    const offer = JSON.parse(message.body);
    if (!context.peerConnection) {
      context.createPeerConnection();
    }
    context.peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(async () => {
      const answer = await context.peerConnection.createAnswer();
      await context.peerConnection.setLocalDescription(answer);
      if (context.isConnected) {
        context.stompClient.publish({ destination: '/app/answer', body: JSON.stringify(answer) });
        context.statusMessage = 'Received offer and sent answer';
      } else {
        context.statusMessage = 'Error: WebSocket connection is not established';
      }
      // Add queued ICE candidates
      while (context.iceCandidateQueue.length > 0) {
        const candidate = context.iceCandidateQueue.shift();
        await context.peerConnection.addIceCandidate(candidate);
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
        // Add queued ICE candidates
        while (context.iceCandidateQueue.length > 0) {
          const candidate = context.iceCandidateQueue.shift();
          await context.peerConnection.addIceCandidate(candidate);
        }
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

export function handleCandidate(context, message) {
  try {
    const candidate = new RTCIceCandidate(JSON.parse(message.body).candidate);
    if (context.peerConnection.remoteDescription) {
      context.peerConnection.addIceCandidate(candidate);
      context.statusMessage = 'Received ICE candidate';
    } else {
      // Queue the candidate if remote description is not yet set
      context.iceCandidateQueue.push(candidate);
      context.statusMessage = 'Queued ICE candidate';
    }
  } catch (error) {
    console.error('Failed to handle candidate:', error);
    context.statusMessage = 'Error handling candidate';
  }
}
