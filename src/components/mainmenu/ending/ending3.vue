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
  name: 'ending3',
  data() {
    return {
      inputText: ''
    };
  },
  mounted() {
    let innerText = '이게 사람 사는 거지~~~ 잘 나가는 편의점 사장은 바로 "나"';

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
  
</style>