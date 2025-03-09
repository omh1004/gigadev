<template>
    <div v-show="quiztime" class="quiztime">
        <img src="@/resources/quiz_time.png">
    </div>
    <div class="maingame">
        <div class="topbar">
            <p>D-30</p>
            <div style="display:flex;">
                <!-- <img src="@/resources/timer.png" width="10" height="52"> -- -->
                <div class="timebar-container">
                    <div class="timerbar">
                        <div v-show="timebar>0" class="timeleft" :style="`width:${timebar}vw`"></div>
                    </div>
                    <p class="time">{{ timeleft }}초</p>
                </div>
            </div>
            <div style="display:flex;align-items:center;">
                <img src="@/resources/person.png" width="40" height="40">
                <p style="margin:0;">{{ customerCount }}/10</p>
            </div>
            <div style="display:flex;align-items:center;">
                <div class="moneybar">
                    <img src="@/resources/money.png" width="48" height="48">
                    <div class="line"></div>
                    <div class="money"><p>0원</p></div>
                </div>
                <img src="@/resources/gameoption.png" width="40" height="40">
            </div>
        </div>
        <div class="product-container">
            <cartNquiz :customerA="customerA" :quizNum="quizNum" :interval="interval" :timeleft="timeleft" :cart="cart"
                        :noclick="noclick" @quizTime="quizTime" @customer="customer" @revertprod="revertprod" @rollback="rollback"
                        @notclick="notclick"/>
            <Product :product="product" :countermodal="countermodal" :countertarget="countertarget" :timeleft="timeleft"
                        :noclick="noclick" :quizblind="quizblind" @moveprod="moveprod" @closemodal="closemodal"/>
        </div>
    </div>
</template>
<script scoped>
import cartNquiz from './cartnquiz.vue';
import Product from './product.vue';

export default {
    data(){
        return{
            quizblind:false,
            timebar:30,
            quiztime:false,
            quizNum:Math.floor(Math.random()*10),
            timeleft:3,
            interval:'',
            customerCount:1,
            customerA:Math.floor(Math.random()*9),
            // 구매, 판매 시에는 product만 수정, 하루가 끝날 때 DB에 저장
            product:[
                { id:"strawberry",name:"딸기",amount:10,src:"/src/assets/tutorial/fruit/strawberry.png",sell:0,price:1000,type:'a', },
                { id:"pineapple",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/fineapple.png",sell:0,price:1000,type:'b', },
                { id:"strawberry_50",name:"딸기",amount:3,src:"/src/assets/tutorial/fruit/Group 2348.png",sell:0,price:1000,type:'a', },
                { id:"pineapple_50",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/Frame 7370.png",sell:0,price:1000,type:'b', },
                // 스크롤바 확인 용도 데이터. 절대 사용하지 마시오!
                // { id:"strawberry",name:"딸기",amount:10,src:"/src/assets/tutorial/fruit/strawberry.png",sell:0,price:1000,type:'a', },
                // { id:"pineapple",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/fineapple.png",sell:0,price:1000,type:'b', },
                // { id:"strawberry_50",name:"딸기",amount:3,src:"/src/assets/tutorial/fruit/Group 2348.png",sell:0,price:1000,type:'a', },
                // { id:"pineapple_50",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/Frame 7370.png",sell:0,price:1000,type:'b', },
                // { id:"strawberry",name:"딸기",amount:10,src:"/src/assets/tutorial/fruit/strawberry.png",sell:0,price:1000,type:'a', },
                // { id:"pineapple",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/fineapple.png",sell:0,price:1000,type:'b', },
                // { id:"strawberry_50",name:"딸기",amount:3,src:"/src/assets/tutorial/fruit/Group 2348.png",sell:0,price:1000,type:'a', },
                // { id:"pineapple_50",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/Frame 7370.png",sell:0,price:1000,type:'b', },
                // { id:"strawberry",name:"딸기",amount:10,src:"/src/assets/tutorial/fruit/strawberry.png",sell:0,price:1000,type:'a', },
                // { id:"pineapple",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/fineapple.png",sell:0,price:1000,type:'b', },
                // { id:"strawberry_50",name:"딸기",amount:3,src:"/src/assets/tutorial/fruit/Group 2348.png",sell:0,price:1000,type:'a', },
                // { id:"pineapple_50",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/Frame 7370.png",sell:0,price:1000,type:'b', },
            ],
            // 판매 시 cart 초기화
            cart:[],
            // product -> product / cart -> cart를 막기 위한 값. 'prod','cart'
            dragtarget:'',
            countermodal:false,
            countertarget:{},
            noclick:false,
        }
    },
    methods:{
        quizTime(){
            this.quiztime=true;
            this.timebar=800;
            this.timeleft=30;   // 빠른 진행 : 3초 설정
            console.log(this.customerCount);
            setTimeout(()=>{
                this.quiztime=false;
                this.timer();
            },3000);
        },
        customer(){
            this.cart=[];
            this.timebar=30;
            this.timeleft=30;   // 빠른 진행 : 3초 설정
            this.customerA=Math.floor(Math.random()*9)
            this.timer();
        },
        timer(){
            const quizstart = new Date();
            let quizend = new Date();
            this.interval = setInterval(()=>{
                if(this.timebar<=0){
                    this.timebar=0;
                    this.timeleft=0;
                    clearInterval(this.interval);
                }
                quizend = new Date();
                this.timebar = 30/30*(30-(quizend-quizstart)/1000);           // 빠른 진행 : 3초 설정
                this.timeleft = 30-Math.floor((quizend-quizstart)/1000);       // 빠른 진행 : 3초 설정
            },50)
        },
        moveprod(container,prodid){
            const prod = this.product.find(p=>p.id==prodid);
            const cartprod = this.cart.find(c=>c.id==prodid);
            if(container=='prod'){
                if(prod.sell>0){
                    if(cartprod==null){
                        this.cart.push({...prod,amount:prod.sell,sell:0});
                    }else{
                        cartprod.amount+=prod.sell;
                    }
                    prod.amount-=prod.sell;
                    prod.sell=0;
                }
            }else if(container=='cart'){
                if(cartprod.sell>0){
                    if(prod==null){
                        this.product.push({...cartprod,amount:cartprod.sell,sell:0});
                    }else{
                        prod.amount+=cartprod.sell;
                    }
                    cartprod.amount-=cartprod.sell;
                    cartprod.sell=0;
                }
                this.countermodal=false;
            }
        },
        revertprod(modal,target){
            console.log("3!");
            this.countermodal=modal;
            this.countertarget=target;
            console.log(this.countermodal);
            console.log(this.countertarget);
        },
        closemodal(){
            this.countermodal=false;
        },
        rollback(){
            this.cart.forEach(c=>{
                const prod = this.product.find(p=>p.id==c.id);
                console.log("이전 : " + prod.amount);
                prod.amount+=c.amount;
                console.log("이후 : " + prod.amount);
            })
        },
        notclick(yes){
            this.noclick=yes;
        },
    },
    watch:{
        '$route.params.customerCount':{
            handler:function(curVal,oriVal){
                console.log(this.customerCount);
                console.log(curVal);
                if(curVal!=null){
                    console.log("와!");
                    this.customerCount=curVal;
                    this.quizblind=false;
                }else{
                    console.log("우");
                    this.quizblind=true;
                }
            }
        }
    },
    components:{
        cartNquiz,Product
    }
}
</script>
<style scoped>
    .maingame{
        width: 100vw;
        height: 100vh;
        min-width:100vw;
        min-height:100vh;
        background-image:url('@/resources/mainbackimg.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        overflow:hidden;
        position:fixed;

    }
    .topbar{
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:80vw;
        height:89px;
        padding:0 40px;
        margin:auto;
        background-image:url(@/resources/gametopbar.png);
        background-position:center;
        background-repeat:no-repeat;
        background-size: contain;
    }
    .timebar-container{
        display:flex;
        align-items:center;
        width:33vw;
        max-height: 10px;
    }
    .timerbar{
        width:30vw;
        height:40px;
        border:3px solid #6F3533;
        border-radius:30px;
        overflow:hidden;
    }
    .timeleft{
        width:30vw;
        height:40px;
        background-color:#5E395A;
    }
    .time{
        position:relative;
        right:70px;
    }
    .moneybar{
        display:flex;
        justify-content:space-around;
        align-items:center;
        width: 15vw;
        height:56px;
        margin-right:20px;
        background-image:url(@/resources/moneybar.png);
        background-size: 100% 100%;
    }
    .line{
        min-height:28px;
        border-left:2px dashed rgba(256,256,256,0.2);
    }
    .money{
        display:flex;
        justify-content:flex-end;
        min-width:160px;
    }
    .money p{
        color:#FFFFFF;
    }
    .product-container{
        width:95%;
        height:90%;
        display:flex;
        justify-content:center;
        margin:auto;
        margin-top:20px;
    }
    .quiztime{
        width:100vw;
        height:100vh;
        position:absolute;
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:10;
        background-color:rgba(0,0,0,0.3);
    }
</style>