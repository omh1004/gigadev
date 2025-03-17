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
  name:'ending2',
  data(){
    return {
      inputText:''
    }
  },
  methods: {

  },
  mounted() {
    let innerText = '그럭저럭.. 잘 살아 남은 것 같아 대출은 겨우 다 갚았고 매출은 딱 밥 벌어 먹을 만큼 나와';
      
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