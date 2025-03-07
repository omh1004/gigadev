<template>
  <div class="main-container">
    
    <div class="skip-button">
      <img src="@/assets/tutorial/button/skip.png">
    </div>
    
    
    <div class="dialog-box">
      <div class="dialog-text">{{ inputText }}</div>
      <div class="dialog-arrow">▼</div>
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
  }
  ,mounted(){

      let innerText = '갚아야 할 돈이 100만원?! 내가 가진 현금은 50만원인데 어떻게 운영해야하지?';
      
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
    
    background-repeat: no-repeat;


    font-family: RecipekoreaOTF;
  font-size: 24px;
  margin-top: 50px;
  background-color: #f5f5f5;
  
  text-align: center;
  max-width: 100%;
  min-height: 90%;

  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 



  background-repeat: no-repeat;


  background-image: url('@/assets/tutorial/tutorialMain.png');
  background-size:cover;

}

.skip-button {
  position: absolute;
  top: 20px;
  right: 20px;
  
  padding: 4px 12px;
}

.dialog-box {
  
  margin-top: 450px;
  width: 70%;
  background-color: #F2F1EC;
  border-radius: 24px;
  padding: 16px 20px;
  margin-bottom: 20px;
  min-height: 150px;
  display: flex;
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