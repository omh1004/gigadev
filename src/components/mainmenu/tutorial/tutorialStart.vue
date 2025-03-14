<template>
  <div class="store-layout" @click="linkMainMenu">
    <div @click="movePage">
      <img class="skip-button" src="/tutorial/button/skip.png">
    </div>

    <div id="bankman">
      <img src="@/assets/person/headquartersstaff.png">
    </div>
    <div class="dialog-box">
      <div class="dialog-text">{{ inputText }}</div>
      <div class="dialog-arrow">▼</div>
    </div>
  </div>
</template>


  
<script>
export default {
  name: 'intro',
  data(){
    return {
      text:'안녕하세요. CK 본사에서 나왔습니다. 편의점 시스템을 알려드리겠습니다.',
      inputText:'',
      textread:0,
      interval:'',
    }
  },
  methods:{
      linkMainMenu(){
        if(this.inputText!=this.text){
          clearInterval(this.interval);
          this.inputText = this.text;
          this.textread = 0;
        }else if(this.inputText==this.text){
          return this.$router.push('/tutorialMain');
        }
      }
  },
  mounted(){
    this.interval = setInterval(()=>{
      this.inputText += this.text[this.textread];
      this.textread++;
      if(this.inputText == this.text){
        clearInterval(this.interval);
        this.textread = 0;
      }
    },50)
    setTimeout(()=>{
      this.horror=true;
    },5000)
  }
}
</script>

<style scoped>
.store-layout {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url('/background/convenientbg.png');
  background-size: 100% 100%;

  font-family: RecipekoreaOTF;
  font-size: 24px;
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

#bankman{
  position:relative;  
  top:100px;
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
.horror{
  color:red;
}
</style>