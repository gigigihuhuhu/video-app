import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function initializeWebSocket(context) {
  const socket = new SockJS(process.env.VUE_APP_WEB_SOCKET_SERVER, null, {
    withCredentials: false,
  });
  context.stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      context.isConnected = true;
      context.statusMessage = "Connected to WebSocket server";
      context.stompClient.subscribe("/topic/hello", (message) => {
        const body = JSON.parse(message.body);
        if (body.clientId === context.clientId) {
          return;
        }
        handleHello(context, body);
      });

      context.stompClient.subscribe("/topic/bye", (message) => {
        const body = JSON.parse(message.body);
        if (body.clientId === context.clientId) {
          return;
        }
        handleBye(context, body);
      });

      context.stompClient.subscribe("/user/queue/offer", (message) => {
        handleOffer(context, JSON.parse(message.body));
      });
      context.stompClient.subscribe("/user/queue/answer", (message) => {
        handleAnswer(context, JSON.parse(message.body));
      });
      context.stompClient.subscribe("/user/queue/candidate", (message) => {
        handleCandidate(context, JSON.parse(message.body));
      });

      sendHello(context);
    },
    onDisconnect: () => {
      // reomote 정보 초기화 필요.
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

export async function sendOffer(stompClient, fromClientId, toClientId, remoteInfo, isSneaker) {
  const offer = await remoteInfo.peerConnection.createOffer();
  await remoteInfo.peerConnection.setLocalDescription(offer);
  const offerWithClientId = {
    sdp: offer.sdp,
    type: offer.type,
    clientId: fromClientId, // Include the unique client ID
    isSneaker: isSneaker
  };
  console.log("send offer ", offerWithClientId, toClientId);
  stompClient.publish({
    destination: "/app/offer/"+toClientId,
    body: JSON.stringify(offerWithClientId),
  });
}

async function sendAnswer(stompClient, fromClientId, toClientId, remoteInfo) {
  await remoteInfo.peerConnection.setRemoteDescription(
    new RTCSessionDescription(remoteInfo)
  );
  const answer = await remoteInfo.peerConnection.createAnswer();
  await remoteInfo.peerConnection.setLocalDescription(answer);

  const answerWithClientId = {
    sdp: answer.sdp,
    type: answer.type,
    clientId: fromClientId, // Include the unique client ID
  };
  console.log("send answer ", answerWithClientId, toClientId);
  stompClient.publish({
    destination: "/app/answer/"+toClientId,
    body: JSON.stringify(answerWithClientId),
  });
}

function sendCandidate(stompClient, fromClientId, toClientId, candidate) {
  const candidateWithClientId = {
    clientId: fromClientId,
    candidate: candidate.toJSON(),
  };
  console.log("sendCandidate", candidateWithClientId, toClientId);
  stompClient.publish({
    destination: "/app/candidate/"+toClientId,
    body: JSON.stringify(candidateWithClientId),
  });
}

function sendHello(context) {
  let helloMessage = {
    clientId: context.clientId,
    isSneaker: context.isSneaker
  };
  console.log("sendHello", helloMessage);
  context.stompClient.publish({
    destination: "/app/hello",
    body: JSON.stringify(helloMessage),
  });
}

export function sendBye(context) {
  let byeMessage = {
    clientId: context.clientId
  };
  console.log("sendBye", byeMessage);
  context.stompClient.publish({
    destination: "/app/bye",
    body: JSON.stringify(byeMessage),
  });
}

async function handleHello(context, message) {
  console.log("received hello", message);

  if(context.isSneaker && message.isSneaker){
    return;
  }
  
  let remoteInfo = {
    index: null,
    clientId: message.clientId,
    sdp: null,
    type: null,
    peerConnection: null,
    isEstablished: false,
    statusMessage: "Received hello",
    isSneaker: message.isSneaker
  };

  createPeerConnection(context, remoteInfo);
  sendOffer(context.stompClient, context.clientId, remoteInfo.clientId, remoteInfo, context.isSneaker);
  remoteInfo.statusMessage = "Call initiated, waiting for answer...";
  remoteInfo.index = context.remote.length;
  context.remote.push(remoteInfo);
}

async function handleBye(context, message) {
  console.log("received bye", message);
  let remoteInfo = context.getRemoteInfoByClientId(message.clientId);
  remoteInfo.peerConnection.close();
  remoteInfo.statusMessage = "Closed";
  context.remote.splice(remoteInfo.index, 1);
}

async function handleOffer(context, message) {
  console.log("received offer", message);
  let remoteInfo = {
    index: null,
    clientId: message.clientId,
    sdp: message.sdp,
    type: message.type,
    peerConnection: null,
    isEstablished: false,
    statusMessage: "Received hello",
    isSneaker: message.sneaker
  };

  createPeerConnection(context, remoteInfo);
  sendAnswer(context.stompClient, context.clientId, remoteInfo.clientId, remoteInfo);
  remoteInfo.statusMessage = "Received offer and sent answer";
  remoteInfo.index = context.remote.length;
  context.remote.push(remoteInfo);
  context.processCandidateQueue();
}

async function handleAnswer(context, message) {
  console.log("received answer", message);
  let remoteInfo = context.getRemoteInfoByClientId(message.clientId);
  remoteInfo.sdp = message.sdp;
  remoteInfo.type = message.type;

  if (remoteInfo.peerConnection.signalingState === "have-local-offer") {
    await remoteInfo.peerConnection.setRemoteDescription(
      new RTCSessionDescription(remoteInfo)
    );
  }

  context.processCandidateQueue();
}

async function handleCandidate(context, message) {
  console.log("received candidate", message);
  let remoteInfo = context.getRemoteInfoByClientId(message.clientId);
  const candidate = new RTCIceCandidate(message.candidate);

  if (candidate && remoteInfo && remoteInfo.peerConnection.remoteDescription) {
    await remoteInfo.peerConnection.addIceCandidate(candidate);
    console.log("added candidate");
  } else {
    context.candidateQueue.push(message);
    console.log("queued candidate :" + candidate);
  }
}

function createPeerConnection(context, remoteInfo) {
  remoteInfo.peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  if (context.localStream) {
    context.localStream.getTracks().forEach((track) => {
      remoteInfo.peerConnection.addTrack(track, context.localStream);
    });
  }

  remoteInfo.peerConnection.addEventListener(
    "connectionstatechange",
    (event) => {
      console.log("connectionstatechange event");
      console.log(event);
      if (remoteInfo.peerConnection.connectionState === "connected") {
        remoteInfo.statusMessage = "Call established";
        remoteInfo.isEstablished = true;
      }
    }
  );

  remoteInfo.peerConnection.addEventListener("icecandidate", (event) => {
    console.log("icecandidate event" );
    console.log(event)
    console.log(remoteInfo.clientId)
    if (event.candidate) {
      sendCandidate(
        context.stompClient,
        context.clientId,
        remoteInfo.clientId,
        event.candidate
      );
    }
  });

  remoteInfo.peerConnection.addEventListener("track", async (event) => {
    console.log("track event");
    console.log(event);
    if (context.$refs["videoRef" + remoteInfo.index]) {
      event.streams.forEach((stream) => {
        context.$refs["videoRef" + remoteInfo.index][0].srcObject = stream;
      });
    }
  });
}


