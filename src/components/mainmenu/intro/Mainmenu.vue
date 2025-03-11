<template>
    <div class="main-container">
      <div class="header">
        <div class="left-section">D-30</div>
        <div class="right-section">
          <div class="money-bag">
            <span class="bag-icon">💰</span>
            <span class="amount">500,000원</span>
          </div>
          <div class="settings-icon">⚙️</div>
        </div>
      </div>

      <!-- <div class="speech-bubble">
        <div class="speech-bubble-content">
          <p>이 화면은 게임 시작전 준비공간입니다.</p>
          <p>편의점 편의점 운영중에는 다시 방문할 수 없습니다.</p>
          <p>신중하게 결정하고 오픈해주세요</p>
        </div>
        <div class="arrow-down"></div>
      </div> -->
    
      
      <div class="menu-container">
        <div class="menu-button"  @click="linkOrdering">
          <span class="button-text">
            <img src="@/assets/tutorial/button/orderingbutton.png">
          </span>
        </div>
        
        <div class="menu-button" @click="linkStorage">
          <span class="button-text">
            <img src="@/assets/tutorial/button/storagebutton.png">
          </span>
        </div>
        
        <div class="menu-button" @click="linkBank">
          <span class="button-text"><img src="@/assets/tutorial/button/bankbutton.png"></span>
        </div>
      </div>
      
      <div class="open-button-container">
        <button class="open-button" @click="$router.push('/maingame/1')"></button>  <!-- 실험용 이벤트 -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KoreanMenuInterface'
    ,methods:{
      linkOrdering(){
        // this.$router.push('/linkOrderingTutorial');
        this.$router.push('/orderingMain');
      }
      ,linkStorage(){
        // this.$router.push('/linkStorageTutorial')
        this.$router.push('/storageMain');
      }
      ,linkBank(){
        this.$router.push('/bank')
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
  
    font-family: RecipekoreaOTF;
    font-size: 24px;
    background-color: #f5f5f5;
  
    text-align: center;
    max-width: 100%;
    min-height: 90%;

    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center; 





    background-image: url('@/resources/whiteimg.png');
    background-size: 100% 100%;

  }
  .speech-bubble {
  position: flex;
  /* bottom: 80px; */
  align-items: center;
  transform: translateX(-50%);
  width: 90%;
  max-width: 900px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left:50%;
  }

  .speech-bubble-content {
  width: 100%;
  text-align: left;
  font-size: 18px;
  line-height: 1.5;
  font-family: 'Noto Sans KR', sans-serif;
}

.speech-bubble-content p {
  margin: 10px 0;
}

  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 100px;
    border: 3px solid #8B4513;
    border-radius: 9999px;
    min-width: 90vw;
    margin-top: 30px;
    height: 40px;
  }
  
  .left-section {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }
    .money-bag {
    display: flex;
    align-items: center;
    background-color: #5D2906;
    color: white;
    padding: 8px 16px;
    border-radius: 9999px;
    gap:50px;
    height: 27px;
    width: 180px;
  }
  
.money-bag {
  font-size: 20px;
}

  .right-section {
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: right;
    margin-left: auto;
  }
  
  .bag-icon {
    margin-right: 8px;
  }
  
  .settings-icon {
    font-size: 24px;
  }
  
  .notification {
    position: relative;
  }
  
  .notification-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  
  .menu-container {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 90px;
    margin-bottom: 200px;
  }
  
  .button-text > img{
    width: 300px;
    height: 120px;
    /* background-color: #FFF8DC;
    border: 2px solid #8B4513; */
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
   
  }
  
  .button-text {
    font-size: 24px;
    font-weight: bold;
  }
  
  .open-button-container {
    display: flex;
    justify-content: center;
    /* background-image: url('@/assets/tutorial/button/openbutton.png'); */
  }
  
  .open-button {
    width: 200px;
    height: 70px;
    background-image: url('@/assets/tutorial/button/openbutton.png');
    background-size: contain;
    background-repeat: no-repeat;
    
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }

 

  
  </style>