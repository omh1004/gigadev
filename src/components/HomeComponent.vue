<template>
    <div class="game-container">
      <div class="top-bar">
        <div class="day-counter">D-30</div>
        <div class="money-display">500,000원</div>
      </div>
  
      <div class="main-content">
        <div class="instruction-box">
          <p>발주를 늘려보세요.</p>
        </div>
  
        <div class="button-group">
          <button class="main-button active">발주</button>
          <div class="secondary-buttons">
            <button class="secondary-button">창고</button>
            <button class="secondary-button">은행</button>
          </div>
        </div>
  
        <button class="open-button">OPEN</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameInterface',
    data() {
      return {
        dayCounter: 'D-30',
        money: 500000
      }
    },
    methods: {
      // Add game logic methods here
    }
  }
  </script>
  
  <style scoped>
  .game-container {
    width: 100%;
    font-family: Arial, sans-serif;
    background-image:url('@/assets/common/homeMain.png');
    height: 100%;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
  }
  
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    min-height:100vh;
  }
  
  .instruction-box {
    background-color: #f8e5d3;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
  }
  
  .main-button {
    background-color: #5d4037;
    color: white;
    border: none;
    padding: 15px 50px;
    border-radius: 10px;
    font-size: 16px;
  }
  
  .secondary-buttons {
    display: flex;
    gap: 15px;
  }
  
  .secondary-button {
    background-color: #f0e5d8;
    color: black;
    border: none;
    padding: 10px 30px;
    border-radius: 10px;
    font-size: 14px;
  }
  
  .open-button {
    background-color: #6a1b9a;
    color: white;
    border: none;
    padding: 15px 50px;
    border-radius: 10px;
    font-size: 16px;
  }
  </style>