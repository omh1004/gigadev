<template>
    <div class="conv">
        <div style="height:144px;background-color:#FFEFCA;">

        </div>
        <div style="height:50px;border-top:7px solid #4C1B0B;border-bottom:7px solid #4C1B0B;background-color:#FFEFCA;">

        </div>
        <!-- dragover, drop 이벤트가 있어야 drag & drop 가능 -->
        <div id="prodzone" class="product-container" >
            <!-- 가지고 있는 상품 나열 -->
            <div class="product" :id="`prod${p.id}`" v-for="p in product" v-show="p.amount>0" @click="sellprod($event)">
                <!-- draggable로 드래그 가능, dragstart 이벤트가 필요. -->
                <img :src="`${p.src}`" alt="상품" height="50%" :name="p.name"><br>
                <div class="amount">
                    <p>{{ p.amount }}</p>
                </div>
                <div class="sell">
                    <input type="number" v-model.number="p.sell">
                </div>  
                <p style="margin-top:15px;">{{ p.name }}</p>
            </div>
        </div>
        <div v-show="modal" class="blind">
            <div class="modalwin"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            modal:false,
            target:{},
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
        }
    },
    props:['product']
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
    .product-container{
        width:100%;
        height:100%;
        overflow-y:auto;
        flex-wrap:wrap;
        background-color:#4C1B0B;
    }
    #prodzone>div{
        display:inline-block;
        text-align:center;
        width:170px;
        min-width:170px;
        min-height:190px;
        background-color:white;
        border-radius:30px;
        margin:10px 14px;
    }
    .amount{
        display:inline-block;
        width:40%;
        text-align:center;
        margin-top:5px;
    }
    .sell{
        display:inline-block;
        width:40%;
        margin-top:5px;
    }
    .amount *, .sell *{
        width:100%;
    }
    .blind{
        display:flex;
        justify-content:center;
        align-items:center;
        position:relative;
        width:100%;
        height:100%;
        bottom:100%;
        background-color:rgba(256,256,256,0.5);
    }
    .modalwin{
        width:655px;
        height:308px;
    }
</style>