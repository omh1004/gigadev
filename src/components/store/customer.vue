<template>
    <div style="display:flex;">
        <div class="relability_bar">
            <div class="bar_inside">
                <p v-show="relability==100" class="fever">FEVER<br>TIME</p>
                <p v-show="relability<=90" class="figure">{{ relability }}</p>
                <div class="figure_bar" :class="{'lowrela':relability<=40,'rela':relability>40 && relability<100,'maxrela':relability==100}"
                        :style="`min-height:${0.37*relability}vh`">
                    <p v-show="relability>90 && relability<100" class="figure" style="margin-top:3px;">{{ relability }}</p>
                </div>
            </div>
        </div>
        <!-- <img class="relability_bar" src="/relability_bar.png" width="74px" height="410px"> -->
        <img class="relability" src="/element/relability.png" style="width:4vw;height:6.5vh;">
        <p class="balloon">{{ dialog }}</p>
        <img class="customer" :src="src[customerA]" style="width:21vw;height:46vh;">   <!-- 이미지가 약 4:5 비율-->
    </div>
</template>
<script>

export default {
    
    name:'quizcomponent',
    data(){
        return{
            src:[
                "/src/assets/person/customer1.png",
                "/src/assets/person/customer2.png",
                "/src/assets/person/customer3.png",
                "/src/assets/person/customer4.png",
                "/src/assets/person/customer5.png",
                "/src/assets/person/customer6.png",
                "/src/assets/person/customer7.png",
                "/src/assets/person/customer8.png",
                "/src/assets/person/customer9.png",
            ],
        }
    }
    ,mounted(){

        this.$emit('customer');

        // for(let i=0;i<this.dialog.length;i++){
        //     setTimeout(()=>{
        //         inputData+=this.dialog[i];
        //     },i*100);
        //



    },
    props:['quizNum','dialog','customerA','relability'],
    emit:['answer'],
}
</script>
<style scoped>
    .balloon{
        display:flex;
        justify-content:center;
        align-items:center;
        width:28.5vw;
        height:22vh;
        min-height:22vh;
        background-image:url("/images/speechballoon.png"); /* 약 21:10 비율 */
        background-size: 100% 100%;
        position:relative;
        /* top:160px; */
        left:17.5vw;
        font-family:"Pretendard";
        font-size:2.5vh;
        padding-left:5vw;
        padding-right:3vw;
        z-index:0;
    }
    .customer{
        position:relative;
        right:22vw;
        top:8vh;
        z-index:-1;
    }
    .relability_bar{
        position:relative;
        top:6.5vh;
        left:0.5vw;
        width:4vw;
        height:37vh;
        border:0.3vh solid #FFFFFF;
        border-radius:2vh;
        background-color:#FFFFFF;
    }
    .bar_inside{
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        width:3vw;
        height:36.5vh;
        border:0.3vh solid #6F3533;
        border-radius:2vh;
        background-color:#F9F8F2;
        overflow:hidden;
    }
    .relability{
        position:relative;
        top:40.5vh;
        right:3vw;
    }
    .figure{
        font-size:2vh;
        margin:0;
        text-align:center;
    }
    .figure_bar{
        border-width:0.3vh 0;
        border-style:solid;
        border-color:#6F3533;
    }
    .lowrela{
        background-color:#E42200;
    }
    .rela{
        background-color:#E7C5B9;
    }
    .maxrela{
        background-color:#FFEFCA;
    }
    .fever{
        position:relative;
        top:5.5vh;
        margin:0;
        text-align:center;
    }
</style>