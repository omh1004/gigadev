<template>
  <div class="main-container">
    
    <div class="skip-button" @click="movePage">
      <img src="@/assets/tutorial/button/skip.png">
    </div>
    
    <div id="bankman">
      <img src="@/assets/tutorial/people/bankmember.png">
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
  },methods:{
    movePage(){
      this.$router.push('/intro4')
    }
  }
  ,mounted(){
    
      

      let innerText = `빌리신 돈은 1,000,000원이고 대출 상환 기한은 30일이며 만기일시 상환입니다.`;
      
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
#bankman{
  position:relative;
        
        top:200px;
        
}

.skip-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #5d2906;
}

.dialog-box {
  
  margin-top: 200px;
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