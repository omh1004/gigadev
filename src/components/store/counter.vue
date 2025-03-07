<template>
    <div class="counter" style="display:flex;padding-top:15px;min-width:90%;">
        <div id="cartzone" style="width:735px;display:flex;overflow-x:auto;">
            <!-- 카트의 상품 나열 -->
            <div v-for="c in cart" v-show="c.amount>0" @class="revertprod">
                <img class="cart" :src="`${c.src}`" alt="상품" height="50%" :id="`cart${c.id}`" :name="c.name"><br>
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
        revertprod(){
            let prod;
            if(e.target.className=='cart'){
                prod=e.target;
            }
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