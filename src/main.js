import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import commonFunctions from './plugins/commonFunctions';

const app = createApp(App);
app.use(router)
app.use(commonFunctions)
app.mount('#app')