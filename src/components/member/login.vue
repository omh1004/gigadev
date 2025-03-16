<template>
  <div id="maincontainer">
    <form>
    <main id="mainbox">
      <input id="inputId" type="text" name="userId" v-model="inputId" placeholder="ID"><br>
      <input id="inputPw" type="password" name="userPw" v-model="inputPw"  placeholder="Password"><br>
      <div id="checkbox">
        <input id="inputcheck" type="checkbox" name="remember">
        <span id="remembertext">아이디 기억하기</span>
      </div><br>
      <div id="btns">
        <button id="loginbtn" type="button" @click="loginAccess">로그인</button>
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
  data(){
    return {
      inputId:''
      ,inputPw:''
    }
  }
  ,methods: {
    loginAccess:function() {

      fetch(
        'http://localhost:8080/spring/api/loginMember'
      ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: this.inputId,
          password: this.inputPw
        })
      })
      .then(response => 
      {

       console.log(response.status)
       alert(response.status)

      if (!(response.ok)) {
        if (response.status == '404') {
          alert('회원을 찾을 수 없습니다.');
          
        } else {
          alert('회원을 찾을 수 없습니다.');
          
        }
      }else{
        alert('로그인성공!');
        this.goToHome();
      }
      
      // return response.json();
    })
    


 
    }
    ,goToHome(){
      this.$router.push('/homeMenu');
    }
    ,goToMain() {
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
  margin-bottom: 3vh;
  font-size: 1.3vw;
}
#inputPw {
  width: 29.4vw;
  height: 8vh;
  border: 0.3vw solid #5E395A;
  border-radius: 1.2vw;
  padding: 1vw 1vw;
  margin-bottom: 2vh;
  font-size: 1.3vw;
}

#maincontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(/background/convenientbg2.png);
  background-size: 100% 100%;
  min-height: 100vh;
}
#mainbox {
  display: block;
  justify-items: center;
  width: 37vw;
  height: 53vh;
  border:0.3vw solid #5E395A;
  border-radius: 2.2vw;
  background-color : #FFEFCA;
  margin-top: -10vh;
}
#loginbtn {
  width: 12vw;
  height: 7.6vh;
  border: 0.3vw solid #6F3533;
  border-radius: 1.1vw;
  background-color: #6F3533;
  color:#FFFFFF;
  padding: 1vw 2vw;
  font-weight: 900;
  font-size: 1.4vw;
  margin-right: 1.7vw;
  cursor: pointer;
}
#resetbtn {
  width: 12vw;
  height: 7.6vh;
  border: 0.3vw solid #6F3533;
  color: #6F3533;
  padding: 1vw 2vw;
  border-radius: 1.1vw;
  background-color: #FFEFCA;
  font-size: 1.5vw;
  font-weight: 900; 
  margin-left: 1.7vw;
  cursor: pointer;
}

#checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  gap: 0.4vw;
  margin-left: 9vw; 
  width: 100%; 
  font-size: 1.3vw;
  font-weight: 600;
  height: 2vh;
  accent-color: #6F3533;
  cursor: pointer; 
}
#inputcheck {
  width: 2.2vw;
  height: 2.2vh;

}
#btns {
  margin-top: 4vh;
}
#findbtn {
  all:unset;
  margin-top:5vh;
  font-weight: bold;
  font-size: 1vw;
  cursor: pointer;
}
</style>