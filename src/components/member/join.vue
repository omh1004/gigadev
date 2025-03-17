<template>
  <div id="maincontainer">
    <main id="mainbox">

      <div>
      <h1 id="title">회원가입</h1><br>
      <P id="must"><span>*</span>는 필수입력</P>

      <div id="first" class="input-group">
        <label for="userId"><span>*</span>ID (아이디)</label>
        <input id="userId" v-model="userId" name="userId" @input="validateId"><br>
        <p id="alertId" class="p" :class="{ 'error': !isIdValid && userId, 'success': isIdValid && userId }">
          * 5~20자의 영문 소문자, 숫자로만 입력해주세요.
        </p>
      </div>
        <button id="checkbtn" @click="checkIdDuplicate" :disabled="!isIdValid || userId.length === 0">ID (아이디) 중복확인</button>
        <p v-if="idChecked" :class="{ 'success-message': !isDuplicate, 'error-message': isDuplicate }">
          {{ idCheckMessage }}
        </p>

      <div class="input-group">
        <label for="userPw"><span>*</span>PW (비밀번호)</label>
        <input id="userPw" v-model="password" name="userPw" type="password" @input="validatePassword">
        <p id="alertPw" class="p" :class="{ 'error': !isPasswordValid && password, 'success': isPasswordValid && password }">
          *비밀번호는 8~10글자, 알파벳 소문자, 대문자, 숫자, 특수 기호를 포함해야 합니다.
        </p>
      </div>

      <div class="input-group">
        <label for="pwCheck"><span>*</span>PW (비밀번호) 재입력</label>
        <input id="pwCheck" name="pwCheck" type="password" v-model="passwordConfirm" @input="checkPasswordMatch"><br>
        <p v-if="passwordConfirm" :class="{ 'success-message': passwordsMatch, 'error-message': !passwordsMatch }">
          {{ passwordsMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.' }}
        </p>
      </div>

      <div class="input-group">
        <label for="email"><span>*</span>Email (이메일)</label>
        <input id="email" v-model="email" name="email" @input="validateEmail">
        <p v-if="email && !isEmailValid" class="error-message">유효한 이메일 형식이 아닙니다.</p>
      </div>

      <div class="input-group">
        <label for="nick"><span>*</span>닉네임 설정</label>
        <input id="nick" name="nick" v-model="nick" @input="validateNick">
        <p id="alertNick" class="p" :class="{ 'error': !isNickValid && nick, 'success': isNickValid && nick }">
          *2글자 이상,7글자 이하로 입력해 주세요.
        </p>
      </div>

      <div id="signbtnbox">
      <button id="signbtn" @click="signMember" :disabled="!canSignUp">sign up (회원가입)</button>
      </div>
      
    </div>

    </main>
  </div>
   
</template>
<script>
export default {
  name:'joinVue',
  data() {
    return {
      userId: '',
      password: '',
      passwordConfirm: '',
      email: '',
      nick: '',
      isIdValid: false,
      isPasswordValid: false,
      isEmailValid: false,
      isNickValid: false,
      passwordsMatch: false,
      idChecked: false,
      isDuplicate: false,
      idCheckMessage: ''
    }
  },
  computed: {
    canSignUp() {
      return this.isIdValid && 
             this.isPasswordValid && 
             this.isEmailValid && 
             this.isNickValid && 
             this.passwordsMatch && 
             !this.isDuplicate &&
             this.idChecked;
    }
  },
  methods: {
    validateId() {
      const idRegex = /^[a-z0-9]{5,20}$/;
      this.isIdValid = idRegex.test(this.userId);
      // ID가 변경되면 중복 체크 상태 초기화
      this.idChecked = false;
    },
    
    validatePassword() {
      // 비밀번호는 8~10글자, 알파벳 소문자, 대문자, 숫자, 특수 기호를 포함
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
      this.isPasswordValid = passwordRegex.test(this.password);
      this.checkPasswordMatch();
    },
    
    checkPasswordMatch() {
      this.passwordsMatch = this.password === this.passwordConfirm && this.password !== '';
    },
    
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = emailRegex.test(this.email);
    },
    
    validateNick() {
      // 닉네임은 2글자 이상 7글자 이하
      this.isNickValid = this.nick.length >= 2 && this.nick.length <= 7;
    },
    
    checkIdDuplicate() {
  if (!this.isIdValid) return;
  
  fetch('http://localhost:8080/spring/api/checkId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: this.userId })
  })
  .then(response => response.text())  // JSON이 아닌 text로 응답 처리
  .then(data => {
    this.idChecked = true;
    // "true"면 중복, "false"면 사용 가능
    this.isDuplicate = data === "true";
    this.idCheckMessage = this.isDuplicate 
      ? '이미 사용 중인 아이디입니다.' 
      : '사용 가능한 아이디입니다.';
  })
  .catch(error => {
    console.error('Error:', error);
    this.idChecked = true;
    this.isDuplicate = true;
    this.idCheckMessage = '중복 확인 중 오류가 발생했습니다.';
  });
}
    ,
    signMember() {
      if (!this.canSignUp) {
        alert('모든 필드를 올바르게 입력해주세요.');
        return;
      }
      
      fetch('http://localhost:8080/spring/api/enrollMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: this.userId,
          password: this.password,
          email: this.email,
          nick: this.nick
        })
      })
      .then(response => {
        console.log(response.status);
        
        if (!(response.ok)) {
          if (response.status == '404') {
            alert('회원을 찾을 수 없습니다.');
          } else {
            alert('회원을 찾을 수 없습니다.');
          }
        } else {
          alert('회원가입이 완료되었습니다.');
          this.goToMain();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    
    goToMain() {
      this.$router.push('/'); // 메인페이지로 이동
    }
  }
}
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
#checkbtn:disabled {
  background-color: #cccccc;
  border-color: #cccccc;
  cursor: not-allowed;
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
#signbtn:disabled {
  background-color: #cccccc;
  border-color: #cccccc;
  cursor: not-allowed;
}
.error {
  color: red;
}
.success {
  color: green;
}
.error-message {
  color: red;
  font-size: 1vw;
  margin-top: 0.5vh;
  text-align: center;
}
.success-message {
  color: green;
  font-size: 1vw;
  margin-top: 0.5vh;
  text-align: center;
}
</style>