import HomeComponent from '@/components/mainmenu/HomeComponent.vue'
import MainComponent from '@/components/member/main.vue'
import LoginComponent from '@/components/member/login.vue'
import JoinComponent from '@/components/member/join.vue'
import FindComponent from '@/components/member/find.vue'

import MainmenuComponent from '@/components/mainmenu/intro/Mainmenu.vue'
import IntroStart1 from '@/components/mainmenu/intro/introstart/IntroStart1.vue'
import IntroStart2 from '@/components/mainmenu/intro/introstart/IntroStart2.vue'
import IntroStart3 from '@/components/mainmenu/intro/introstart/IntroStart3.vue'
import IntroStart4 from '@/components/mainmenu/intro/introstart/IntroStart4.vue'
import OrderingTuto from '@/components/mainmenu/intro/introMenu/OrderingTuto.vue'
import StorageTuto from '@/components/mainmenu/intro/introMenu/StorageTuto.vue'
import BankTuto from '@/components/mainmenu/intro/introMenu/bankTuto.vue'

import maingameComponent from '@/components/maingame/maingame.vue'
import QuizChoice from '@/components/quiz/quizChoice.vue'
import QuizMain from '@/components/quiz/quizMain.vue'
import Counter from '@/components/store/counter.vue'
import Customer from '@/components/store/customer.vue'
import Calculate from '@/components/maingame/calculation.vue'

import OrderingMain from '@/components/ordering/OrderingMain.vue'
import StorageMain from '@/components/storage/StorageMain.vue'

import bankComponent from '@/components/bank/bankMain.vue'
import quizComponent from '@/components/quiz/quizMain.vue'

import Settings from '@/components/common/settings.vue' // 개발용으로 추가가

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
      path: '/find',
      name: 'find',
      component: FindComponent,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: quizComponent
    },

    {
      path: '/bank',
      name: 'bank',
      component: bankComponent
    },
    {
      path: '/maingame',
      name: 'maingame',
      component: maingameComponent,
      children:[
        {
          path:":customerCount",
          components:{
            customer:Customer,
            counter:Counter,
          }
        },
        {
          path:"quiz",
          components:{
            customer:QuizMain,
            counter:QuizChoice,
          }
        }
      ]
    },
    {
      path: '/calculate',
      name: 'calculate',
      component: Calculate,
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
      path:'/linkOrderingTutorial'
      ,name:'linkOrderingTutorial'
      ,component:OrderingTuto
    }
    ,{
      path:'/linkStorageTutorial'
      ,name:'linkStorageTutorial'
      ,component:StorageTuto
    }
       ,{
      path:'/linkBankTutorial'
      ,name:'linkBankTutorial'
      ,component:BankTuto
    }
    ,{
      path:'/introStart'
      ,name:'introStart'
      ,component:IntroStart1
    }
    ,{
      path:'/intro2'
      ,name:'introStart2'
      ,component:IntroStart2
    }
    ,{
      path:'/intro3'
      ,name:'introStart3'
      ,component:IntroStart3
    }
    ,{
      path:'/intro4'
      ,name:'introStart4'
      ,component:IntroStart4
    },
    {
      path:'/orderingMain'
      ,name:'orderingMain'
      ,component:OrderingMain
    },
    {
      path:'/storageMain'
      ,name:'storageMain'
      ,component:StorageMain
    },
    {
      path:'/settings',
      name:'settings',
      component:Settings,
    }
  ],
})

export default router
