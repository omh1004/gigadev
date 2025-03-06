<template>
    <div v-show="quiztime" class="quiztime">
        <img src="@/resources/quiz_time.png">
    </div>
    <div class="maingame">
        <div class="topbar">
            <p>D-30</p>
            <div style="display:flex;">
                <img src="@/resources/timer.png" width="50" height="52">
                <div class="timebar-container">
                    <div class="timerbar">
                        <div v-show="timebar>0" class="timeleft" :style="`width:${timebar}px`"></div>
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
            <cartNquiz :customerA="customerA" :quizNum="quizNum" :interval="interval" :timeleft="timeleft" :cart="cart" @quizTime="quizTime" @customer="customer"
                        @dragstart_cart="dragstart_handler" @dragover_cart="dragover_handler" @drop_cart="drop_handler"/>
            <Product :product="product" @dragstart_prod="dragstart_handler" @dragover_prod="dragover_handler" @drop_prod="drop_handler"/>
        </div>
    </div>
</template>
<script scoped>
import cartNquiz from './cartnquiz.vue';
import Product from './product.vue';

export default {
    data(){
        return{
            timebar:800,
            quiztime:false,
            quizNum:Math.floor(Math.random()*10),
            timeleft:30,
            interval:'',
            customerCount:1,
            customerA:Math.floor(Math.random()*9),
            // 구매, 판매 시에는 product만 수정, 하루가 끝날 때 DB에 저장
            product:[
                { id:"strawberry",name:"딸기",amount:10,src:"/src/assets/tutorial/fruit/strawberry.png",sell:0 },
                { id:"pineapple",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/fineapple.png",sell:0 },
                { id:"strawberry_50",name:"딸기",amount:3,src:"/src/assets/tutorial/fruit/Group 2348.png",sell:0 },
                { id:"pineapple_50",name:"파인애플",amount:3,src:"/src/assets/tutorial/fruit/Frame 7370.png",sell:0 },
            ],
            // 판매 시 cart 초기화
            cart:[],
            // product -> product / cart -> cart를 막기 위한 값. 'prod','cart'
            dragtarget:'',
        }
    },
    methods:{
        quizTime(){
            this.quiztime=true;
            this.timebar=800;
            this.timeleft=30;
            setTimeout(()=>{
                this.quiztime=false;
                this.timer();
            },3000);
        },
        customer(){
            this.timebar=800;
            this.timeleft=30;
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
                this.timebar = 800/30*(30-(quizend-quizstart)/1000);
                this.timeleft = 30-Math.floor((quizend-quizstart)/1000);
            },50)
        },
        dragstart_handler(ev){
            console.log("drag");
            ev.dataTransfer.setData("text/plain",ev.target.id);   // 드래그 한 태그 name 속성 설정
            // 드래그 한 태그가 product에 있는가 cart에 있는가를 id로 확인
            var img = new Image();
            img.src = ev.target.src;
            ev.dataTransfer.setDragImage(img, 20, 20);
            if(ev.target.id.includes("prod")){ this.dragtarget="prod"; }
            else if(ev.target.id.includes("cart")){ this.dragtarget="cart"; }
            console.log(this.dragtarget);
        },
        dragover_handler(ev){
            ev.preventDefault();
            console.log(ev.dataTransfer);
        },
        drop_handler(ev){
            ev.preventDefault();
            console.log(ev.target.id);  // 'prodzone','cartzone'인지 확인용
            console.log(ev.target.parentElement.parentElement.id);  // 'prodzone','cartzone'위의 상품인지 확인용
            console.log(this.dragtarget);
            if(ev.target.id=='cartzone' || ev.target.parentElement.parentElement.id=='cartzone'){   // 드롭 이벤트 cartzone 발생
                const data = ev.dataTransfer.getData("text/plain"); // 드래그 한 태그 name 속성값 가져오기(위에서 저장함)
                console.log(data);
                const prod = this.product.find(p=>data==("prod"+p.id));    // product,cart에 같은 객체가 있는지 확인
                const cartprod = this.cart.find(p=>data==("prod"+p.id));     // 근데 하루 남은 걸 다른 객체로 봐야 해서 조금 수정이 필요할 것.
                console.log(prod,cartprod);
                console.log(prod!=null,cartprod!=null);
                if(prod!=null && cartprod==null){       // product에만 있는 경우
                    if(prod.sell<=1){
                        prod.amount--;
                        this.cart.push({ id:prod.id, name:prod.name, amount:1, src:prod.src,sell:0 });
                    }else if(prod.sell>1 && prod.sell<=prod.amount){
                        prod.amount-=prod.sell;
                        this.cart.push({ id:prod.id, name:prod.name, amount:prod.sell, src:prod.src,sell:0 });
                    }
                }else if(prod!=null && cartprod!=null){     // product, cart에 있는 경우
                    if(prod.amount>0 && this.dragtarget=='prod'){   // prodzone -> cartzone 드래그 & 드래그 한 상품 1개 이상
                        if(prod.sell<=1){
                            prod.amount--;
                            cartprod.amount++;
                        }else if(prod.sell>1 && prod.sell<=prod.amount){
                            prod.amount-=prod.sell;
                            cartprod.amount+=prod.sell;
                        }
                    }
                }
            }
            if(ev.target.id=='prodzone' || ev.target.parentElement.parentElement.id=='prodzone'){   // 드롭 이벤트 prodzone 발생
                const data = ev.dataTransfer.getData("text/plain");
                const prod = this.product.find(p=>data==("cart"+p.id));        // product, cart에 같은 객체 화인
                const cartprod = this.cart.find(p=>data==("cart"+p.id));
                console.log(prod!=null,cartprod!=null);
                if(prod==null && cartprod!=null){           // cart에만 있음
                    if(cartprod.sell<=1){
                        cartprod.amount--;
                        this.product.push({ id:cartprod.id, name:cartprod.name, amount:1, src:cartprod.src,sell:0 });
                    }else if(cartprod.sell>1 && cartprod.sell<=cartprod.amount){
                        cartprod.amount-=cartprod.sell;
                        this.product.push({ id:cartprod.id, name:cartprod.name, amount:cartprod.sell, src:cartprod.src,sell:0 });
                    }
                }else if(prod!=null && cartprod!=null){     // product, cart 둘 다 있음
                    if(cartprod.amount>0 && this.dragtarget=='cart'){   // cartzone -> prodzone 드래그 & 드래그 한 카드 상품 1개 이상
                        if(cartprod.sell<=1){
                            cartprod.amount--;
                            prod.amount++;
                        }else if(cartprod.sell>1 && cartprod.sell<=cartprod.amount){
                            cartprod.amount-=cartprod.sell;
                            prod.amount+=cartprod.sell;
                        }
                    }
                }
            }
        },
    },
    watch:{
        '$route.params.customerCount':{
            handler:function(curVal,oriVal){
                if(curVal!=='quiz'){
                    this.customerCount=curVal;
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
        height:100vh;
        min-width:100vw;
        min-height:100vh;
        padding-top:40px;
        background-image:url(@/resources/mainbackimg.png);
        overflow:hidden;
        position:fixed;
    }
    .topbar{
        display:flex;
        justify-content:space-around;
        align-items:center;
        width:1848px;
        height:89px;
        padding:0 40px;
        margin:auto;
        background-image:url(@/resources/gametopbar.png);
        background-position:center;
        background-repeat:no-repeat;
    }
    .timebar-container{
        display:flex;
        align-items:center;
        width:860px;
    }
    .timerbar{
        width:800px;
        height:40px;
        border:3px solid #6F3533;
        border-radius:30px;
        overflow:hidden;
    }
    .timeleft{
        width:800px;
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
        width:340px;
        height:56px;
        margin-right:20px;
        background-image:url(@/resources/moneybar.png);
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