<template>
    <div>
        <div id="maincontainer">
            <img id="firstimg" src="@/resources/tycoon.png" alt="지붕있는 타이쿤 이미지" width="340" height="220">
            <img id="secondimg" src="@/resources/tycoonname.png" alt="타이쿤 이름 이미지" width="400" height="120">
            <div class="button-container">
                <button id="loginbtn" @click="goToLogin">로그인</button>
                <button id="joinbtn" @click="goToJoin">회원가입</button>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:'mainVue',
    methods: {
        goToLogin() {
            this.$router.push('/login'); //로그인 페이지로 이동
        },
        goToJoin() {
            this.$router.push('/join'); //회원가입 페이지로 이동
        }
    }
}
</script>
<style scoped>
#loginbtn {
    font-family: RecipekoreaOTF;
    font-size: 20px;
    font-weight: 900;
    border: 5px solid #5E395A;
    border-radius: 20px;
    width: 150px;
    height: 62px;
    padding: 15px 30px;
    background-color: #FFEFCA;
    color: #5E395A;
}
#joinbtn {
    font-family: RecipekoreaOTF;
    font-size: 20px;
    font-weight: 900;
    border: 5px solid #873511;
    border-radius: 20px;
    width: 150px;
    height: 62px;
    padding: 15px 30px;
    background-color: #FFEFCA;
    color: #873511;
}
#maincontainer {
  display: flex;
  flex-direction: column;
  align-items: center; 
  height: 100vh; 
  gap:40px;
  width: 100vw;
  height: 100wh;
  background-image: url('@/resources/mainbackimg.png');
  background-size: cover;
  min-height: 100vh;
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#firstimg {
   margin-top: 80px;
}
</style>