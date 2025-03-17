<template>
  <div class="maincontainer">
    <div class="dialog-box">
      <div class="dialog-text" v-html="inputText"></div>
      <div class="dialog-arrow" @click="movePage">▼</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ending1',
  data() {
    return {
      inputText: ''
    };
  },
  mounted() {
    let innerText = '난.. 모든 걸 다 잃었어.. 거리로 나온지 벌써 10년이 지났지\n 한때는 나도 잘 될 줄 알았어 아니, 잘 될 수밖에 없다고 믿었지';

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
  
    text-align: center;
    max-width: 100%;
    min-height: 90%;


    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 

    background-image: url('/common/ending1.png');
    background-size: 100% 100%;

}
</style>