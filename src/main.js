import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import 'remixicon/fonts/remixicon.css';
import VueScrollTo from 'vue-scrollto';

createApp(App).use(router).use(VueScrollTo).mount('#app')
