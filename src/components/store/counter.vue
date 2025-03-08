<template>
    <div class="counter" style="display:flex;padding-top:15px;min-width:90%;">
        <div id="cartzone" style="width:735px;display:flex;overflow-x:auto;">
            <!-- 카트의 상품 나열 -->
            <div v-for="c in cart" v-show="c.amount>0" @click="revertprod($event)">
                <div style="display:flex;justify-content:flex-end;align-items:center;"><p style="color:white;background-color:black;border-radius:10px;min-width:20px;min-height:20px;">{{ c.amount }}</p></div>
                <img class="cart" :src="`${c.src}`" alt="상품" height="50%" :id="`cart${c.id}`" :name="c.name"><br>
                <p style="margin-top:15px;">{{ c.name }}</p>
            </div>
        </div>
        <div style="width:265px">
            <img class="counter_cal" src="@/resources/counter.png" @click="submit">
        </div>
    </div>
    <div v-show="timeleft==0 || noclick" style="width:100%;height:330px;position:relative;bottom:330px;"></div>
</template>
<script>
export default {
    methods:{
        revertprod(e){
            let prod;
            if(e.target.className=='cart'){
                prod=e.target;
            }else if(e.target.parentElement.className=='cart'){
                prod=e.target.parentElement;
            }

            if(prod!=null){
                const target=this.cart.find(c=>("cart"+c.id)==prod.id);
                console.log("1!");
                this.$emit('revertprod',true,target);
            }
        },
        submit(){
            clearInterval(this.interval);
            this.$emit('submit');
        }
    },
    props:['cart','interval','timeleft','noclick']
}
</script>
<style scoped>
    .counter p{
        margin:0;
    }
    #cartzone>div{
        display:inline-block;
        text-align:center;
        width:80px;
        min-width:80px;
        height:114px;
        min-height:114px;
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