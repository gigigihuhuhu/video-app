<template>
  <div class="videocall-container">
    <h1 class="title">Video Call</h1>
    <div class="video-container">
      <div class="local-video-wrapper">
        <p class="nickname">{{ nickname }}</p>
        <video ref="local" autoplay playsinline class="video"></video>
      </div>
      <div class="remote-video-wrapper">
        <p class="nickname">{{ remoteNickname }}</p>
        <video ref="remote" autoplay playsinline class="video"></video>
      </div>
    </div>
    <button @click="call" class="button">Call</button>
    <button @click="getConnState" class="button">Connection State</button>
    <p class="status-message">{{ statusMessage }}</p>
  </div>
</template>

<script>
import { createPeerConnection, startLocalVideo, initializeWebSocket, sendOffer } from '@/utils/WebRTC';

export default {
  name: 'VideoCall',
  props: {
    nickname: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      stompClient: null,
      isConnected: false,
      statusMessage: 'Connecting to WebSocket server...',
      iceCandidateQueue: [],
      remoteNickname: 'Waiting for remote',
      isEstablished: false
    };
  },
  async mounted() {
    startLocalVideo(this);
    initializeWebSocket(this);
  },
  methods: {
    getClientId() {
      return this.nickname
    },
    getConnState() {
      console.log(this.peerConnection)
    },
    async call() {
      if (!this.isConnected) {
        this.statusMessage = 'Not connected to WebSocket server';
        return;
      }

      await createPeerConnection(this);

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      if (this.isConnected) {
        sendOffer(this.stompClient, offer, this.getClientId());
        this.statusMessage = 'Call initiated, waiting for answer...';
      } else {
        this.statusMessage = 'Error: WebSocket connection is not established';
      }
    }
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.videocall-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f0f2f5;
  color: #333;
  font-family: 'Roboto', sans-serif;
}

.title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  margin-top: 50px;
}

.video-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.local-video-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 10px;
}

.remote-video-wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 10px;
}

.nickname {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #555;
}

.video {
  width: 400px;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.button {
  padding: 0.7rem 2rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.status-message {
  font-size: 1rem;
  color: #555;
  margin-top: 1rem;
}
</style>
