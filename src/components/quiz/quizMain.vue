<template>
    <div style="display:inline-block;text-align:center;">
        <h3>퀴즈</h3>   <!-- 일단 프론트엔드만 만들어놓는 중 -->
        <p class="balloon">이제 여기에 문제를 내면 됩니다</p>
        <img src="@/resources/man_in_black.png" width="400px" height="500px">   <!-- 이미지가 약 4:5 비율-->
        <quizChoice/>
    </div>
</template>
<script>
import quizChoice from './quizChoice.vue';

export default {
    name:'quizcomponent',
    components:{
        quizChoice,     // 결과물 확인을 위해 임시로 둠. 선택지는 다른 칸으로 이동 예정.
    }
}
</script>
<style>
    .balloon{
        display:flex;
        justify-content:center;
        align-items:center;
        width:525px;
        min-height:250px;
        background-image:url("@/resources/speech_balloon.png"); /* 약 21:10 비율 */
        background-size: 100% 100%;
        position:relative;
        top:160px;
        left:470px;
    }
</style>