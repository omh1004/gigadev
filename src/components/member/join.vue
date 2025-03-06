<template>
  <div id="maincontainer">
    <main id="mainbox">
      <div>
      <h1 id="title">회원가입</h1><br>
      <P id="must"><span>*</span>는 필수입력</P>

      <div id="first" class="input-group">
        <label for="userId"><span>*</span>ID (아이디)</label>
        <input id="userId" name="userId"><br>
        <p id="alertId" class="p">* 5~20자의 영문 소문자, 숫자로만 입력해주세요.</p>
      </div>
        <button id="checkbtn">ID (아이디) 중복확인</button>

      <div class="input-group">
        <label for="userPw"><span>*</span>PW (비밀번호)</label><input id="userPw" name="userPw">
        <p id="alertPw" class="p">*비밀번호는 8~10글자, 알파벳 소문자, 대문자, 숫자, 특수 기호를 포함해야 합니다.</p>
      </div>

      <div class="input-group">
        <label for="pwCheck"><span>*</span>PW (비밀번호) 재입력</label><input id="pwCheck" name="pwCheck"><br>
      </div>

      <div class="input-group">
        <label for="email"><span>*</span>Email (이메일)</label><input id="email" name="email">
      </div>

      <div class="input-group">
        <label for="nick"><span>*</span>닉네임 설정</label><input id="nick" name="nick">
        <p id="alertNick" class="p">*2글자 이상,7글자 이하로 입력해 주세요.</p>
      </div>

      <div id="signbtnbox">
      <button id="signbtn">sign up (회원가입)</button>
      </div>
    </div>
    </main>
  </div>
   
</template>
<script>
export default {
  name:'joinVue',
  
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}
#title {
  text-align: center;
}
span {
  color: red;
  margin-right: 5px;
}
label {
  font-size: 20px;
  font-weight: 900;
}
#must {
  text-align: end;
  font-size: 16px;
  margin-right: 20px;
}
#first {
  margin-top: 20px;
}
.p {
  font-size: 14px;
}
#alertId {
  color:red;
  padding-top: 0px;
  text-box-trim: trim-start;
  margin-left: -334px;
  margin-top: 8px;
}
#alertPw {
  margin-left: -150px;
  margin-top: -3px;
}
#maincontainer {
  background-image: url('@/resources/whiteimg.png');
  background-size: cover;
  min-height: 100vh;
}
#mainbox {
  display: flex;
  justify-content: center;
  padding: 30px 70px;
}
.input-group {
  line-height: 40px;
}
#userId {
  margin-left: 197px;
  width: 901px;
  height: 40px;
  border:3px solid #6F3533;
  border-radius: 5px;
}
#checkbtn {
  color:#ffffff;
  background-color: #6F3533;
  border: 3px solid #6F3533;
  border-radius: 5px;
  padding: 5px 10px;
  width: 1200px;
  height: 30px;
  font-weight: 600;
  cursor: pointer;
}
#userPw {
  margin-top: 20px;
  margin-left: 170px;
  width: 900px;
  height: 40px;
  border:3px solid #6F3533;
  border-radius: 5px;
}
#pwCheck {
  margin-top: 20px;
  margin-left: 113px;
  width: 900px;
  height: 40px;
  border:3px solid #6F3533;
  border-radius: 5px;
}
#email {
  margin-top: 20px;
  margin-left: 170px;
  width: 900px;
  height: 40px;
  border:3px solid #6F3533;
  border-radius: 5px;
}
#nick {
  margin-top: 20px;
  margin-left: 197px;
  width: 900px;
  height: 40px;
  border:3px solid #6F3533;
  border-radius: 5px;
}
#alertNick {
  text-box-trim:trim-start;
  margin-top: 8px;
  color: red;
  margin-left: -380px;
}
#signbtnbox {
  display: flex;
  justify-content: center;
}
#signbtn {
  margin-top: 30px;
  padding: 5px 10px;
  border:3px solid #56174F;
  border-radius: 10px;
  background-color: #56174F;
  color:#ffffff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
</style>