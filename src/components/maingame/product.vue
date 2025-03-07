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
            <p style="text-align:center;">{{ categ }} {{ getproduct.length }} / 50</p>
        </div>
        <!-- dragover, drop 이벤트가 있어야 drag & drop 가능 -->
        <div id="prodzone" class="product-container" >
            <!-- 가지고 있는 상품 나열 -->
            <div class="product" :id="`prod${p.id}`" v-for="p in getproduct" v-show="p.amount>0" @click="sellprod($event)">
                <div class="amount">
                    <p v-if="p.id.includes('50')" style="display:inline-block;width:35%;text-align:left;">D-1</p>
                    <p v-else style="display:inline-block;width:35%;text-align:right;"></p>
                    <p style="display:inline-block;width:35%;text-align:right;">{{ p.amount }}</p>
                </div>
                <!-- draggable로 드래그 가능, dragstart 이벤트가 필요. -->
                <img :src="`${p.src}`" alt="상품" height="50%" :name="p.name"><br>
                <p style="margin-top:15px;">{{ p.name }}</p>
            </div>
        </div>
        <div v-show="modal || countermodal || timeleft==0 || noclick" class="blind">
            <div v-if="modal && timeleft!=0 && !noclick" class="modalwin">
                <div class="modaltop">
                    <p>판매하기</p>
                    <img src="@/resources/close.png" width="28px;" @click="modal=false">
                </div>
                <div>
                    <div class="modalcontent">
                        <img :src="target.src">
                        <div style="text-align:center;">
                            <p>{{ target.name }}</p>
                            <p>{{ target.price }}원</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;width:150px;">
                            <p @click="target.sell>0?target.sell--:''">-</p>
                            <p>{{ target.sell }}</p>
                            <p @click="target.sell<target.amount?target.sell++:''">+</p>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;padding-right:20px;">
                        <button class="okbutton" @click="moveprod"></button>
                    </div>
                </div>
            </div>
            <div v-else-if="countermodal && timeleft!=0 && !noclick" class="modalwin">
                <div class="modaltop">
                    <p>회수하기</p>
                    <img src="@/resources/close.png" width="28px;" @click="$emit('closemodal')">
                </div>
                <div>
                    <div class="modalcontent">
                        <img :src="countertarget.src">
                        <div style="text-align:center;">
                            <p>{{ countertarget.name }}</p>
                            <p>{{ countertarget.price }}원</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;width:150px;">
                            <p @click="countertarget.sell>0?countertarget.sell--:''">-</p>
                            <p>{{ countertarget.sell }}</p>
                            <p @click="countertarget.sell<countertarget.amount?countertarget.sell++:''">+</p>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:flex-end;padding-right:20px;">
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
    props:['product','countermodal','countertarget','timeleft','noclick'],
}
</script>
<style scoped>
    .conv{
        width:817px;
        height:892px;
        border:7px solid #4C1B0B;
        border-top-left-radius:52px;
        border-top-right-radius:52px;
        border-bottom-left-radius:30px;
        border-bottom-right-radius:30px;
        overflow:hidden;
    }
    .conv p{
        margin:0;
    }
    .categorybutton{
        display:flex;
        justify-content:center;
        align-items:center;
        height:144px;
        background-color:#FFEFCA;
    }
    .categorybutton p{
        font-size:34px;
        margin:0 35px;
    }
    .categorybutton div{
        width:7px;
        height:74px;
        background-color:#4C1B0B;
    }
    .category{
        display:flex;
        justify-content:center;
        align-items:center;
        height:50px;
        border-top:7px solid #4C1B0B;
        border-bottom:7px solid #4C1B0B;
        background-color:#FFEFCA;
    }
    .product-container{
        width:100%;
        height:80%;
        overflow-y:auto;
        flex-wrap:wrap;
        background-color:#4C1B0B;
        scrollbar-color:#FFEFCA #4C1B0B;    /* 브라우저에 따라 적용 안됨 🤔 */
    }
    #prodzone>div{
        display:inline-block;
        text-align:center;
        width:170px;
        min-width:170px;
        min-height:190px;
        background-color:white;
        border-radius:30px;
        margin:10px 13px;
    }
    .amount{
        width:100%;
        margin-top:5px;
    }
    .sell{
        display:inline-block;
        width:40%;
        margin-top:5px;
    }
    .blind{
        display:flex;
        justify-content:center;
        align-items:center;
        position:relative;
        width:100%;
        height:105%;
        bottom:105%;
        background-color:rgba(256,256,256,0.5);
    }
    .modalwin{
        width:655px;
        height:365px;
        background-image:url("/src/resources/prodmodal.png");
        background-size:100% 100%;
        border-radius:30px;
        overflow:hidden;
    }
    .modaltop{
        display:flex;
        justify-content:center;
        align-items:center;
        width:655px;
        height:57px;
        background-color:#5E395A;
        margin-top:5px;
    }
    .modaltop p{
        width:85%;
        text-align:center;
    }
    .modalcontent{
        display:flex;
        height:220px;
        justify-content:space-around;
        align-items:center;
    }
    .okbutton{
        background-image:url('/src/resources/ok.png');
        width:181px;
        height:59px;
        background-color:rgba(0,0,0,0);
        border:0;
    }
</style>