<template>
    <div style="display:flex;">
        <!-- 일단 프론트엔드만 만들어놓는 중 -->
        <p class="balloon">{{ dialog }}</p>
        <img class="customer" :src="src[customer]" width="400px" height="500px">   <!-- 이미지가 약 4:5 비율-->
    </div>
</template>
<script>
export default {
    name:'quizcomponent',
    data(){
        return{
            src:[
                "/src/resources/customer1.png",
                "/src/resources/customer2.png",
                "/src/resources/customer3.png",
                "/src/resources/customer4.png",
                "/src/resources/customer5.png",
                "/src/resources/customer6.png",
                "/src/resources/customer7.png",
                "/src/resources/customer8.png",
                "/src/resources/customer9.png",
            ],
            customer:Math.floor(Math.random()*9),
        }
    },
    mounted(){
        this.$emit('customer');
    },
    props:['quizNum','dialog'],
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
    .customer{
        position:relative;
        right:420px;
        top:85px;
        z-index:-1;
    }
</style>