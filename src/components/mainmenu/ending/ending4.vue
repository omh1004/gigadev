<template>
  <div class="maincontainer">
    <div class="dialog-box">
      <div class="dialog-text">{{ inputText }}</div>
      <div class="dialog-arrow" @click="movePage">▼</div>
    </div>
  </div>
</template>
<script>
export default {
  name:'ending4',
  data(){
    return {
      inputText:''
    }
  },
  methods: {

  },
  mounted() {
    let innerText = '나는 더 이상 편의점 사장이 아니야 내 편의점은 전국에 수백 개가 넘고 사람들은 내 이름을 브랜드라고 불러';
      
        for(let i =0;i<innerText.length;i++){
          setTimeout(()=>{
            this.inputText+=innerText[i];
          },i*50)
        }
  }
}
</script>
<style scoped>
  
</style>