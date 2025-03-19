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
    }),
    actions:{
        saveState(){
            localStorage.setItem('maingame',JSON.stringify(this.$state));
        },
        loadState(){
            const saveState = localStorage.getItem('maingame');
            if(saveState){
                this.$patch(JSON.parse(saveState));
            }
        },
    }
})

export const productStore = defineStore('storage',{
    state:()=>({
        product:[
            // product 객체 예시
            // { orderingNo:5, goodsNo:8, playNo:1, goodType:"신선식품", goodsName:"연어", image:'/items/fresh/salmon.png', expDate:999, orderQuantity:10, salePrice:6000, saleDgree:1, disposalYN:'N' }
        ],
        cart:[],
    }),
    actions:{
        decreaseQuantity(p,p50){
            console.log("product", this.product);
            console.log("ppp", p50, p);
            if(p50!=null){
                while(p50.orderQuantity>0){
                    const prod = this.product.find(pro=>pro.goodsName==p50.goodsName && pro.expDate==1 && pro.orderQuantity>0);
                    console.log("abc",prod);
                    if(prod.orderQuantity>=p50.orderQuantity){
                        prod.orderQuantity -= p50.orderQuantity;
                        p50.orderQuantity=0;
                        console.log("prod quantity 줄임?", prod.orderQuantity);
                    }else{
                        p50.orderQuantity -= prod.orderQuantity;
                        prod.orderQuantity=0;
                        console.log("prod quantity 텅텅 빔?", prod.orderQuantity)
                    }
                }
            }else if(p!=null){
                while(p.orderQuantity>0){
                    const prod = this.product.find(pro=>pro.goodsName==p.goodsName && pro.expDate>=2 && pro.orderQuantity>0);
                    console.log("efg",prod);
                    if(prod.orderQuantity>=p.orderQuantity){
                        prod.orderQuantity -= p.orderQuantity;
                        p.orderQuantity=0;
                        console.log("prod quantity 줄임?", prod.orderQuantity);
                    }else{
                        p.orderQuantity -= prod.orderQuantity;
                        prod.orderQuantity=0;
                        console.log("prod quantity 텅텅 빔?", prod.orderQuantity)
                    }
                }
            }
            this.saveState();
        },
        saveState(){
            localStorage.setItem('product',JSON.stringify(this.$state));
            console.log(localStorage.getItem('product'));
        },
        loadState(){
            const saveState = localStorage.getItem('product');
            if(saveState){
                this.$patch(JSON.parse(saveState));
            }
        }
    }
})