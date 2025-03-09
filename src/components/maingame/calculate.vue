<template>
    <div class="calculate-container">
        <div style="text-align:center;">
            <div class="calculate-paper">
                <div class="title"><p></p></div>
            </div>
            <button class="dayend">퇴근하기</button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .calculate-container{
        width:100vw;
        height:100vh;
        background-image:url("@/resources/bankbg.png");
        background-size:100% 100%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .calculate-paper{
        width:50vw;
        height:80vh;
        background-color:#F5F5F5;
        border-radius:20px;
    }
    .dayend{
        width:20vw;
        height:10vh;
        background-image:url("@/resources/emptydayendbtn.png");
        background-size:100% 100%;
        background-color:rgba(0,0,0,0);
        border:0;
    }
    .title{
        width:15vw;
        height:5vh;
        background-image:url("@/resources/calculatetitle.png");
        background-size:100% 100%;
    }
</style>