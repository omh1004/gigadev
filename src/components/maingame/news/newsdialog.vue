<template>
  <div class="newsdialog">
    <h1>{{ dialog }}</h1>
    <img src="@/resources/nextdialog.png">
  </div>
</template>
<script>
export default {
  data(){
    return{
      dialog:'',
      // 일수마다 news dialog 가져오기
    }
  },
  mounted(){
    const dial = '어느 대학을 갈지, 어떤 직업을 선택할지 고민해 본 적 있나요? 금융에서도 비슷한 고민이 필요합니다.';
    for(let i=0;i<dial.length;i++){
      setTimeout(()=>{
        this.dialog+=dial[i];
      },i*50);
    }
  },
}
</script>
<style>
  .newsdialog{
    display:flex;
    justify-content:space-around;
    width:97.2vw;
    height:27vh;
    margin:auto;
    background-color:#F9F8F2;
    border-top:0.5vh solid #6F3533;
    border-bottom-left-radius:3vw;
    border-bottom-right-radius:3vw;
  }
  .newsdialog>h1{
    font-size:4.5vh;
    margin-top:2.5vh;
    margin-left:2.5vh;
    margin-right:2.5vh;
  }
  .newsdialog>img{
    width:3.5vh;
    height:3.5vh;
    margin-top:10vh;
    margin-right:2.5vh;
  }
</style>