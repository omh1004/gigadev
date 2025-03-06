<template>
    <div class="bank-container">
      <!-- 달력 -->
      <div class="calandar"></div>
  
      <!-- 버튼 컨테이너 (달력 오른쪽에 세로 정렬) -->
      <div class="button-container">
        <button 
          class="tab-button loan-history-btn"
          :class="{ active: activeTab === 'loanHistory' }"
          @click="activeTab = 'loanHistory'"
        >
          대출내역
        </button>
        <button 
          class="tab-button loan-btn"
          :class="{ active: activeTab === 'loan' }"
          @click="activeTab = 'loan'"
        >
          대출
        </button>
        <button 
          class="tab-button sales-settlement-btn"
          :class="{ active: activeTab === 'salesSettlement' }"
          @click="activeTab = 'salesSettlement'"
        >
          매출정산
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: "loanHistory", // 기본 선택된 탭
      };
    }
  };
  </script>
  
  <style scoped>
  /* 전체 컨테이너 스타일 */
  .bank-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("@/resources/bankbg.png");
    background-size: 100% 100%;
    position: relative;
  }
  
  /* 달력 스타일 */
  .calandar {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1025px;
    height: 525px;
    background-image: url("@/resources/calander.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  /* 버튼 컨테이너 (달력 옆에 세로 정렬) */
  .button-container {
    position: absolute;
    top: 58%; /* 기존보다 살짝 내림 */
    left: calc(50% + 340.7px); /* 달력 오른쪽에 딱 붙게 조정 */
    transform: translateY(-50%);
    display: flex;
    flex-direction: column; /* 버튼을 세로로 정렬 */
    gap: 5px; /* 버튼 간격 */
  }
  
  /* 공통 버튼 스타일 */
  .tab-button {
    width: 50px;
    background: #481B0B; /* 기본 진한 갈색 */
    color: white;
    border: none;
    border-radius: 0 15px 15px 0;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;
  
    /* 세로 글씨 정렬 */
    writing-mode: vertical-rl;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* 개별 버튼 크기 지정 */
  .loan-history-btn {
    height: 120px; /* 대출내역 버튼 */
  }
  
  .loan-btn {
    height: 80px; /* 대출 버튼 (작게 조정) */
  }
  
  .sales-settlement-btn {
    height: 120px; /* 매출정산 버튼 */
  }
  
  /* 버튼 hover 효과 */
  .tab-button:hover {
    background: #3D261B;
  }
  
  /* 활성화된 버튼 스타일 (눌린 상태) */
  .tab-button.active {
    background: #F9F8F2; /* 활성화된 버튼 배경 */
    color: #481B0B; /* 활성화된 글자 색 */
  }
  
  /* ✅ 절취선: 기본적으로 숨김 */
  .tab-button::before {
    content: "";
    position: absolute;
    left: -4px;
    top: 10%;
    height: 80%;
    width: 4px;
    border-left: 2px dashed #D5CCC4;
    display: none; /* 기본적으로 숨김 */
  }
  
  /* ✅ 활성화된 버튼에 절취선 표시 */
  .tab-button.active::before {
    display: block;
  }
  </style>