<template>
  <div>
    <LocalVideo></LocalVideo>
    <RemoteVideo></RemoteVideo>
    <button @click="call">Call</button>
    <p>{{ statusMessage }}</p>
  </div>
</template>

<script>
import { initializeWebSocket, sendOffer } from './signaling/signaling';
import { createPeerConnection, startLocalVideo } from './signaling/webRTC';
import LocalVideo from './LocalVideo.vue';
import RemoteVideo from './RemoteVideo.vue';

export default {
  components: {
    LocalVideo,
    RemoteVideo,
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
    };
  },
  mounted() {
    this.initializeWebSocket();
    startLocalVideo(this);
  },
  methods: {
    initializeWebSocket() {
      initializeWebSocket(this);
    },
    createPeerConnection() {
      createPeerConnection(this);
    },
    async call() {
      if (!this.isConnected) {
        this.statusMessage = 'Not connected to WebSocket server';
        return;
      }
      this.createPeerConnection();
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      if (this.isConnected) {
        sendOffer(this.stompClient, offer);
        this.statusMessage = 'Call initiated, waiting for answer...';
      } else {
        this.statusMessage = 'Error: WebSocket connection is not established';
      }
    },
  },
};
</script>

<style scoped>
video {
  width: 300px;
  height: 200px;
  margin: 10px;
}
</style>
