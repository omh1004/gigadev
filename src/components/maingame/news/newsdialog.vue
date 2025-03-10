<template>
  <div class="newsdialog">
    <h1>{{ dialog }}</h1>
  </div>
</template>
<script>
export default {
  data(){
    return{
      dialog:'',
    }
  },
  mounted(){
    const dial = '어쩌구저쩌구 솰라솰라... 나 주식 모른다고!';
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
    margin-top:4.5vh;
    margin-left:2.5vw;
  }
</style>