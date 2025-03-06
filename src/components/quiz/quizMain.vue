<template>
    <div style="display:flex;">
        <!-- 일단 프론트엔드만 만들어놓는 중 -->
        <p class="balloon">{{ quizDialog }}</p>
        <img class="manInBlack" src="@/resources/man_in_black.png" width="400px" height="500px">   <!-- 이미지가 약 4:5 비율-->
    </div>
</template>
<script>
import quizChoice from './quizChoice.vue';
import { quiz } from '../../resources/quiz.js';

export default {
    name:'quizcomponent',
    mounted(){
        this.$emit('quizTime');
    },
    props:['quizNum','quizDialog'],
    emit:['answer'],
}
</script>
<style>
    .balloon{
        display:flex;
        justify-content:center;
        align-items:center;
        width:550px;
        height:240px;
        min-height:250px;
        background-image:url("@/resources/speech_balloon.png"); /* 약 21:10 비율 */
        background-size: 100% 100%;
        position:relative;
        /* top:160px; */
        left:440px;
        font-family:"Pretendard";
        font-size:28px;
        padding-left:100px;
        padding-right:60px;
        z-index:0;
    }
    .manInBlack{
        position:relative;
        right:420px;
        top:85px;
        z-index:-1;
    }
</style>