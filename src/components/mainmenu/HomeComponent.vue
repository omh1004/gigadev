<template>
  <div></div>
  <div class="game-container">  

    <img id="secondimg" src="@/resources/tycoonname.png" alt="타이쿤 이름 이미지">
    <div class="action-buttons">
      <button class="load-button" >불러오기</button>
      <button class="start-button" @click="startgame">게임시작</button>
    </div>



    <div class="ranking-board">


      <div class="ranking-header">
        <span></span>
        <span></span>
        <span></span>
      </div>
       <div class="ranking-list">
        <div 
          v-for="(player, index) in rankings" 
          :key="index" 
          :class="['ranking-item', getTopPlayerClass(index)]"
        >
          
          <span>{{ player.nickname }}</span>
          <span>{{ formatCurrency(player.profit) }}</span>
        </div>
      </div> 
    </div>
  </div>

</template>

<script>
export default {
  name: 'ConvenienceStoreTycoon',
  data() {
    return {
      rankings: [
        { nickname: '도토리뚜껑', profit: 1000000 },
        { nickname: '멋지당', profit: 980000 },
        { nickname: '방구벨트', profit: 970000 },
        { nickname: '소잉냥', profit: 970000 },
        { nickname: '보리', profit: 970000 },
        { nickname: '지냥', profit: 970000 }
      ]
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString() + '원'
    },
    getTopPlayerClass(index) {
      return index < 3 ? `top-${index + 1}` : ''
    }
    ,startgame(){
      return this.$router.push('/introstart')
    }
  }
}
</script>

<style scoped>
.game-container {
  font-family: RecipekoreaOTF;
  font-size: 2vw;
  background-color: #f5f5f5;
  
  text-align: center;
  max-width: 100%;
  min-height: 100vh;

  background-image: url('@/assets/common/homeMenu.png');
  background-size: 100% 100%;

  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  position: relative;
}
#secondimg {
  width: 28vw;
  height: 14vh;
  position: absolute;
  top:8vh;
}

.title-section {
  font-family: RecipekoreaOTF;
  margin-bottom: 30px;
}

.title-section h1 {
  font-family: RecipekoreaOTF;
  color: #6a1b9a;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.subtitle {
  color: #888;
}

.action-buttons {
  margin-top: 20vh;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.load-button, 
.start-button {
  font-family: RecipekoreaOTF;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
}

.load-button {
  font-family: RecipekoreaOTF;
  background-color: #f0e5d8;
  color: black;
}

.start-button {
  font-family: RecipekoreaOTF;
  background-color: #6a1b9a;
  color: white;
}

.ranking-board {
  font-family: RecipekoreaOTF;
  background-color: white;
  border-radius: 3vw;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-left: 15vw;
  margin-right: 15vw;
  min-height:400px;
  width: 800px;
  margin-top: 0vh;
  background-image: url('@/assets/common/rankingboard.png');
  background-size: 100% 100%;
  overflow:hidden;
}

.ranking-header {
  font-family: RecipekoreaOTF;
  display: flex;
  justify-content: space-between;
  /* background-color: #5d4037; */
  color: white;
  padding: 10px;
  font-weight: bold;
}

.ranking-list {
  font-family: RecipekoreaOTF;
  text-align: center;
  padding-left: 350px;
  padding-top: 50px;
}

.ranking-item {
  font-family: RecipekoreaOTF;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

</style>