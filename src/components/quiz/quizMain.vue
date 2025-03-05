<template>
    <div style="display:inline-block">
        <h3>퀴즈</h3>
        <p class="balloon"></p>
        <img src="@/resources/man_in_black.png" width="100px" height="125px">   <!-- 이미지가 약 4:5 비율-->
    </div>
</template>
<script>
export default {
    name:'quizcomponent'
}
</script>
<style>
    .balloon{
        width:210px;
        min-height:100px;
        background-image:url("@/resources/speech_balloon.png"); /* 약 2:1 비율 */
        background-size: 100% 100%;
        position:relative;
        top:60px;
        left:80px;
    }
</style>