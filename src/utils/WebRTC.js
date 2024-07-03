import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function initializeWebSocket(context) {
  const socket = new SockJS("http://localhost:8080/ws", null, {
    withCredentials: false,
  });
  context.stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      context.isConnected = true;
      context.statusMessage = "Connected to WebSocket server";
      context.stompClient.subscribe("/topic/offer", (message) =>
        handleOffer(context, message)
      );
      context.stompClient.subscribe("/topic/answer", (message) =>
        handleAnswer(context, message)
      );
      context.stompClient.subscribe("/topic/candidate", (message) =>
        handleCandidate(context, message)
      );
    },
    onDisconnect: () => {
      context.isConnected = false;
      context.statusMessage = "Disconnected from WebSocket server";
    },
    onStompError: (frame) => {
      context.statusMessage = "Error: " + frame.headers["message"];
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    },
  });
  context.stompClient.activate();
}

export function sendOffer(stompClient, offer, clientId) {
  const offerWithClientId = {
    sdp: offer.sdp,
    type: offer.type,
    clientId: clientId, // Include the unique client ID
  };
  console.log("send offer ", offerWithClientId)
  stompClient.publish({
    destination: "/app/offer",
    body: JSON.stringify(offerWithClientId),
  });
}

export function sendAnswer(stompClient, answer, clientId) {
  const answerWithClientId = {
    sdp: answer.sdp,
    type: answer.type,
    clientId: clientId, // Include the unique client ID
  };
  stompClient.publish({
    destination: "/app/answer",
    body: JSON.stringify(answerWithClientId),
  });
}

export function sendCandidate(stompClient, candidate, clientId) {
  const candidateWithClientId = {
    clientId: clientId,
    candidate: candidate.toJSON()
  };
  console.log("sendCandidate",candidateWithClientId)
  stompClient.publish({
    destination: "/app/candidate",
    body: JSON.stringify(candidateWithClientId),
  });
}

export function handleOffer(context, message) {
  try {
    const offer = JSON.parse(message.body);
    if (offer.clientId === context.getClientId()) {
      return;
    }
    context.remoteNickname = offer.clientId;
    if (context.peerConnection === null) {
      context.createPeerConnection(context);
    }
    context.peerConnection
      .setRemoteDescription(new RTCSessionDescription(offer))
      .then(async () => {
        const answer = await context.peerConnection.createAnswer();
        await context.peerConnection.setLocalDescription(answer);
        if (context.isConnected) {
          sendAnswer(context.stompClient, answer, context.getClientId());
          context.statusMessage = "Received offer and sent answer";
        } else {
          context.statusMessage =
            "Error: WebSocket connection is not established";
        }
      });
  } catch (error) {
    console.error("Failed to handle offer:", error);
    context.statusMessage = "Error handling offer";
  }
}

export function handleAnswer(context, message) {
  try {
    const answer = JSON.parse(message.body);
    if (answer.clientId === context.getClientId()) {
      return;
    }
    console.log("revceived answer", answer);
    if (context.peerConnection.signalingState === "have-local-offer") {
      context.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      context.remoteNickname = answer.clientId;
    } else {
      console.error(
        "Failed to handle answer: Incorrect signaling state",
        context.peerConnection.signalingState
      );
      context.statusMessage =
        "Error: Incorrect signaling state for setting remote description";
    }
  } catch (error) {
    console.error("Failed to handle answer:", error);
    context.statusMessage = "Error handling answer";
  }
}

//TODO: Check RemoteDescriptionSet Error: Cannot read properties of null (reading 'remoteDescription')
export async function handleCandidate(context, message) {
  try {
    const body = JSON.parse(message.body);
    if (body.clientId === context.getClientId()) {
      return;
    }
    const candidate = new RTCIceCandidate(body.candidate);
    console.log("revceived candidate", candidate);
    if(candidate && context.peerConnection.remoteDescription){
      try {
        await context.peerConnection.addIceCandidate(candidate);
        console.log("added candidate")
      } catch (e) {
        console.error('Error adding received ice candidate', e);
      }
    }
    else {
      // Queue the candidate if remote description is not yet set
      // context.iceCandidateQueue.push(candidate);
      // console.log('Queued ICE candidate', candidate);
    }
  } catch (error) {
    console.error('Failed to handle candidate:', error);
    context.statusMessage = 'Error handling candidate';
  }
}

export function createPeerConnection(context) {
  context.peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });
  
  context.localStream.getTracks().forEach(track => {
    context.peerConnection.addTrack(track, context.localStream);
  });

  context.peerConnection.addEventListener("connectionstatechange", () => {
    if (context.peerConnection.connectionState === "connected") {
      context.statusMessage = "Call established";
      context.isEstablished = true;
    }
  });

  context.peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      sendCandidate(context.stompClient, event.candidate, context.getClientId());
    }
  });

  context.peerConnection.addEventListener('track', async (event) => {
    if (context.$refs.remote) {
      event.streams.forEach(stream =>{
        context.$refs.remote.srcObject = stream;
      })
    }
  });
}

export function startLocalVideo(context) {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      context.localStream = stream;
      if (context.$refs.local) {
        context.$refs.local.srcObject = stream;
      }
    });
}
