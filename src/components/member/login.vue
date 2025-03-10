<template>
  <div id="maincontainer">
    <form>
    <main id="mainbox">
      <input id="inputId" type="text" name="userId" placeholder="ID"><br>
      <input id="inputPw" type="password" name="userPw" placeholder="Password"><br>
      <div id="checkbox">
        <input id="inputcheck" type="checkbox" name="remember">
        <span id="remembertext">아이디 기억하기</span>
      </div><br>
      <div id="btns">
        <button id="loginbtn" type="submit">로그인</button>
        <button id="resetbtn" type="reset" @click="goToMain">취소</button>
      </div>
      <div id="findbox">
        <button id="findbtn" type="submit" @click="goToFind">Id / Password 찾기</button>
      </div>
    </main>
  </form>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  name:'loginVue',
  methods: {
    goToMain() {
      this.$router.push('/'); //메인페이지로 이동
    },
    goToFind() {
      this.$router.push('/find'); //id,pw찾기 페이지로 이동
    }
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}
#inputId {
  width: 29.4vw;
  height: 8vh;
  border: 0.3vw solid #5E395A;
  border-radius: 1.2vw;
  padding: 1vw 1vw;
  margin-top:6vh;
  margin-bottom: 20px;
  font-size: 18px;
}
#inputPw {
  width: 29.4vw;
  height: 8vh;
  border: 0.3vw solid #5E395A;
  border-radius: 1.2vw;
  padding: 1vw 1vw;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 18px;
}

#maincontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100wh;
  background-image: url(@/resources/mainback2.png);
  background-size: cover;
  min-height: 100vh;
}
#mainbox {
  display: block;
  justify-items: center;
  width: 37vw;
  height: 53vh;
  border-radius: 30px;
  border:0.3vw solid #5E395A;
  background-color : #FFEFCA;
  margin-top: -120px;
}
#loginbtn {
  width: 160px;
  height: 60px;
  border: 0.3vw solid #6F3533;
  border-radius: 15px;
  background-color: #6F3533;
  color:#FFFFFF;
  padding: 10px 30px;
  font-weight: 900;
  font-size: 18px;
  margin-right: 20px;
  cursor: pointer;
}
#resetbtn {
  width: 160px;
  height: 60px;
  border: 0.3vw solid #6F3533;
  color: #6F3533;
  padding: 10px 30px;
  border-radius: 15px;
  background-color: #FFEFCA;
  font-size: 18px;
  font-weight: 900; 
  margin-left: 20px;
  cursor: pointer;
}

#checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  gap: 8px;
  margin-left: 32px; 
  width: 400px; 
  font-size: 18px;
  font-weight: 600;
  height: 16px; 
  accent-color: #6F3533;
  cursor: pointer; 
}
#btns {
  margin-top: 30px;
}
#findbtn {
  all:unset;
  margin-top:15px;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
}
</style>