<template>
  <div id="maincontainer">
    <main id="mainbox">

      <div>
      <h1 id="title">회원가입</h1><br>
      <P id="must"><span>*</span>는 필수입력</P>

      <div id="first" class="input-group">
        <label for="userId"><span>*</span>ID (아이디)</label>
        <input id="userId" v-model="userId" name="userId"><br>
        <p id="alertId" class="p">* 5~20자의 영문 소문자, 숫자로만 입력해주세요.</p>
      </div>
        <button id="checkbtn">ID (아이디) 중복확인</button>

      <div class="input-group">
        <label for="userPw"><span>*</span>PW (비밀번호)</label><input id="userPw" v-model="password" name="userPw">
        <p id="alertPw" class="p">*비밀번호는 8~10글자, 알파벳 소문자, 대문자, 숫자, 특수 기호를 포함해야 합니다.</p>
      </div>

      <div class="input-group">
        <label for="pwCheck"><span>*</span>PW (비밀번호) 재입력</label><input id="pwCheck" name="pwCheck"><br>
      </div>

      <div class="input-group">
        <label for="email"><span>*</span>Email (이메일)</label><input id="email" v-model="email" name="email">
      </div>

      <div class="input-group">
        <label for="nick"><span>*</span>닉네임 설정</label><input id="nick" name="nick" v-model="nick">
        <p id="alertNick" class="p">*2글자 이상,7글자 이하로 입력해 주세요.</p>
      </div>

      <div id="signbtnbox">
      <button id="signbtn" @click="signMember">sign up (회원가입)</button>
      </div>
      
    </div>

    </main>
  </div>
   
</template>
<script>

// const member={
//   userId: 'ddd',
//   password: 'ddd',
//   email: 'ddd',
//   nick: 'dd'
// }

export default {
  name:'joinVue'
  ,data(){
    return {
      userId: ''
      ,password: ''
      ,email: ''
      ,nick: ''
    }
  }
  ,methods:{
     signMember:function() {
      fetch('http://localhost:9090/spring/api/enrollMember',{
        method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           userId: this.userId
           ,password: this.password
            ,email: this.email
            ,nick: this.nick
          //   userId: "admin11"
          //  ,password: 1234
          //  ,email: "admin@gmail.com"
          //   ,nick: "string"
         })
      }
        ).then(response => response.json())
        .then((data) => {
          console.log('Success:', data);
          if(data.result === 'success') {
            alert('회원가입이 완료되었습니다.');
            // this.$router.push({name:'loginVue'});
          } else {
            alert('회원가입에 실패하였습니다.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        })
      }     
     }
    }
  


//       fetch('http://localhost:8080/spring/api/enrollMember',{
//         method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body: JSON.stringify({
//            "member":this.model
//            ,"email":this.email
//             ,"nick":this.nick
//          }
         
//         )
//       .then(response => response)
//       .then((data) => {
//         console.log('Success:', data);
//         if(data.result === 'success') {
//           alert('회원가입이 완료되었습니다.');
//           this.$router.push({name:'loginVue'});
//         } else {
//           alert('회원가입에 실패하였습니다.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })

      
//       })
  
    
  
// },
//   },


</script>
<style scoped>
* {
  box-sizing: border-box;
}
#title {
  text-align: center;
  font-size: 2vw;
  margin-top: 5vh;
}
span {
  color: red;
  margin-right: 0.7vw;
}
label {
  font-size: 1.4vw;
  font-weight: 900;
}
#must {
  text-align: end;
  font-size: 1.2vw;
}
#first {
  margin-top: 1.2vh;
}
.p {
  font-size: 1vw;
}
#alertId {
  color:red;
  padding-top: 0;
  text-box-trim: trim-start;
  margin-top: 1vh;
  margin-left: 23vw;
}
#alertPw {
  margin-top: -0.3vh;
  margin-left: 23vw;
}
#maincontainer {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/background/whitebg.png');
  background-size: 100% 100%;
  min-height: 100vh;
}
#mainbox {
  display: flex;
  justify-content: center;
}
.input-group {
  line-height: 5vh;
}
#userId {
  margin-left: 14vw;
  width: 67vw;
  height: 5vh;
  border:0.25vw solid #6F3533;
  border-radius: 0.4vw;
}
#checkbtn {
  color:#ffffff;
  background-color: #6F3533;
  border: 0.25vw solid #6F3533;
  border-radius: 0.25vw;
  width: 88.65vw;
  height: 3.8vh;
  font-size: 1vw;
  font-weight: 600;
  cursor: pointer;
}
#userPw {
  margin-top: 3vh;
  margin-left: 12vw;
  width: 67.1vw;
  height: 5vh;
  border:0.25vw solid #6F3533;
  border-radius: 0.25vw;
}
#pwCheck {
  margin-top: 3vh;
  margin-left: 8vw;
  width: 67vw;
  height: 5vh;
  border:0.25vw solid #6F3533;
  border-radius: 0.25vw;
}
#email {
  margin-top: 3vh;
  margin-left: 12vw;
  width: 66.9vw;
  height: 5vh;
  border:0.25vw solid #6F3533;
  border-radius: 0.25vw;
}
#nick {
  margin-top: 3vh;
  margin-left: 14vw;
  width: 66.8vw;
  height: 5vh;
  border:0.25vw solid #6F3533;
  border-radius: 0.25vw;
}
#alertNick {
  text-box-trim:trim-start;
  margin-top: 1vh;
  color: red;
  margin-left: 23vw;
}
#signbtnbox {
  display: flex;
  justify-content: center;
}
#signbtn {
  margin-top: 4vh;
  padding: 0.6vw 2vw;
  border:0.25vw solid #56174F;
  border-radius: 0.6vw;
  background-color: #56174F;
  color:#ffffff;
  font-size: 1.3vw;
  font-weight: 600;
  cursor: pointer;
}
</style>