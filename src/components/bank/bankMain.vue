<template>
  <div class="bank-container">
    <!-- ✅ 달력 (항상 보이게 유지) -->
    <div class="calandar">
      <!-- ✅ 대출 내역 표시 (대출내역 버튼 클릭 시) -->
      <div class="loan-history" v-if="activeTab === 'loanHistory'" style="top: 13%;">
        <div class="loan-header" style="display: flex; justify-content: end;">
          <span class="title" style="text-align: end;">대출 합계 : {{ totalLoan.toLocaleString() }}원</span>
        </div>
        <hr style="border: 3px solid #481B0B">
        <table class="loan-table">
          <tbody>
            <tr v-for="(loan, index) in loanRecords" :key="index">
              <td>{{ loan.date }}</td>
              <td>{{ loan.type }}</td>
              <td class="amount">+{{ loan.amount.toLocaleString() }}원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ✅ 대출 신청 화면 (대출 버튼 클릭 시) -->
      <div class="loan-apply" v-if="activeTab === 'loan'">
        <h2 style="top: 10%;">중간 운영 대출</h2>
        <hr class="loan-divider" style="border: 3px solid #481B0B">  <!-- ✅ 선 추가 -->
        

         <!-- ✅ 대출 최대 한도 -->
      <div class="loan-info">
        <span class="loan-label">대출 최대 한도</span>
        <span class="loan-value">{{ formattedLimit }}</span>
      </div>

      

    <!-- ✅ 대출 받을 금액 입력란 (정렬 개선) -->
    <div class="loan-input-container loan-info">
      <label class="loan-label">대출 받을 금액</label>
      <div class="loan-input-wrapper">
        <input 
          class="loan-input"
          v-model="loanAmount" 
          type="number" 
          placeholder="금액 입력"
          @input="validateInput"
        />
        <span class="currency">원</span>
        <button class="info-btn" @mouseover="showHelp = true" @mouseleave="showHelp = false">?</button>
      </div>

      <!-- ✅ 안내 문구 -->
      <p v-if="showHelp" class="loan-guide">대출 받을 금액을 입력하세요. <br> 100원 단위부터 가능!</p>
    </div>



      <!-- ✅ 대출하기 버튼 컨테이너 추가 -->
      <div class="loan-button-container">
        <button class="loan-btn1" @click="applyLoan"></button>
      </div>


        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>

    <!-- ✅ 버튼 컨테이너 (달력 옆으로 배치) -->
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
      totalLoan: 1410000, // 대출 합계 금액
      loanLimit: 1000000, // 대출 가능 한도
      loanAmount: "", // 대출 입력값
      errorMessage: "", // 오류 메시지
      MIN_LOAN_AMOUNT: 100, // ✅ 최소 대출 금액 설정 (100원)
      loanRecords: [
        { date: "2025.01.20", type: "중간 운영 대출금", amount: 100000 },
        { date: "2025.01.15", type: "중간 운영 대출금", amount: 50000 },
        { date: "2025.01.12", type: "중간 운영 대출금", amount: 20000 },
        { date: "2025.01.10", type: "중간 운영 대출금", amount: 40000 },
        { date: "2025.01.07", type: "중간 운영 대출금", amount: 40000 },
        { date: "2025.01.05", type: "중간 운영 대출금", amount: 200000 },
        { date: "2025.01.01", type: "초기 운영 대출금", amount: 1000000 },
      ],

      // 물음표 호버 기능!!
      showHelp:false,
    };
  },
  computed: {
    formattedLimit() {
      return this.loanLimit.toLocaleString() + "원";
    }
  },
  methods: { 
    validateInput() {
      if (this.loanAmount < 0) {
        this.loanAmount = "";
        this.errorMessage = "대출 금액은 0 이상이어야 합니다.";
      } else if (this.loanAmount > 0 && this.loanAmount < 100) { // ✅ 최소 대출 금액 체크 추가
        this.errorMessage = "대출 금액은 최소 100원 이상이어야 합니다.";
      } else {
        this.errorMessage = "";
      }
    },
    
    applyLoan() {
      const amount = Number(this.loanAmount);
      
      if (!amount || amount <= 0) {
        this.errorMessage = "대출 금액을 입력하세요.";
        return;
      }

      if (amount < 100) { // ✅ 최소 대출 금액 체크 추가
        this.errorMessage = "대출 금액은 최소 100원 이상이어야 합니다.";
        return;
      }

      if (amount > this.loanLimit) {
        this.errorMessage = "대출 가능 금액을 초과했습니다.";
        return;
      }

      // 대출 승인 처리
      this.loanLimit -= amount;
      this.totalLoan += amount;

      // 대출 내역 추가
      this.loanRecords.unshift({
        date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
        type: "신규 대출",
        amount: amount,
      });

      // 초기화
      this.loanAmount = "";
      this.errorMessage = "";
      alert("대출 신청이 완료되었습니다.");
    }
  }
};
</script>

<style scoped>
/* 기존 스타일 유지 */
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

.calandar {
  position: relative;
  width: 1025px;
  height: 525px;
  background-image: url("@/resources/calendar.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ✅ 대출 신청 스타일 */
.loan-apply {
  position: absolute;
  width: 60%;
  max-height: 75%;
  background: #F9F8F2;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-top: 50px; /* 기존보다 아래로 내리기 */
}

.loan-apply h2 {
  font-size: 24px;
  font-weight: bold;
  
}

.loan-apply button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 8px;
}

/* ✅ 버튼 컨테이너 */
.button-container {
  position: absolute;
  top: 50%;
  left: calc(50% + 341px);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tab-button {
  width: 50px;
  background: #481B0B;
  color: white;
  border: none;
  border-radius: 0 15px 15px 0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  writing-mode: vertical-rl;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-button:hover {
  background: #3D261B;
}

.tab-button.active {
  background: #F9F8F2;
  color: #481B0B;
}

.tab-button.active::before {
  content: "";
  position: absolute;
  left: -4px;
  top: 10%;
  height: 80%;
  width: 4px;
  border-left: 2px dashed #D5CCC4;
}



/* ----- */

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

.calandar {
  position: relative;
  width: 1025px;
  height: 525px;
  background-image: url("@/resources/calendar.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ✅ 대출 내역 스타일 */
.loan-history {
position: absolute;  /* ✅ 달력 내부에 고정되도록 수정 */
width: 60%; /* ✅ 달력 안에서 최대한 넓게 차지 */
max-height: 75%;  /* ✅ 달력 높이에 맞춤 (스크롤 추가) */
overflow-y: auto;  /* ✅ 내용이 넘칠 경우 스크롤 추가 */
background: #F9F8F2;
padding: 20px;
border-radius: 10px;
}

/* 개별 버튼 크기 */
.loan-history-btn {
height: 120px;
}


/* 대출 내역 제목 ----------*/
.loan-header {
font-size: 24px;
font-weight: bold;
margin-bottom: 10px;
text-align: center;
}

/* ✅ 대출 내역 테이블 */
.loan-table {
width: 100%;
border-collapse: collapse;
background-color: #F9F8F2;
}

.loan-table td {
padding: 10px;
border-bottom: 1px solid #EBE5DD;
font-size: 18px;
}

.loan-table tr:nth-child(even) {
background-color: #EBE5DD; /* 연한 회색 */
}

.loan-table .amount {
  text-align: right;
  font-weight: bold;
}

/* ✅ 대출 신청 스타일 추가 */
.loan-apply {
  position: absolute;
  width: 60%;
  max-height: 75%;
  background: #F9F8F2;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.loan-apply h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px; /* 아래 간격 조정 */
}

/* hr 선 위치 조정 */
.loan-divider {
  border: 2px solid #481B0B;
  margin-top: 15px; /* 상단 여백 추가 */
  margin-bottom: 30px; /* 아래 여백 추가 */
  width: 100%;
}


/* .loan-apply input {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
} */

/* .loan-apply button {
  margin-top: 12px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
} */

.loan-apply button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 8px;
}

/* ✅ 버튼 컨테이너 유지 */
.button-container {
position: absolute;
top: 50%;
left: calc(50% + 341px); /* 버튼이 테이블과 겹치지 않도록 조정 */
transform: translateY(-50%);
display: flex;
flex-direction: column;
gap: 5px;
}

/* ✅ 버튼 스타일 */
.tab-button {
width: 50px;
background: #481B0B;
color: white;
border: none;
border-radius: 0 15px 15px 0;
font-size: 18px;
font-weight: bold;
cursor: pointer;
transition: all 0.3s ease-in-out;
position: relative;
writing-mode: vertical-rl;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
}

.tab-button:hover {
  background: #3D261B;
}

/* ✅ 활성화된 버튼 스타일 (위, 오른쪽, 아래 테두리 적용) */
.tab-button.active {
  background: #F9F8F2;
  color: #481B0B;
  border: none; /* 기존 테두리 제거 */
  border-top: 5px solid #481B0B; /* 위쪽 갈색 선 */
  border-right: 5px solid #481B0B; /* 오른쪽 갈색 선 */
  border-bottom: 5px solid #481B0B; /* 아래쪽 갈색 선 */
}


.tab-button.active::before {
content: "";
position: absolute;
left: -4px;
top: 10%;
height: 80%;
width: 4px;
border-left: 2px dashed #D5CCC4;
}




/* ✅ 버튼의 기본 스타일 제거  ======= */
/* ✅ 버튼의 기본 스타일 제거 */
.loan-btn1 {
  background: url("@/resources/loan-btn.png") no-repeat center;
  background-size: contain;
  display: block;
  width: 186px;
  height: 76px;
  border: none;
  cursor: pointer;
  position: relative;
  outline: none !important; /* 모든 포커스 효과 제거 */
  margin: auto; /* 중앙 정렬 */
}

/* ✅ 마우스 올릴 때 기본 효과 제거 */
.loan-btn1:focus,
.loan-btn1:active,
.loan-btn1:hover,
.loan-btn1:focus-visible {
  outline: none !important;
  box-shadow: none !important; /* 파란색 잔상 제거 */
  background-color: transparent !important; /* 배경색 변경 방지 */
  border: none !important;
}

/* ✅ 브라우저 기본 포커스 스타일 제거 (Firefox 대응) */
.loan-btn1::-moz-focus-inner {
  border: 0 !important;
}

/* ✅ 강제 적용 (버튼 기본 스타일 완전 제거) */
button.loan-btn1 {
  all: unset; /* 버튼의 모든 기본 스타일 제거 */
  display: block;
  width: 120px;
  height: 68px;
  background: url("@/resources/loan-btn.png") no-repeat center;
  background-size: contain;
  cursor: pointer;
}





.info-btn:hover {
  background: #481B0B;
  color: #fff;
}


/* ✅ 입력 필드 및 버튼 정렬 */
.loan-input-container {
  display: flex;
  flex-direction: row;  /* 세로 정렬 */
  align-items: center; /* 왼쪽 정렬 */
  gap: 10px;
  margin-bottom: 15px;
}

/* ✅ 대출 입력 필드 및 단위 정렬 */
.loan-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ✅ 대출 입력 필드 스타일 */
.loan-input {
  width: 150px;
  padding: 8px;
  border: 1px solid #A68A64;
  border-radius: 5px;
  text-align: right;
  font-size: 18px;
}


/* 대출 */

/* 대출 최대 한도와 금액 정렬 */
.loan-info {
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 50px; /* 아래 여백 줄이기 */
  margin: 0px 60px 90px;
  gap: 20px; /* 라벨과 금액 사이 간격 줄이기 */
}

/* 대출 받을 금액 정렬 */
.loan-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px; /* 입력창과 "대출 받을 금액" 사이 간격 조정 */
}


.input{
  width: 11px;  /* ✅ 입력창 너비 조정 */
  padding: 8px;
  border: 1px solid #A68A64;
  border-radius: 5px;
  text-align: right;
  font-size: 18px;
}

.currency {
  font-size: 18px;
  font-weight: bold;
}

/* ✅ 물음표 버튼 스타일 */

.info-btn {
  width: 24px;
  height: 24px;
  background: #ffffff;
  color: #481B0B;
  border: 1px solid #A68A64;
  border-radius: 100%;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  margin-left: 8px;
}

/* ✅ 도움말 말풍선 스타일 */
.loan-guide {
  position: absolute;
  top: 27%;
  left: 80%;
  transform: translateX(-50%);
  background: #F9F8F2;
  padding: 5px 10px;
  border: 1px solid #A68A64;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
}

/* "중간 운영 대출" 제목 조정 */
.loan-apply h2 {
  font-size: 24px;
  font-weight: bold;
  margin-top: -50px; /* 기존보다 위쪽으로 이동 */
  text-align: left;
}



/* ✅ 대출 입력 필드 및 단위 정렬 */
.loan-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ✅ 대출 입력 필드 스타일 */
.loan-input {
  width: 150px;
  padding: 8px;
  border: 1px solid #A68A64;
  border-radius: 5px;
  text-align: right;
  font-size: 18px;
}

/* ✅ 대출 안내 문구 */
.loan-guide {
  font-size: 14px;
  color: #481B0B;
  background: #F9F8F2;
  border: 1px solid #A68A64;
  border-radius: 8px;
  padding: 5px 10px;
  display: inline-block;
  margin-top: 5px;
}


.loan-button-container {
  display: flex;
  justify-content: flex-end; /* ✅ 버튼을 오른쪽으로 정렬 */
  margin-top: 20px; /* 버튼과 위 요소 간격 조정 */
}


</style>
