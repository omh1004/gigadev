<template>
    <div class="counter" style="display:flex;padding-top:15px;min-width:90%;">
        <div id="cartzone" style="width:735px;display:flex;overflow-x:auto;" @dragover="dragover_handler" @drop="drop_handler">
            <!-- 카트의 상품 나열 -->
            <div v-for="c in cart" v-show="c.amount>0">
                <img :src="`${c.src}`" alt="상품" height="50%"
                    draggable @dragstart="dragstart_handler" :id="`cart${c.id}`" :name="c.name"><br>
                    <div class="amount">
                        <p>{{ c.amount }}</p>
                    </div>
                    <div class="sell">
                        <input type="number" v-model.number="c.sell">
                    </div>
                <p style="margin-top:15px;">{{ c.name }}</p>
            </div>
        </div>
        <div style="width:265px">
            <img class="counter_cal" src="@/resources/quiz_counter.png" @click="submit">
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        dragstart_handler(ev){
            this.$emit('dragstart_cart',ev);
        },
        dragover_handler(ev){
            ev.preventDefault();
            console.log(ev.dataTransfer);
            this.$emit('dragover_cart',ev);
        },
        drop_handler(ev){
            ev.preventDefault();
            console.log("어디까지 가지?");
            this.$emit('drop_cart',ev);
        },
        submit(){
            
        }
    },
    props:['cart']
}
</script>
<style scoped>
    .counter p{
        margin:0;
    }
    #cartzone>div{
        display:inline-block;
        text-align:center;
        width:170px;
        min-width:170px;
        height:190px;
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
    .counter_cal{
        position:relative;
        top:-100px;
    }
    .amount *, .sell *{
        width:100%;
    }
</style>