<template>
    <div class="conv">
        <div style="height:144px;background-color:#FFEFCA;">

        </div>
        <div style="height:50px;border-top:7px solid #4C1B0B;border-bottom:7px solid #4C1B0B;background-color:#FFEFCA;">

        </div>
        <!-- dragover, drop 이벤트가 있어야 drag & drop 가능 -->
        <div id="prodzone" class="product-container" @dragover="dragover_handler" @drop="drop_handler">
            <!-- 가지고 있는 상품 나열 -->
            <div class="product" v-for="p in product" v-show="p.amount>0">
                <!-- draggable로 드래그 가능, dragstart 이벤트가 필요. -->
                <img :src="`${p.src}`" alt="상품" height="50%"
                    draggable @dragstart="dragstart_handler" :id="`prod${p.id}`" :name="p.name"><br>
                <div class="amount">
                    <p>{{ p.amount }}</p>
                </div>
                <div class="sell">
                    <input type="number" v-model.number="p.sell">
                </div>  
                <p>{{ p.name }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        dragstart_handler(ev){
            this.$emit('dragstart_prod',ev);
        },
        dragover_handler(ev){
            ev.preventDefault();
            console.log(ev.dataTransfer);
            this.$emit('dragover_prod',ev);
        },
        drop_handler(ev){
            ev.preventDefault();
            console.log("어디까지 가지?");
            this.$emit('drop_prod',ev);
        },
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
        width:50%;
        text-align:center;
    }
    .sell{
        display:inline-block;
        width:50%;
    }
    .amount *, .sell *{
        width:100%;
    }
</style>