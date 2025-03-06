

import HomeComponent from '@/components/mainmenu/HomeComponent.vue'
import IntroStartComponent from '@/components/mainmenu/intro/IntroStart.vue'
import MainComponent from '@/components/member/main.vue'
import LoginComponent from '@/components/member/login.vue'
import JoinComponent from '@/components/member/join.vue'
import quizComponent from '@/components/quiz/quizMain.vue'
import productComponent from '@/components/product/productMain.vue'
import MainmenuComponent from '@/components/mainmenu/intro/Mainmenu.vue'
import bankComponent from '@/components/bank/bankMain.vue'
import maingameComponent from '@/components/maingame/maingame.vue'
import { createRouter, createWebHistory } from 'vue-router'
import OrderingTuto from '@/components/mainmenu/intro/introMenu/OrderingTuto.vue'
import StorageTuto from '@/components/mainmenu/intro/introMenu/StorageTuto.vue'
import bankTuto from '@/components/mainmenu/intro/introMenu/bankTuto.vue'
import BankTuto from '@/components/mainmenu/intro/introMenu/bankTuto.vue'





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
    // {
    //   path: '/tutorial',
    //   name: 'tutorial',
    //   component: tutorialComponent
    // },
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
    {
      path: '/homeMenu',
      name: 'menu',
      component: HomeComponent 
    },
    {
      path: '/mainmenu',
      name: 'mainmenu',
      component: MainmenuComponent,
    },
    {
      path: '/introStart'
      ,name:'introStart'
      ,component:IntroStartComponent
    },
    {
      path:'/linkOrderingTutorial'
      ,name:'linkOrderingTutorial'
      ,component:OrderingTuto
    }
    ,{
      path:'/linkStorageTutorial'
      ,name:'linkStorageTutorial'
      ,component:StorageTuto
    }
    ,   ,{
      path:'/linkBankTutorial'
      ,name:'linkBankTutorial'
      ,component:BankTuto
    }
  ],
})

export default router
