<template>
    <div style="display:flex;">
        <div class="relability_bar">
            <div class="bar_inside">
                <p class="figure">{{ relability }}</p>
                <div class="figure_bar" :style="`min-height:${4*relability}px`"></div>
            </div>
        </div>
        <img class="relability" src="@/resources/relability.png" width="78px" height="70px">
        <p class="balloon">{{ quizDialog }}</p>
        <img class="manInBlack" src="@/resources/man_in_black.png" width="400px" height="500px">
    </div>
</template>
<script>
import quizChoice from './quizChoice.vue';
import { quiz } from '../../resources/prodNquiz.js';


export default {
    name:'quizcomponent',
    data(){
        return {
            inputDialog:''
        }
    }
    ,mounted(){
        
        
        
        this.$emit('quizTime');


        for(let i=0;i<this.quizDialog.length;i++){  
            
            setTimeout(()=>{
                this.inputDialog+=this.quizDialog[i];
            },(i)*100)
            
            
        }

    },
    props:['quizNum','quizDialog','relability'],
    emit:['answer'],





}
</script>
<style scoped>
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
    .relability_bar{
        position:relative;
        top:70px;
        left:15px;
        width:74px;
        height:402px;
        border:4px solid #FFFFFF;
        border-radius:20px;
        background-color:#FFFFFF;
    }
    .bar_inside{
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        width:60px;
        height:394px;
        border:3px solid #6F3533;
        border-radius:20px;
        background-color:#F9F8F2;
        overflow:hidden;
    }
    .relability{
        position:relative;
        top:440px;
        right:61px;
    }
    .figure{
        font-size:20px;
        margin:0;
        text-align:center;
    }
    .figure_bar{
        background-color:#E7C5B9;
        border-width:3px 0;
        border-style:solid;
        border-color:#6F3533;
    }
</style>