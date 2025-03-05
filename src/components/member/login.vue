<template>
  <div id="maincontainer">
    <main id="mainbox">
      <input id="inputId" type="text" name="userId" placeholder="ID"><br>
      <input id="inputPw" type="password" name="userPw" placeholder="Password"><br>
      <div id="checkbox">
        <input id="inputcheck" type="checkbox" name="remember">
        <span id="remembertext">아이디 기억하기</span>
      </div><br>
      <div id="btns">
        <button id="loginbtn" type="submit">로그인</button>
        <button id="resetbtn" type="reset">취소</button>
      </div>
    </main>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  name:'loginVue',
}
</script>
<style>
* {
  box-sizing: border-box;
}
#inputId {
  width: 715px;
  height: 115px;
  border: 7px solid #5E395A;
  border-radius: 30px;
  padding: 27px 32px;
  gap: 8px;
  margin-top:30px;
  margin-bottom: 20px;
  font-size: 28px;
}
#inputPw {
  width: 715px;
  height: 115px;
  border: 7px solid #5E395A;
  border-radius: 30px;
  padding: 27px 32px;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 28px;
}
#remembertext {
  font-size: 28px;
  font-weight: 400;
}
#maincontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1920px;
  height: 1080px;
}
#mainbox {
  display: block;
  justify-items: center;
  width: 890px;
  height: 658px;
  border-radius: 50px;
  border:7px solid #5E395A;
  background-color : #FFEFCA;
}
body {
 margin: 0;
 padding: 0;
 width: 100%;
 height: 100vh;
 /* background-image: url(@/resources/mainbackimg.png);
 background-size: cover; */
}
#loginbtn {
  width: 232px;
  height: 92px;
  border: 7px solid #6F3533;
  border-radius: 20px;
  background-color: #6F3533;
  color:#FFFFFF;
  padding: 20px 40px;
  font-weight: 400;
  margin-right: 20px;
  
}
#resetbtn {
  width: 232px;
  height: 92px;
  border: 7px solid #6F3533;
  color: #6F3533;
  padding: 20px 40px;
  border-radius: 20px;
  background-color: #FFEFCA;
  font-size: 24px;
  font-weight: 400;
  margin-left: 20px;
}
input[type="checkbox"] {
  width: 59px;
  height: 59px;
}
#checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  gap: 8px;
  margin-left: 32px; 
  width: 715px; 
}
#btns {
  margin-top: 52px;
}
</style>