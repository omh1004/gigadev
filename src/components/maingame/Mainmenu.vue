<template>
    <div class="main-container">
      <Topbar />
      <!-- <div class="header">
        <div class="left-section">D-30</div>
        <div class="right-section">
          <div class="money-bag">
            <span class="bag-icon">💰</span>
            <span class="amount">500,000원</span>
          </div>
          <div class="settings-icon">⚙️</div>
        </div>
      </div> -->

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
import Topbar from '../common/topbar.vue';

  export default {
    name: 'KoreanMenuInterface'
    ,methods:{
      linkOrdering(){
        this.$router.push('/orderingMain');
      }
      ,linkStorage(){
        if(history.state.disposeProfit!=null){
          this.$router.push({
            name:'storageMain',
            state:{
              disposeProfit:history.state.disposeProfit,
            }
          });
        }else{
          this.$router.push('/storageMain');
        }
      }
      ,linkBank(){
        this.$router.push('/bank')
      }
    },
    components:{ Topbar },
  }
  </script>
  
  <style scoped>
  .main-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  
    font-family: RecipekoreaOTF;
    font-size: 24px;
    background-color: #f5f5f5;
  
    text-align: center;
    max-width: 100%;
    min-height: 90%;


    display: flex;
    flex-direction: column;
    align-items: center; 


    background-image: url('@/assets/background/whitebg.png');
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
    padding: 0.6vw 1.7vw;
    margin-bottom: 11vh;
    border: 0.25vw solid #8B4513;
    border-radius: 9999px;
    min-width: 90vw;
    margin-top: 3vh;
    height: 5vh;
  }
  
  .left-section {
    font-size: 1.5vw;
    font-weight: bold;
    text-align: left;
  }
    .money-bag {
    display: flex;
    align-items: center;
    background-color: #5D2906;
    color: white;
    padding: 0.6vw 1.4vw;
    border-radius: 9999px;
    gap:3.5vw;
    height: 3.3vh;
    width: 13vw;
  }
  
.money-bag {
  font-size: 1.5vw;
}

  .right-section {
    display: flex;
    align-items: center;
    gap: 1vw;
    text-align: right;
    margin-left: auto;
  }
  
  .bag-icon {
    margin-right: 0.3vw;
  }
  
  .settings-icon {
    font-size: 2vw;
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
    margin-top: 14vh;
    margin-bottom: 20vh;
  }
  
  .button-text > img{
    width: 20vw;
    height: 15vh;
    /* background-color: #FFF8DC;
    border: 2px solid #8B4513; */
    border-radius: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
   
  }
  
  
  .open-button-container {
    display: flex;
    justify-content: center;
    /* background-image: url('@/assets/tutorial/button/openbutton.png'); */
  }
  
  .open-button {
    width: 14.5vw;
    height: 9vh;
    background-image: url('@/assets/tutorial/button/openbutton.png');
    background-size: contain;
    background-repeat: no-repeat;
    
    border: none;
    border-radius: 1vw;
    cursor: pointer;
  }

 

  
  </style>