<template>
  <div class="main-container">
    
    <div @click="quickStart" >
      <img class="skip-button" src="/tutorial/button/skip.png">
    </div>
    
    <div class="dialog-box">
      <div class="dialog-text">{{ inputText }}</div>
      <div class="dialog-arrow" @click="movePage">▼</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ConvenienceStoreDialog'
  ,data(){
    return {
      inputText:''
    }
  },methods:{
    quickStart(){
      this.$router.push('/mainMenu')
    },
    movePage(){
      this.$router.push('/intro2')
    }
  }
  ,mounted(){
      let innerText = '어렸을 때부터 나의 꿈이었던 편의점을 드디어 개업했다!';
      
        for(let i =0;i<innerText.length;i++){
          setTimeout(()=>{
            this.inputText+=innerText[i];
          },i*50)
        }
    
  }

}
</script>

<style scoped>
.main-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    


    font-family: pretendard;
    font-size: 40px;
  background-color: #f5f5f5;
  
  text-align: center;
  max-width: 100%;
  min-height: 90%;


  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 



  


  background-image: url('/tutorial/tutorialMain.png');
  background-size: 100% 100%;

}

.skip-button {
  position: absolute;
  top: 16vh;
  right: 4vw;
  width: 3vw;
}

.dialog-box {
  
  margin-top: 68.5vh;
  width: 70%;
  background-color: #F2F1EC;
  border-radius: 24px;
  padding: 1vw 1.5vw;
  margin-bottom: 20px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dialog-text {
  text-align: left;
  font-size: 1.8vw;
  margin: 0;
  flex-grow: 1;
  color: #333;
  font-family: RecipekoreaOTF;
}

.dialog-arrow {
  
  bottom: 8px;
  right: 16px;
  color: #666;
}

.bottom-indicator {
  position: absolute;
  bottom: 10px;
  color: #333;
  font-size: 18px;
}
</style>