<template>
    <div class="conv">
        <div class="categorybutton">
            <p @click="getcategory($event,'all')">전체</p>
            <div></div>
            <p @click="getcategory($event,'a')">신선식품</p>
            <div></div>
            <p @click="getcategory($event,'b')">즉석식품</p>
            <div></div>
            <p @click="getcategory($event,'c')">전자제품</p>
        </div>
        <div class="category">
            <p style="text-align:center;font-size:2vh;">{{ categ }} {{ getproduct.length }} / 50</p>
        </div>
        <!-- dragover, drop 이벤트가 있어야 drag & drop 가능 -->
        <div id="prodzone" class="product-container" >
            <!-- 가지고 있는 상품 나열 -->
            <div class="product" :id="`prod${p.id}`" v-for="p in getproduct" v-show="p.amount>0" @click="sellprod($event)">
                <div class="amount">
                    <p v-if="p.id.includes('50')" style="display:inline-block;width:3vw;height:2vh;text-align:left;font-size:2vh;">D-1</p>
                    <p v-else style="display:inline-block;width:3vw;height:2vh;text-align:right;"></p>
                    <p style="display:inline-block;width:3vw;height:2vh;text-align:right;font-size:2vh;">{{ p.amount }}</p>
                </div>
                <!-- draggable로 드래그 가능, dragstart 이벤트가 필요. -->
                <img :src="`${p.src}`" alt="상품" style="width:8vh;height:8vh;" :name="p.name">
                <p style="margin-top:1vh;font-size:1.8vh;height:1.8vh;">{{ p.name }}</p>
                <p style="margin-top:1vh;font-size:1.8vh;height:1.8vh;">{{ p.price }}원</p>
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
                        <img :src="target.src">
                        <div style="text-align:center;">
                            <p>{{ target.name }}</p>
                            <p>{{ target.price }}원</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;width:8vw">
                            <p @click="target.sell>0?target.sell--:''">-</p>
                            <p>{{ target.sell }}</p>
                            <p @click="target.sell<target.amount?target.sell++:''">+</p>
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
                        <img :src="countertarget.src">
                        <div style="text-align:center;">
                            <p>{{ countertarget.name }}</p>
                            <p>{{ countertarget.price }}원</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;width:8vw;">
                            <p @click="countertarget.sell>0?countertarget.sell--:''">-</p>
                            <p>{{ countertarget.sell }}</p>
                            <p @click="countertarget.sell<countertarget.amount?countertarget.sell++:''">+</p>
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
export default {
    data(){
        return{
            getproduct:[],
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
            
            if(prod!=null){
                this.modal=true;
                this.target=this.product.find(p=>("prod"+p.id)==prod.id);
            }
        },
        moveprod(){
            if(this.modal){
                this.$emit('moveprod','prod',this.target.id);
                this.modal=false;
            }else if(this.countermodal){
                this.$emit('moveprod','cart',this.countertarget.id);
            }
        },
        getcategory(e,category){
            this.getproduct=[];
            this.categ = e.target.innerText;
            if(category!='all'){
                this.product.forEach(p=>{
                    if(p.type==category && p.amount>0){
                        this.getproduct.push(p);
                    }
                });
            }else{
                this.product.forEach(p=>{
                    if(p.amount>0){
                        this.getproduct.push(p);
                    }
                })
            }
        },
    },
    mounted(){
        this.getproduct=this.product;
    },
    props:['product','countermodal','countertarget','timeleft','noclick','quizblind'],
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
        height:74vh;
        bottom:74vh;
        background-color:rgba(256,256,256,0.5);
        z-index:0;
    }
    .modalwin{
        width:34vw;
        height:34vh;
        background-image:url("/src/assets/element/prodmodal.png");
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
        background-image:url('/src/assets/element/ok.png');
        width:9.5vw;
        height:5.5vh;
        background-color:rgba(0,0,0,0);
        border:0;
    }
</style>