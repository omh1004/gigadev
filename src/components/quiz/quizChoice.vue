<template>
    <div style="display:flex;">
        <div class="choice">
            <div class="number"><p>1</p></div>
            <p style="text-align:center;">연금 수요 증가</p>
        </div>
        <div class="choice">
            <div class="number"><p>2</p></div>
            <p style="text-align:center;">신용 대출 확대</p>
        </div>
        <div class="choice">
            <div class="number"><p>3</p></div>
            <p style="text-align:center;">고위험 투자 확대</p>
        </div>
        <img src="@/resources/quiz_counter.png" style="position:relative;top:-100px;">
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .choice{
        width:200px;
        height:100px;
        min-width:200px;
        min-height:100px;
        border:3px solid #6F3533;
        border-radius:20px;
        background-color:#FFEFCA;
        margin:0 20px;
    }
    .number{
        display:flex;
        justify-content:center;
        align-items:center;
        width:28px;
        min-width:28px;
        height:28px;
        min-height:28px;
        background-color:#6F3533;
        border-radius:15px;
        margin:7px;
    }
    .number p{
        display:flex;
        justify-content:center;
        align-items:center;
        min-width:28px;
        min-height:28px;
        color:white;
    }
    p{
        font-family: 'Pretendard-Regular';
        font-weight:600;
        font-style: normal;
        text-align:center;
        font-size:24px;
        margin:0;
    }
</style>