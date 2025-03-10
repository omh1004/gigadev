<template>
  <div id="maincontainer">
    <div id="titlebox">
      <button id="backbtn"></button>
      <h1 id="maintitle">Id / Password 찾기</h1>
    </div>
    <main id="mainbox">
      <form>
        <div id="main1">  
          <h2><span>*</span>ID (아이디) 찾기</h2>
          <input class="firstinput" type="text" name="userNick" placeholder="닉네임을 입력하세요.">
          <input type="email" name="userEmail" placeholder="Email(이메일)을 입력하세요.">
          <button class="findbtn" id="idfindbtn">아이디 찾기</button>
        </div>
     </form>
     <form>
      <div id="main2">
        <h2><span>*</span>PW (비밀번호) 찾기</h2>
        <input calss="firstinput" type="text" name="userId" placeholder="Id(아이디)를 입력하세요.">
        <input type="text" name="userNick" placeholder="닉네임을 입력하세요.">
        <input type="email" name="userEmail" placeholder="Email(이메일)을 입력하세요.">
        <button class="findbtn" id="pwfindbtn">비밀번호 찾기</button>
      </div>
     </form>
    </main>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
* {
 box-sizing: border-box;
}
#maincontainer {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-image: url('@/resources/whiteimg.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 5%;
  
}
#backbtn {
  all:unset;
  width: 2vw;
  height: 2vw;
  background-image: url('@/resources/back.png');
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
#titlebox {
  display: flex;
}
#maintitle {
  margin: 0 auto;
}
#mainbox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 75vh;
  width: 100%;
  flex-grow: 1;
  gap:8%;
}
#main1 {
  background-color: #FFEFCA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:5%;
  border:3px solid #56174F;
  border-radius: 30px;
  width: 30vw;
  height: 40vh;
}
#main2 {
  background-color: #FFEFCA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:5%;
  border:3px solid #56174F;
  border-radius: 30px;
  width: 30vw;
  height: 40vh;
}
span {
  color: red;
}
input {
  border:3px solid #56174F;
  border-radius: 6px;
  width: 24vw;
  height: 5vh;
  padding-left: 1vw;
}
.firstinput {
  margin-top: 0;
}
.findbtn {
  background-color: #56174F;
  color:#FFFFFF;
  font-size: 1.1vw;
  font-weight: bold;
  padding: 2% 10%;
  border: #56174F;
  border-radius: 7px;
  cursor: pointer;

}
#idfindbtn {
  margin-top: 3vh;
}
#pwfindbtn {
  margin-top: -0.5vh;
}
</style>