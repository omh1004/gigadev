<template>
    <div style="display:inline-block;text-align:center;">
        <!-- 일단 프론트엔드만 만들어놓는 중 -->
        <div v-show="quizTime" class="quiztime">
            <img src="@/resources/quiz_time.png">
        </div>
        <p class="balloon">{{ dialog }}</p>
        <img class="manInBlack" src="@/resources/man_in_black.png" width="400px" height="500px">   <!-- 이미지가 약 4:5 비율-->
        <quizChoice :quizNum="quizNum" :quizAnswer="quizAnswer" @result="result"/>
    </div>
</template>
<script>
import quizChoice from './quizChoice.vue';
import { quiz, quizAnswer, quizComment } from './quiz.js';

export default {
    name:'quizcomponent',
    components:{
        quizChoice,     // 결과물 확인을 위해 임시로 둠. 선택지는 다른 칸으로 이동 예정.
    },
    data(){
        return{
            dialog:'',
            quizNum:Math.floor(Math.random()*10),
            quizTime:true,
        }
    },
    methods:{
        result(ans){
            console.log(ans);
            if(quizAnswer[this.quizNum]==ans){
                this.dialog='정답입니다.';
                // 사용자가 클릭하면 넘어갈지 일정 시간 뒤 넘어갈지 결정하기 일단 후자로로
                setTimeout(() => {
                    this.dialog='보상데이터 넣기';
                }, 3500);
            }else{
                this.dialog='오답입니다.';
                setTimeout(()=>{
                    this.dialog=quizComment[this.quizNum];
                },3500);
            }
        }
    },
    mounted(){
        this.dialog = quiz[this.quizNum];
        setTimeout(()=>{
            this.quizTime=false;
        },3000);
    },
    emit:['answer'],
}
</script>
<style>
    .balloon{
        display:flex;
        justify-content:center;
        align-items:center;
        width:365px;
        min-height:250px;
        background-image:url("@/resources/speech_balloon.png"); /* 약 21:10 비율 */
        background-size: 100% 100%;
        position:relative;
        top:160px;
        left:440px;
        font-family:"Pretendard";
        font-size:28px;
        padding-left:100px;
        padding-right:60px;
        z-index:0;
    }
    .manInBlack{
        position:relative;
        bottom:0;
        right:150px;
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