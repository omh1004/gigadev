<template>
    <div class="conv">
        <div class="categorybutton">
            <p @click="getcategory($event,'전체')">전체</p>
            <div></div>
            <p @click="getcategory($event,'신선식품')">신선식품</p>
            <div></div>
            <p @click="getcategory($event,'즉석식품')">즉석식품</p>
            <div></div>
            <p @click="getcategory($event,'전자제품')">전자제품</p>
        </div>
        <div class="category">
            <p style="text-align:center;font-size:2vh;">{{ categ }} {{ productAmount }} / 50</p>
        </div>
        <!-- dragover, drop 이벤트가 있어야 drag & drop 가능 -->
        <div id="prodzone" class="product-container" >
            <!-- 가지고 있는 상품 나열 -->
            <div class="product" :id="`prod${p.goodsNo}${p.expDate==1?'_50':''}`" v-for="p in product" v-show="p.orderQuantity>0" @click="sellprod($event)">
                <div class="amount">
                    <p v-if="p.expDate==1" style="display:inline-block;width:3vw;height:2vh;text-align:left;font-size:2vh;">D-1</p>
                    <p v-else style="display:inline-block;width:3vw;height:2vh;text-align:right;"></p>
                    <p style="display:inline-block;width:3vw;height:2vh;text-align:right;font-size:2vh;">{{ p.orderQuantity }}</p>
                </div>
                <!-- draggable로 드래그 가능, dragstart 이벤트가 필요. -->
                <img :src="`${p.image}`" alt="상품" style="width:8vh;height:8vh;" :name="p.name">
                <p style="margin-top:1vh;font-size:1.8vh;height:1.8vh;">{{ p.goodsName }}</p>
                <p style="margin-top:1vh;font-size:1.8vh;height:1.8vh;">{{ p.salePrice }}원</p>
            </div>
        </div>
        <div v-show="modal || countermodal || timeleft==0 || noclick || quizblind" class="blind">
            <div v-if="modal && timeleft!=0 && !noclick" class="modalwin">
                <div class="modaltop">
                    <p>판매하기</p>
                    <img src="/icons/close.png" width="1.5vw;" @click="modal=false">
                </div>
                <div>
                    <div class="modalcontent">
                        <img :src="target.image">
                        <div style="text-align:center;">
                            <p>{{ target.goodsName }}</p>
                            <p>{{ target.salePrice }}원</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;width:8vw">
                            <p @click="target.sell>0?target.sell--:''">-</p>
                            <p>{{ target.sell }}</p>
                            <p @click="target.sell<target.orderQuantity?target.sell++:''">+</p>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;padding-right:1vw;">
                        <button class="okbutton" @click="moveprod"></button>
                    </div>
                </div>
            </div>
            <div v-else-if="countermodal && timeleft!=0 && !noclick" class="modalwin">
                <div class="modaltop">
                    <p>회수하기</p>
                    <img src="/icons/close.png" width="1.5vw;" @click="$emit('closemodal')">
                </div>
                <div>
                    <div class="modalcontent">
                        <img :src="countertarget.image">
                        <div style="text-align:center;">
                            <p>{{ countertarget.goodsName }}</p>
                            <p>{{ countertarget.salePrice }}원</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;width:8vw;">
                            <p @click="countertarget.sell>0?countertarget.sell--:''">-</p>
                            <p>{{ countertarget.sell }}</p>
                            <p @click="countertarget.sell<countertarget.orderQuantity?countertarget.sell++:''">+</p>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;padding-right:2vh;">
                        <button class="okbutton" @click="moveprod"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { productStore } from '@/assets/pinia/maingame';

export default {
    data(){
        return{
            getproduct:productStore(),
            product:[],
            productAmount:0,
            modal:false,
            target:{},
            categ:'전체',
        }
    },
    methods:{
        sellprod(e){
            let prod;
            if(e.target.className=='product'){
                prod=e.target;
            }else if(e.target.parentElement.className=='product'){
                prod=e.target.parentElement;
            }
            console.log(prod);
            
            if(prod!=null){
                this.modal=true;
                this.target={...this.product.find(p=>("prod"+p.goodsNo+(p.expDate==1?'_50':''))==(prod.id)),sell:0};
                console.log(this.target);
            }
        },
        moveprod(){
            const prod = this.product.find(p=>p.goodsNo==this.target.goodsNo && p.expDate==this.target.expDate);
            const cartprod = this.getproduct.cart.find(c=>c.goodsNo==this.target.goodsNo && c.expDate==this.target.expDate);
            if(this.modal){
                if(this.target.sell>0){
                    if(cartprod==null){
                        this.getproduct.cart.push({...this.target,orderQuantity:this.target.sell,sell:0});
                        prod.orderQuantity-=this.target.sell;
                    }else{
                        prod.orderQuantity-=(this.target.sell-cartprod.orderQuantity);
                        cartprod.orderQuantity=this.target.sell;
                    }
                }
                // this.$emit('moveprod','prod',this.target.id);
                this.modal=false;
            }else if(this.countermodal){
                prod.orderQuantity-=(this.countertarget.sell-this.countertarget.orderQuantity);
                cartprod.orderQuantity=this.countertarget.sell;
                this.$emit('closemodal');
                // this.$emit('moveprod','cart',this.countertarget.id);
            }
        },
        getcategory(e,category){
            this.product=[];
            this.productAmount=0;
            this.categ = e.target.innerText;
            if(category!='전체'){
                this.getproduct.product.forEach(p=>{
                    if(p.orderQuantity>0 && (p.disposalYN=='N' || p.dispoaYN=='n') && p.goodType==category){
                        const findProd = this.product.find(prod=>(p.goodsNo==prod.goodsNo && prod.expDate>1));
                        const findProd2 = this.product.find(prod=>(p.goodsNo==prod.goodsNo && prod.expDate==1));
                        if(findProd!=null){
                            findProd.orderQuantity+=p.orderQuantity;
                        }else if(findProd2!=null){
                            findProd2.orderQuantity+=p.orderQuantity;
                        }else{
                            this.product.push(
                                {
                                    goodsNo:p.goodsNo, goodType:p.goodType, goodsName:p.goodsName, image:p.image,
                                    expDate:p.expDate, orderQuantity:p.orderQuantity, salePrice:p.salePrice
                                }
                            );
                        }
                        this.productAmount+=p.orderQuantity;
                    }
                })
            }else{
                this.getproduct.product.forEach(p=>{
                    if(p.orderQuantity>0 && (p.disposalYN=='N' || p.dispoaYN=='n')){
                        const findProd = this.product.find(prod=>(p.goodsNo==prod.goodsNo && prod.expDate>1));
                        const findProd2 = this.product.find(prod=>(p.goodsNo==prod.goodsNo && prod.expDate==1));
                        if(findProd!=null){
                            findProd.orderQuantity+=p.orderQuantity;
                        }else if(findProd2!=null){
                            findProd2.orderQuantity+=p.orderQuantity;
                        }else{
                            this.product.push(
                                {
                                    goodsNo:p.goodsNo, goodType:p.goodType, goodsName:p.goodsName, image:p.image,
                                    expDate:p.expDate, orderQuantity:p.orderQuantity, salePrice:p.salePrice
                                }
                            );
                        }
                        this.productAmount+=p.orderQuantity;
                    }
                })
            }
        },
    },
    mounted(){
        const gameNo = sessionStorage.getItem("gameNo");
        fetch("http://localhost:8080/spring/maingame/gamestart?gameNo="+gameNo)
        .then(response=>response.json())
        .then(data=>{
            this.getproduct.product=data
            this.getproduct.product.forEach(p=>{
                if(p.orderQuantity>0 && (p.disposalYN=='N' || p.dispoaYN=='n')){
                    const findProd = this.product.find(prod=>(p.goodsNo==prod.goodsNo && prod.expDate>1));
                    const findProd2 = this.product.find(prod=>(p.goodsNo==prod.goodsNo && prod.expDate==1));
                    if(findProd!=null){
                        findProd.orderQuantity+=p.orderQuantity;
                    }else if(findProd2!=null){
                        findProd2.orderQuantity+=p.orderQuantity;
                    }else{
                        this.product.push(
                            {
                                goodsNo:p.goodsNo, goodType:p.goodType, goodsName:p.goodsName, image:p.image,
                                expDate:p.expDate, orderQuantity:p.orderQuantity, salePrice:p.salePrice
                            }
                        );
                    }
                    this.productAmount+=p.orderQuantity;
                }
            });
        })
        .catch(e=>console.error(e));

        console.log("aa", this.product);
    },
    props:['countermodal','countertarget','timeleft','noclick','quizblind'],
}
</script>
<style scoped>
    .conv{
        width:42.5vw;
        height:82.5vh;
        border:0.6vh solid #4C1B0B;
        border-top-left-radius:5vh;
        border-top-right-radius:5vh;
        border-bottom-left-radius:3vh;
        border-bottom-right-radius:3vh;
        overflow:hidden;
    }
    .conv p{
        margin:0;
    }
    .categorybutton{
        display:flex;
        justify-content:center;
        align-items:center;
        height:13vh;
        background-color:#FFEFCA;
    }
    .categorybutton p{
        font-size:3vh;
        margin:0 2vw;
    }
    .categorybutton div{
        width:0.3vw;
        height:7vh;
        background-color:#4C1B0B;
    }
    .category{
        display:flex;
        justify-content:center;
        align-items:center;
        height:4.5vh;
        border-top:0.6vh solid #4C1B0B;
        border-bottom:0.6vh solid #4C1B0B;
        background-color:#FFEFCA;
    }
    .product-container{
        width:42.5vw;
        height:66vh;
        overflow-y:auto;
        flex-wrap:wrap;
        background-color:#4C1B0B;
        scrollbar-color:#FFEFCA #4C1B0B;    /* 브라우저에 따라 적용 안됨 🤔 */
    }
    .product{
        display:inline-block;
        text-align:center;
        width:9vw;
        height:18vh;
        background-color:white;
        border-radius:3vh;
        margin:0.9vh 0.7vw;
    }
    .amount{
        width:9vw;
        height:2vh;
        margin-top:0.5vh;
    }
    .blind{
        display:flex;
        justify-content:center;
        align-items:center;
        position:relative;
        width:42.5vw;
        height:84vh;
        bottom:84vh;
        background-color:rgba(256,256,256,0.5);
        z-index:0;
    }
    .modalwin{
        width:34vw;
        height:34vh;
        background-image:url("/element/prodmodal.png");
        background-size:100% 100%;
        border-radius:3vh;
        overflow:hidden;
    }
    .modaltop{
        display:flex;
        justify-content:center;
        align-items:center;
        width:34vw;
        height:5vh;
        background-color:#5E395A;
        margin-top:0.5vh;
    }
    .modaltop p{
        width:29vw;
        text-align:center;
    }
    .modalcontent{
        display:flex;
        height:20vh;
        justify-content:space-around;
        align-items:center;
    }
    .okbutton{
        background-image:url('/element/ok.png');
        width:9.5vw;
        height:5.5vh;
        background-color:rgba(0,0,0,0);
        border:0;
    }
</style>