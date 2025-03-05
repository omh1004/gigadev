<template>
    <div class="bank-container">
      <!-- <img class="bank-background" src="@/resources/bankbg.png" alt="Bank Background" /> -->
      
    
  
        <div class="calandar">
            
        </div>
      </div>
   
  </template>
  
  <script>
  export default {
    methods: {
      openAccount() {
        console.log("계좌 개설 버튼 클릭됨");
        // 계좌 개설 로직 추가
      },
      deposit() {
        console.log("입금 버튼 클릭됨");
        // 입금 처리 로직 추가
      },
      withdraw() {
        console.log("출금 버튼 클릭됨");
        // 출금 처리 로직 추가
      },
      loan() {
        console.log("대출 신청 버튼 클릭됨");
        // 대출 신청 로직 추가
      },
    },
  };
  </script>
  
  <style scoped>
  .calandar{
    background-image: url(@/resources/calander.png);
    background-size:100% 100%;
    min-width:500px;
    min-height:500px;
  }

  .bank-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image:url(@/resources/bankbg.png);
    background-size:100% 100%;
  }
  
  /* .bank-background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  } */
  
  .bank-content {
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
  
  button {
    background: #FFD700;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
  }
  
  button:hover {
    background: #FFA500;
  }
  </style>
  