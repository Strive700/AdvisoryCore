import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login-initial',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/realtime-panel',
      name: 'realtime-panel',
      component: () => import('@/views/RealtimePanelView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user-profile-chat',
      name: 'user-profile-chat',
      component: () => import('@/views/UserProfileChatView.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ],
})

export default router
