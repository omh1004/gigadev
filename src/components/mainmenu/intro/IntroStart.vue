<template>
    <div class="store-layout" @click="linkMainMenu">
     
    </div>
  </template>


  
  <script>
  export default {
    name: 'intro'
    ,methods:{
        linkMainMenu(){
            return this.$router.push('/mainmenu')
        }
    }
  }
  </script>
  
  <style scoped>
  .store-layout {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-image: url('@/assets/common/intro/introMain.png');
    background-repeat: no-repeat;


    font-family: RecipekoreaOTF;
  font-size: 24px;
  margin-top: 50px;
  background-color: #f5f5f5;
  
  text-align: center;
  max-width: 100%;
  min-height: 90%;


  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 



  background-repeat: no-repeat;
  }
  
  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .image-placeholder {
    width: 100%;
    height: 100%;
    background-color: #f0e6d8; /* Placeholder color similar to the store background */
  }
  
  .speech-bubble {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 900px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border: 2px solid #ddd; /* Outer border only */
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
  
  .arrow-down {
    position: absolute;
    right: 20px;
    bottom: 10px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 12px solid #888;
  }
  </style>