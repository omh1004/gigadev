<template>
  <div id="maincontainer">
    <div id="titlebox">
      <button id="backbtn" @click="goToLogin"></button>
      <h1 id="maintitle">Id / Password 찾기</h1>
    </div>
    <main id="mainbox">
      <form>
        <div id="main1">  
          <h2><span>*</span>ID (아이디) 찾기</h2>
          <input class="firstinput" type="text"  name="userNick" v-model="userNick" placeholder="닉네임을 입력하세요.">
          <input type="email"  name="userEmail" v-model="email" placeholder="Email(이메일)을 입력하세요.">
          <button class="findbtn" id="idfindbtn" @click="findId">아이디 찾기</button>
        </div>
     </form>
     <form>
      <div id="main2">
        <h2><span>*</span>PW (비밀번호) 찾기</h2>
        <input calss="firstinput" type="text" name="userId" v-model="userId" placeholder="Id(아이디)를 입력하세요.">
        <input type="text" name="userNick" v-model="nick" placeholder="닉네임을 입력하세요.">
        <input type="email" name="userEmail" v-model="userEmail" placeholder="Email(이메일)을 입력하세요.">
        <button class="findbtn" id="pwfindbtn" @click="findPwd">비밀번호 찾기</button>
      </div>
     </form>
    </main>
  </div>
</template>
<script>
export default {
  name: 'findVue',
  data(){
    return{
      userNick: '',
      userEmail: '',
      userId: '',
      nick: '',
      email: '',
      
    }
  }
  ,methods: {
    goToLogin() {
      this.$router.push('/login'); // 로그인 페이지로 이동
    }
    ,findId:function(){
      fetch("http://localhost:9090/spring/api/findId",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({
          nick: this.userNick,
          email: this.email
        })
      })
      .then(response => {
        // debugger;
      alert('1111111111111111111111');
      console.log('response'+response.status);
   
        console.log('response'+response.ok);
      // if (!(response.ok)) {
      //   if (response.status == '404') {
      //     alert('회원을 찾을 수 없습니다.');
          
      //   } else {
      //     alert('회원을 찾을 수 없습니다.');
          
      //   }
      // }else{
      //   debugger;
      //   console.log(response.json());
        
      // }
      
      response.json();
    })
    .then((data) => {
      alert('1111111111111111111111');
      console.log(data);
    })
    }
    ,findPwd:function(){
      fetch("http://localhost:9090/spring/api/findPwd",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({
          userId: this.userId,
          nick: this.nick,
          email: this.email
        })
      }).then(res => res.json())
      .then(res => {
        if(res.result === 'success'){
          alert('비밀번호는 '+res.userPwd+' 입니다.');
        }else{
          alert('일치하는 정보가 없습니다.');
        }
      })
    }
  }
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
  background-image: url('@/assets/background/whitebg.png');
  background-size: 100% 100%;
  padding: 5%;
  
}
#backbtn {
  all:unset;
  width: 2vw;
  height: 2vw;
  background-image: url('@/assets/icons/back.png');
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
h1 {
  font-size: 2.2vw;
}
h2 {
  font-size: 1.6vw;
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
  border:0.3vw solid #56174F;
  border-radius: 2vw;
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
  border:0.3vw solid #56174F;
  border-radius: 2vw;
  width: 30vw;
  height: 40vh;
}
span {
  color: red;
}
input {
  border:0.2vw solid #56174F;
  border-radius: 0.8vw;
  width: 24vw;
  height: 5vh;
  padding-left: 1vw;
}
input::placeholder {
  font-size: 1vw;
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
  border-radius: 0.5vw;
  cursor: pointer;

}
#idfindbtn {
  margin-top: 3vh;
}
#pwfindbtn {
  margin-top: -0.5vh;
}
</style>