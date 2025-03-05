<template>
    <div>
        <div id="maincontainer">
            <img id="firstimg" src="@/resources/tycoon.png" alt="지붕있는 타이쿤 이미지">
            <img id="secondimg" src="@/resources/tycoonname.png" alt="타이쿤 이름 이미지">
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
    font-size: 24px;
    border: 7px solid #5E395A;
    border-radius: 20px;
    width: 232px;
    height: 92px;
    padding: 20px 40px;
    gap: 8px;
    background-color: #FFEFCA;
    color: #5E395A;
}
#joinbtn {
    font-family: RecipekoreaOTF;
    font-size: 24px;
    border: 7px solid #873511;
    border-radius: 20px;
    width: 232px;
    height: 92px;
    padding: 20px 40px;
    gap: 8px;
    background-color: #FFEFCA;
    color: #873511;
}
#maincontainer {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  gap: 40px; 
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>