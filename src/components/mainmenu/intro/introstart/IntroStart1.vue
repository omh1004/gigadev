<template>
    <div class="main-container">
 
      
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConvenienceStoreInterface'
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
    background-image: url('@/assets/tutorial/intro1.png');
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 100px;
    margin-top: 50px;
    border: 2px solid #8B4513;
    border-radius: 24px;
    min-width: 90vw;
  }
  
  .left-label {
    font-weight: bold;
    font-size: 18px;
  }
  
  .right-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .money-display {
    background-color: #5d2906;
    color: white;
    padding: 6px 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .money-icon {
    font-size: 16px;
  }
  
  .settings-icon {
    font-size: 20px;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 12px;
    width: 90vw;
  }
  
  .back-button {
    color: #5d2906;
    font-size: 24px;
    cursor: pointer;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
  
  .skip-button {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #5d2906;
    cursor: pointer;
    background-color: #f0f0f0;
    padding: 4px 12px;
    border-radius: 16px;
  }
  
  .double-arrow {
    font-size: 16px;
  }
  
  /* Dialog styling */
  .dialog-box {
    position: absolute;
    bottom: 120px;
    left: 5%;
    right: 5%;
    background-color: white;
    border-radius: 24px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .dialog-number {
    background-color: #ff0000;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .dialog-text {
    text-align: left;
    font-size: 18px;
    margin: 0;
    flex-grow: 1;
  }
  
  .dialog-arrow {
    position: absolute;
    bottom: 8px;
    right: 16px;
    color: #666;
  }
  
  .dialog-indicator {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #ff0000;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  </style>