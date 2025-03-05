<template>
  <div>
    <h2>회원가입</h2><br>
    <P>*는 필수입력</P>
    *ID (아이디) <input><br>
    <button>ID (아이디) 중복확인</button><br>
    *PW (비밀번호) <input><br>
    <p>*비밀번호는 8~10글자, 알파벳 소문자, 대문자, 숫자, 특수 기호를 포함해야 합니다.</p>
    *PW (비밀번호) 재입력 <input><br>
    *Email (이메일) <input><br>
    *닉네임 설정 <input><br>
    <p>*2글자 이상,7글자 이하로 입력해 주세요.</p>
    <button>sign up (회원가입)</button>
  </div>
</template>
<script>
export default {
  name:'joinVue',
  
}
</script>
<style>
  
</style>