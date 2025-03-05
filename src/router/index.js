
import HomeComponent from '@/components/HomeComponent.vue'
import quizComponent from '@/components/quiz/quizMain.vue'
import productComponent from '@/components/product/productMain.vue'
import tutorialComponent from '@/components/tutorial/totorialMain.vue'
import bankComponent from '@/components/bank/bankMain.vue'
import { createRouter, createWebHistory } from 'vue-router'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: HomeComponent,
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
    
  ],
})

export default router
