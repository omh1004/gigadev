<template>
  <div class="main-container">
    
    <div @click="quickStart">
      <img class="skip-button" src="/tutorial/button/skip.png">
    </div>

    <div id="bankman">
      <img src="/tutorial/people/bankmember.png">
    </div>
    <div class="dialog-box">
      <div class="dialog-text">{{ inputText }}</div>
      <div class="dialog-arrow"  @click="movePage">▼</div>
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
      this.$router.push('/intro3')
    }
  }
  ,mounted(){
    
      

      let innerText = `안녕하세요.은행에서 왔습니다.편의점 개업하신걸 축하드립니다.`;
      
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
#bankman{
  position:relative;
        
        top:200px;
        
}

.skip-button {
  position: absolute;
  top: 16vh;
  right: 4vw;
  width: 3vw;
}

.dialog-box {
  z-index: 1;
  margin-top: -2.5vh;
  width: 70%;
  background-color: #F2F1EC;
  padding: 1vw 1.5vw;
  margin-bottom: 20px;
  min-height: 150px;
  display: flex;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dialog-text {
  text-align: left;
  font-size: 24px;
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