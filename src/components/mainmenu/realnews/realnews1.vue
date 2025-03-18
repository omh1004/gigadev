<template>
  <div class="main-container">
    <div class="dialog-box">
      <div class="dialog-text" v-html="inputText"></div>
    </div>
    <div class="arrowbox">
      <div class="dialog-arrow" @click="movePage">▼</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'poorending',
  data() {
    return {
      inputText: ''
    };
  },
  methods:{
    movePage(){
      this.$router.push('')
    }
  },
  mounted() {
    let innerText = '최근 딸기 가격이 급등하면서 품귀 현상이 일어나고 있습니다.';

    for (let i = 0; i < innerText.length; i++) {
      setTimeout(() => {
        if (innerText[i] === '\n') {
          this.inputText += '<br>';
        } else {
          this.inputText += innerText[i];
        }
      }, i * 50);
    }
  }
};
</script>

<style scoped>
  .main-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;

    font-family: pretendard;
    background-color: #f5f5f5;
  
    max-width: 100%;
    min-height: 90%;

    display: flex;

    background-image: url('/common/news.png');
    background-size: 100% 100%;
}
.dialog-box {
  position: absolute;
  left: 5%;
  bottom: 12%;
  background-color: #F9F8F2;
  height: 18%;
  width: 80%;
}
.dialog-text {
  position: absolute;
  left: 8%;
  bottom: 13%;
  font-size: 2vw;
  font-weight: bold;
}
.dialog-arrow{
  position: absolute;
  bottom: 15.7%;
  right: 6.2%;
  font-size: 2.4vw;
}
.arrowbox {
  position: absolute;
  bottom: 14%;
  right: 6.2%;
  width: 10%;
  height: 10%;
  background-color: #F9F8F2;
  cursor: pointer;
}
</style>