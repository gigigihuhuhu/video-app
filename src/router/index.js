import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import VideoCall from '../components/VideoCall.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/video-call/:nickname',
    name: 'VideoCall',
    component: VideoCall,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;