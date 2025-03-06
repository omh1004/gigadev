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
            <div style="display:flex;">
                <img src="@/resources/person.png" width="40" height="40">
                <p>0/10</p>
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
            <Cartlist @quizTime="quizTime" @customer="customer" :quizNum="quizNum" :interval="interval" :timeleft="timeleft"/>
            <Productlist/>
        </div>
    </div>
</template>
<script scoped>
import Cartlist from './cartlist.vue';
import Productlist from './productlist.vue';

export default {
    data(){
        return{
            timebar:800,
            quiztime:false,
            quizNum:Math.floor(Math.random()*10),
            timeleft:30,
            interval:'',
        }
    },
    methods:{
        quizTime(){
            setTimeout(()=>{
                this.quiztime=false;
                this.timer();
            },3000);
        },
        customer(){
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
        }
    },
    mounted(){
        this.$router.push("/maingame/1");
    },
    components:{
        Cartlist,Productlist
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
        justify-content:space-between;
        align-items:center;
        width:1848px;
        height:89px;
        padding:0 40px;
        margin:auto;
        background-image:url(@/resources/gametopbar.png);
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
        justify-content:space-between;
        align-items:center;
        width:340px;
        height:56px;
        padding:0 15px;
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
        min-width:200px;
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