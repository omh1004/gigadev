<template>
    <div v-show="quiztime" class="quiztime">
        <img src="/element/quiztime.png">
    </div>
    <div class="maingame">
        <Settings :soundsetting="soundsetting" @closesound="closesound" @changebgmvol="changebgmvol" @changeeffectvol="changeeffectvol"/>
        <Usermanual :manualon="manualon" @manualoff="manualoff"/>
        <Savegame :savegame="savegame" @closeSaveModal="closeSaveModal"/>
        <div style="height:10vh;overflow:visible;text-align:right;">
            <div class="topbar">    <!-- 시간 될 때 떼어내서 common에 넣어놓기 -->
                <p style="font-size:2vh;">D-{{ 30-revenue.salesDay+1 }}</p>
                <div style="display:flex;">
                    <!-- <img src="/timer.png" width="10" height="52"> -- -->
                    <div class="timebar-container">
                        <div class="timerbar">
                            <div v-show="timebar>0" class="timeleft" :style="`width:${timebar}vw`"></div>
                        </div>
                        <p class="time">{{ timeleft }}초</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;">
                    <img src="/icons/person.png" style="width:2vw;height:3.5vh;">
                    <p style="margin:0;font-size:2vh;">{{ customerCount }}/10</p>
                </div>
                <div style="display:flex;align-items:center;">
                    <div class="moneybar">
                        <img src="/icons/money.png" style="width:2.5vw;height:4.5vh;">  <!-- @/assets 빼기!!!!! -->
                        <div class="line"></div>
                        <div class="money"><p style="font-size:2vh;">{{ ((revenue.cash*1)+(revenue.salesMount*1)).toLocaleString() }}원</p></div>
                    </div>
                    <img src="/icons/gameoption.png" style="width:2vw;height:3.5vh;" @click="opensettings=!opensettings">
                </div>
            </div>
            <!-- 윤상님 바꿔줘요! -->
            <div v-show="opensettings" class="settings">
                <div class="settingslist">
                    <p @click="soundsetting=true;">사운드</p>
                    <p @click="manualon=true;">초보자메뉴얼</p>
                    <p style="background-color:#56174F;color:#FFFFFF;" @click="savegame=true;">저장하기</p>
                </div>
            </div>
            <!-- 윤상님 바꿔줘요! 여기까지 -->
        </div>
        <div class="product-container">
            <cartNquiz :customerA="customerA" :quizNum="quizNum" :interval="interval" :timeleft="timeleft" :cart="cart"
                        :noclick="noclick" :moneyhave="moneyhave" :product="product" @quizTime="quizTime" @customer="customer"
                        @revertprod="revertprod" @rollback="rollback" @notclick="notclick" @bgmstop="bgmstop"  @bgmchange="bgmchange"/>
            <Product :countermodal="countermodal" :countertarget="countertarget" :timeleft="timeleft"
                        :noclick="noclick" :quizblind="quizblind" @closemodal="closemodal"/>
        </div>
    </div>
</template>
<script scoped>
import Savegame from '../common/savegame.vue';
import Usermanual from '../common/usermanual.vue';
import Settings from '../common/volumesettings.vue';
import cartNquiz from './cartnquiz.vue';
import Product from './product.vue';
import ConvenientLove from '/bgm/[suno]ConvenientLove.mp3';
import QuizmanOnConvenient from '/bgm/[suno]QuizmanOnConvenient.mp3';
import { productStore, revenueStore } from '@/assets/pinia/maingame';

export default {
    data(){
        return{
            quizblind:false,
            timebar:30,
            quiztime:false,
            quizNum:Math.floor(Math.random()*18),
            timeleft:3,
            interval:'',
            customerCount:1,
            customerA:Math.floor(Math.random()*9),
            // 구매, 판매 시에는 product만 수정, 하루가 끝날 때 DB에 저장
            piniaProduct:productStore(),
            revenue:revenueStore(),
            // product -> product / cart -> cart를 막기 위한 값. 'prod','cart'
            dragtarget:'',
            countermodal:false,
            countertarget:{},
            noclick:false,
            opensettings:false,
            bgm:new Audio(ConvenientLove),
            quizbgm:new Audio(QuizmanOnConvenient),
            soundsetting:false,
            moneyhave:500000,
            manualon:false,
            savegame:false,
        }
    },
    methods:{
        quizTime(){
            this.quiztime=true;
            this.timebar=30;
            this.timeleft=30;   // 빠른 진행 : 3초 설정
            console.log(this.customerCount);
            setTimeout(()=>{
                this.quiztime=false;
                this.timer();
            },3000);
        },
        customer(){
            this.piniaProduct.cart=[];
            this.timebar=30;
            this.timeleft=30;   // 빠른 진행 : 3초 설정
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
                this.timebar = 30/30*(30-(quizend-quizstart)/1000);           // 빠른 진행 : 3초 설정
                this.timeleft = 30-Math.floor((quizend-quizstart)/1000);       // 빠른 진행 : 3초 설정
            },50)
        },
        revertprod(modal,target){
            console.log("3!");
            this.countermodal=modal;
            this.countertarget=target;
            console.log(this.countermodal);
            console.log(this.countertarget);
        },
        closemodal(){
            this.countermodal=false;
        },
        rollback(){
            this.cart.forEach(c=>{
                const prod = this.product.find(p=>p.id==c.id);
                console.log("이전 : " + prod.amount);
                prod.amount+=c.amount;
                console.log("이후 : " + prod.amount);
            })
        },
        notclick(yes){
            this.noclick=yes;
        },
        bgmstop(){
            this.bgm.pause();
            this.bgm.load();
            this.quizbgm.pause();
            this.quizbgm.load();
        },
        bgmchange(type){
            if(type=='quiz'){
                this.bgm.pause();
                this.bgm.load();
                this.quizbgm.play();
            }else if(type=='customer'){
                this.quizbgm.pause();
                this.quizbgm.load();
                this.bgm.play();
            }
        },
        closesound(){
            this.soundsetting=false;
        },
        changebgmvol(vol){
            this.bgm.volume=vol/10;
            this.quizbgm.volume=vol/10;
        },
        changeeffectvol(vol){
            // effect 생기면 추가하기
        },
        manualoff(){
            this.manualon=false;
        },
        closeSaveModal(){
            this.savegame=false;
        }
    },
    mounted(){
        this.bgm.play();
        this.bgm.loop=true;
        this.quizbgm.loop=true;

        const gameNo = sessionStorage.getItem("gameNo");
        this.piniaProduct.cart=[];
        // 그냥 돈만 가져와야지
        fetch("http://3.38.185.252:8080/spring/maingame/moneydata?gameNo="+gameNo)
        .then(response=>response.text())
        .then(data=>this.revenue.cash = data)
    },
    watch:{
        '$route.params.customerCount':{
            handler:function(curVal,oriVal){
                console.log(this.customerCount);
                console.log(curVal);
                if(curVal!=null){
                    console.log("와!");
                    this.customerCount=curVal;
                    this.quizblind=false;
                }else{
                    console.log("우");
                    this.quizblind=true;
                }
            }
        }
    },
    components:{
        cartNquiz,Product,Settings,Usermanual,Savegame
    },  
}
</script>
<style scoped>
    .maingame{
        width: 100vw;
        height: 100vh;
        min-width:100vw;
        min-height:100vh;
        background-image:url('/background/convenientbg.png');

        background-size: 100% 100%;
        background-position: center;
        overflow:hidden;
        position:fixed;

    }
    .topbar{
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:90vw;
        height:8vh;
        padding:3.5vh 2vw;
        margin:auto;
        background-image:url(/element/gametopbar.png);
        background-position:center;
        background-repeat:no-repeat;
        background-size: contain;
    }
    .timebar-container{
        display:flex;
        align-items:center;
        width:33vw;
        max-height: 0.5vh;
    }
    .timerbar{
        width:30vw;
        height:3.5vh;
        border:0.4vh solid #6F3533;
        border-radius:2.5vh;
        overflow:hidden;
    }
    .timeleft{
        width:30vw;
        height:3.5vh;
        background-color:#5E395A;
    }
    .time{
        position:relative;
        right:3.5vw;
        font-size:2vh;
    }
    .moneybar{
        display:flex;
        justify-content:space-around;
        align-items:center;
        width: 15vw;
        height:5vh;
        margin-right:1vw;
        background-image:url(/element/moneybar.png);
        background-size: 100% 100%;
    }
    .line{
        min-height:2.5vh;
        border-left:0.2vw dashed rgba(256,256,256,0.2);
    }
    .money{
        display:flex;
        justify-content:flex-end;
        min-width:8.5vw;
    }
    .money p{
        color:#FFFFFF;
    }
    .product-container{
        width:95vw;
        height:90vh;
        display:flex;
        justify-content:center;
        margin:auto;
        margin-top:2vh;
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
    .settings{
        display:inline-block;
        width:19vw;
        height:28vh;
        position:relative;
        right:5vw;
        background-color:#F5F5F5;
        border:0.5vh solid #6F3533;
        border-radius:2vh;
        z-index:3;
    }
    .settingslist{
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        width:19vw;
        height:28vh;
        text-align:center;
    }
    .settingslist p{
        display:flex;
        justify-content:center;
        align-items:center;
        width:10vw;
        height:6vh;
        margin:0;
        background-color:#F5F5F5;
        border:0.5vh solid #56174F;
        border-radius:2vh;
    }
</style>