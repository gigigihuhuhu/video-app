import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import VideoCallPrev from "../components/VideoCallPrev.vue";
import VideoCall from "../components/VideoCall.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/video-call/prev",
    name: "VideoCallPrev",
    component: VideoCallPrev,
  },
  {
    path: "/video-call",
    name: "VideoCall",
    component: VideoCall
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
