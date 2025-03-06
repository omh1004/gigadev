

import HomeComponent from '@/components/HomeComponent.vue'

import MainComponent from '@/components/member/main.vue'
import LoginComponent from '@/components/member/login.vue'
import JoinComponent from '@/components/member/join.vue'
import quizComponent from '@/components/quiz/quizMain.vue'
import productComponent from '@/components/product/productMain.vue'
import tutorialComponent from '@/components/tutorial/totorialMain.vue'
import bankComponent from '@/components/bank/bankMain.vue'
import maingameComponent from '@/components/maingame/maingame.vue'
import { createRouter, createWebHistory } from 'vue-router'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainComponent,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/join',
      name: 'join',
      component: JoinComponent,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: quizComponent
        },
    {
      path: '/product',
      name: 'product',
      component: productComponent
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: tutorialComponent
    },
    {
      path: '/bank',
      name: 'bank',
      component: bankComponent
    },
    {
      path: '/maingame',
      name: 'maingame',
      component: maingameComponent
    },
  ],
})

export default router
