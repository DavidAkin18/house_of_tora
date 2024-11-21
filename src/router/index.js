import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Lotion from '@/views/Lotion.vue'
import Scrub from '@/views/Scrub.vue'
import FaceWash from '@/views/FaceWash.vue'
import Shower from '@/views/Shower.vue'
import BodyOil from '@/views/BodyOil.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/lotion',
    name:'lotion',
    component:Lotion
  },
  {
    path:'/scrub',
    name:'scrub',
    component:Scrub
  },
  {
    path:'/faceWash',
    name:'faceWash',
    component:FaceWash
  },
  {
    path:'/shower',
    name:'shower',
    component:Shower
  },
  {
    path:'/bodyOil',
    name:'bodyOil',
    component:BodyOil
  },
  
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
