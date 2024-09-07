<template>
  <div class="videocall-container">
    <h1 class="title">경수의 방</h1>
    <div class="video-container">
      <div class="local-video-wrapper" v-show=!isSneaker>
        <p class="nickname">{{ clientId }}</p>
        <video ref="local" autoplay playsinline class="video"></video>
      </div>
      <div class="remote-video-wrapper" v-for="(remoteInfo) in remote" :key="remoteInfo.index" v-show="remoteInfo.isSneaker!=true">
        <p class="nickname">{{ remoteInfo.clientId }}</p>
        <video :ref="'videoRef' + remoteInfo.index" autoplay playsinline class="video"></video>
      </div>
    </div>
    <button @click="getConnState" class="button">Connection State</button>
    <p class="status-message">{{ statusMessage }}</p>
  </div>
</template>

<script>
import { initializeWebSocket, sendBye } from '@/utils/WebRTC';

export default {
  name: 'VideoCall',
  data() {
    return {
      localStream: null,
      stompClient: null,
      isConnected: false,
      statusMessage: 'Connecting to WebSocket server...',
      clientId: this.$route.params.clientId,
      isSneaker: this.$route.params.isSneaker === 'true' ? true : false,
      remote: [], /* {
                      index : null
                      clientId : message.clientId,
                      sdp : message.sdp,
                      type: message.type,
                      peerConnection : null,
                      isEstablished : false,
                      statusMessage : ''
                    }*/
      candidateQueue: []
    };
  },
  async mounted() {
    this.remote = []
    this.stompClient = null
    this.startLocalVideo();
    initializeWebSocket(this);
    this.startInterval();
    window.addEventListener('beforeunload', this.cleanup);
  },
  methods: {
    startInterval() {
      setInterval(() => {
        this.processCandidateQueue();
      }, 1000);
    },

    getConnState() {
      for (let e of this.remote) {
        console.log(e)
      }
    },

    getRemoteInfoByClientId(clientId) {
      for (let e of this.remote) {
        if (e.clientId === clientId) {
          return e
        }
      }
      return null;
    },

    async startLocalVideo() {
      await navigator.mediaDevices
        .getUserMedia({ 
          video: true, 
          audio: {
            echoCancellation: true, // 에코 취소 활성화
            noiseSuppression: true,  // 잡음 제거 활성화
            autoGainControl: true    // 자동 게인 제어
          } 
        })
        .then((stream) => {
          if (this.$refs.local && !this.isSneaker) {
            this.localStream = stream;
            this.$refs.local.srcObject = stream;
            this.$refs.local.muted = true; // 자신의 오디오는 음소거
          }
        });
    },

    async processCandidateQueue() {
      let queue = [];
      while (this.candidateQueue.length > 0) {
        let message = this.candidateQueue.pop();
        let remoteInfo = this.getRemoteInfoByClientId(message.clientId);
        const candidate = new RTCIceCandidate(message.candidate);
        if (
          candidate &&
          remoteInfo &&
          remoteInfo.peerConnection.remoteDescription
        ) {
          await remoteInfo.peerConnection.addIceCandidate(candidate);
          console.log("added candidate");
        } else {
          queue.push(message);
          console.log("queued candidate :" + candidate);
        }
      }
      this.candidateQueue = queue.slice();
    },

    cleanup(){
      if (this.stompClient) {
        this.stompClient.deactivate();
        sendBye(this);
      }
    }
  },

  beforeUnmount() {
    this.cleanup();
    window.removeEventListener('beforeunload', this.cleanup);
  }
};
</script>

<style scoped>
html,
body {
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
  flex-wrap: wrap; /* 추가: 넘칠 경우 새로운 줄로 넘어가도록 설정 */
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
  border-radius: 50px;
  margin: 10px; /* 추가: 각 video 사이에 공간을 주기 위해 여백 설정 */
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
