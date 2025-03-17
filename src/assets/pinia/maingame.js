import { defineStore } from 'pinia';

export const revenueStore = defineStore('maingame',{
    state: ()=>({
        salesDay:1,         // N일차
        salesMount:0,       // 판매 수익
        qeezeYN:"N",        // 퀴즈 정답 여부
        feverYN:"N",        // 피버 타임
        disposePrice:0,        // 폐기수익
        orderPrice:0,    // 발주 비용, 양수로 저장할 것.
        cash:500000,             // 잔고

        // playday = salesday, cash = cash
        storagelevel:1,
        loan:1000000,
        playNo:0,
        state:0,    // 이건 봐도 봐도 모르겠다
        userId:'',
    })
})

export const productStore = defineStore('storage',{
    state:()=>({
        product:[
            // product 객체 예시
            // { orderingNo:5, goodsNo:8, playNo:1, goodType:"신선식품", goodsName:"연어", image:'/items/fresh/salmon.png', expDate:999, orderQuantity:10, salePrice:6000, saleDgree:1, disposalYN:'N' }
        ],
        cart:[],
    })
})