// src/components/signaling/webRTC.js

export function startLocalVideo(context) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      context.localStream = stream;
      if (context.localVideoRef) {
        context.localVideoRef.srcObject = stream;
      }
    });
}

export function createPeerConnection(context) {
  context.peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  context.peerConnection.onicecandidate = event => {
    if (event.candidate && context.isConnected) {
      context.stompClient.publish({ destination: '/app/candidate', body: JSON.stringify({ candidate: event.candidate }) });
    }
  };

  context.peerConnection.ontrack = event => {
    if (context.remoteVideoRef) {
      context.remoteVideoRef.srcObject = event.streams[0];
    }
  };

  context.localStream.getTracks().forEach(track => {
    context.peerConnection.addTrack(track, context.localStream);
  });
}
