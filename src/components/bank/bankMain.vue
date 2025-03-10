<template>  
  <div class="bank-container">
    <!-- ✅ 달력 (항상 보이게 유지) -->
    <div class="calandar">


       <!-- ✅ 매출 정산 화면 (D-30) 매출 정산 클릭시!! -->
    <div class="sales-settlement" v-if="activeTab === 'salesSettlement'">
        <div class="calendar">
          <div
            v-for="(day, index) in 30"
            :key="index"
            class="day-button"
            :class="{ completed: completedDays.includes(index + 1) }"
            @click="openDaySummary(index + 1)"
          >
            DAY {{ index + 1 }}
          </div>
        </div>
      </div>

           <!-- ✅ 매출 정산 상세 화면 (DAY 버튼 클릭 시) -->
      <div class="day-summary-container" v-if="activeTab === 'daySummary'">
        <div class="day-summary">
          <div class="summary-header">
            <div class="ribbon-container">
              <img src = "@/resources/Ribbon.png" alt="Ribbon" class=""ribbon-image>
              <span class = "ribbon-text">{{ selectedDay }}일차 매출 정산</span>
              </img>
              </div>
              </div>

              <!-- 수입 섹션 -->
      <div class="summary-box income-box">
        <h3>수입</h3>
       
        <div class="income-details">
        <span>판매 수익</span>
        <span class="income-amount">{{ income.toLocaleString() }}원</span>
        </div>

        <div class="income-sub">
        <p>*퀴즈 혜택</p>
        <p>*FEVER DAY</p>
        </div>

        <div class="income-details">
        <span>폐기 수익 (20% 상품 판매 수익)</span>
        <span class="income-amount">{{ (income * 0.2).toLocaleString() }}원</span>
        </div>
      </div>

    <!-- 지출 섹션 -->
  <div class="summary-box expense-box">
    <div class="summary-header">
      <h3>지출</h3>
      <span class="summary-expense-amount">{{ expense.toLocaleString() }}원</span>
    </div>
    <div class="summary-content">
      <p>발주 비용</p>
      <span>-{{ expense.toLocaleString() }}원</span>
    </div>
    <div class="summary-content">
      <p>운영비</p>
      <span>-20,000원</span>
    </div>
  </div>


      <!-- ✅ 절취선 추가 -->
<div class="dashed-line"></div>

      <!-- 총계 및 내 잔고 -->
    <div class="summary-bottom">
      <div class="summary-total">
        <h3>총계</h3>
        <p class="total-amount">{{ total.toLocaleString() }}원</p>
      </div>

      <div class="balance-container">
        <button class="balance-btn">내 잔고</button>
        <p class="balance-amount">{{ balance.toLocaleString() }}원</p>
      </div>
    </div>



       
    <!-- ✅ 나가기 버튼 -->
    <button class="exit-btn" @click="closeDaySummary"></button>
  </div>
</div>




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
          min="100"  
          step="100" 
          @input="validateLoanAmount"
        />
        <!-- @input="validateInput" -->
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

      // ✅ 매출 정산 관련 데이터
      selectedDay: null, // ✅ 선택한 날짜 (DAY 버튼 클릭 시 저장)
      income: 0, // ✅ 선택한 날짜의 수입
      expense: 0,  // ✅ 선택한 날짜의 지출
      total: 0, // ✅ 선택한 날짜의 총 매출 (income - expense)
      completedDays: [1,2,3,4], // ✅ 완료된 날짜 (예제: DAY1만 활성화)
      balance:0,
      // 물음표 호버 기능!!
      showHelp:false,

      
    };
  },
  computed: {
    formattedLimit() {
      return this.loanLimit.toLocaleString() + " 원";
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

    validateLoanAmount() {
    let amount = Number(this.loanAmount);

    // 100원 단위가 아니면 자동 보정
    if (amount % 100 !== 0) {
      this.loanAmount = Math.round(amount / 100) * 100;
    }

    // 최소 100원 미만일 경우 100원으로 설정
    if (this.loanAmount < 100) {
      this.loanAmount = 100;
    }

    // 최대 대출 한도 초과 방지
    if (this.loanAmount > this.loanLimit) {
      this.loanAmount = this.loanLimit;
    }

    this.errorMessage = ""; // 에러 메시지 초기화
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
    },

    openDaySummary(day) {
      if (this.completedDays.includes(day)) {
        this.selectedDay = day;
        this.income = 100000 + (day * 10000);
        this.expense = 20000 + (day * 5000);
        this.total = this.income - this.expense;
        this.activeTab = "daySummary";
      } else {
        alert("아직 완료되지 않은 날짜입니다!"); // ✅ 클릭 불가 알림
      }

    },
    closeDaySummary() {
      this.selectedDay = null;
      this.activeTab = "salesSettlement";
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

.loan-value {
  margin-right: 40px; /* 🔥 값을 조정해서 왼쪽으로 이동 */
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



/* 매출정산 화면 ======================= */

.calendar {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* ✅ 6개씩 가로 배치 */
  column-gap: 32px;
  row-gap: 10px;
  margin-top: 20px;
}

.day-button {
  background: #D8D6D6;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  width: 55px; /* ✅ 버튼 크기 조정 */
  height: 48px; /* ✅ 버튼 높이 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
  font-size: 15px; /* ✅ 글자 크기 */
  color: black; /* ✅ 글자 색상 */
  
}

/* ✅ 완료된 날짜 스타일 */
.day-button.completed {
  background: #EBE5DD;
  color: black;
}


/* 피그마 색깔 */
.day-button:hover {
  background: #56174F; /* ✅ 피그마 색깔 */
  color: #ffffff;
}

.day-button:active {
  background: #b9b8b8; /* ✅ 피그마 색깔 */
}








/* 매출 정산 상세 화면 스타일 ========= !! ======== */






.day-summary-container {
  position: fixed; /* 화면에 고정 */
  top: -0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6); /* 반투명 배경 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* 가장 위에 오도록 설정 */
}



.day-summary {
  width: 690px; /* ✅ 너비를 고정 (너무 넓지 않도록) */
  max-width: 90%; /* ✅ 화면이 작을 때는 최대 90%까지만 차지 */
  max-height: 600vh; /* ✅ 화면에 맞게 자동 조정 */
  /* height: auto; 높이는 자동 조정 */
  background: #F9F8F2;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  overflow: auto;
  display: flex;
  flex-direction: column; /* ✅ 내부 요소를 세로 정렬 */
  align-items: center; /* ✅ 가로 가운데 정렬 */
  margin-top: -70px; /* 창 전체를 위로 30px 이동 */
}


/* ✅ 헤더 디자인 */
/* .summary-header {
  display: flex;
  flex-direction: column;
  align-items: center;
} */



/* ✅ 개별 정보 박스 */
.summary-box {
  background: #EBE5DD;
  padding: 1spx;
  border-radius: 10px;
  line-height: 0.8; /* 기본값은 1.5 정도일 수 있음 */
  margin-bottom: 20px;
  width: 90%; /* ✅ 요소 너비 통일 */
  text-align: left; /* ✅ 내부 텍스트 왼쪽 정렬 */
  display: flex;
  flex-direction: column;
  gap: 5px; /* ✅ 요소 간격 조정 */
}


.summary-box h3 {
  font-size: 18px;
  font-weight: bold;
}




/* ✅ 수입 / 지출 스타일 */
.summary-income {
  color: #007bff;
  font-weight: bold;
  margin-bottom: 5px; /* ✅ 제목과 내용 간격 */
}

.summary-expense {
  color: #D9534F;
  font-weight: bold;
}


/* ✅ 나가기 버튼 */
.exit-btn {
  background: url("@/resources/Getout.png") no-repeat center;
  background-size: contain;
  display: block;
  width: 250px; /* ✅ 크기 조정 */
  height: 90px; /* ✅ 크기 조정 */
  border: none;
  cursor: pointer;
  position: absolute;
  bottom:-5px; /* ✅ 아래쪽 정렬 */
  left: 50%;
  transform: translateX(-50%);
}


.ribbon-container {
  position: relative;
  display: inline-block;
  width: 300px; /* 리본 크기 조절 */
  transform: scale(0.7); /* 🔥 80% 크기로 줄이기 */
  margin-top: -25px; /* 🔥 위쪽 여백을 줄임 (값을 더 줄이면 더 올라감) */
}

.ribbon-image {
  width: 80%; /* 리본 이미지를 컨테이너에 맞춤 */
  display: block;
}

.ribbon-text {
  position: absolute;
  top: 45%;
  left: 57%;
  transform: translate(-50%, -50%); /* 가운데 정렬 */
  color: white;
  font-size: 30px;
  font-weight: bold;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.dashed-line {
  border-top: 2px dashed #8B6F47; /* ✅ 절취선 스타일 */
  width: 90%; /* ✅ 총계와 정렬 */
  margin: 10px auto; /* ✅ 위, 아래 간격 조정 */
  margin-bottom: -15px; /* ✅ 절취선 아래쪽 여백 줄이기 */
}

/* 수익 박스 스타일 */
.income-box {
  background: #EBE5DD;
  padding: 15px;
  border-radius: 10px;
  width: 90%;
  text-align: left;
}

/* "수입" 제목 스타일 */
.income-box h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10x;
}

/* 개별 라인 (판매 수익 / 폐기 수익) */
.income-details {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: lighter;
  margin-bottom: 5px; /* 행 간격 조절 */
}

/* 금액 정렬 */
.income-amount {
  color: #016Eff;  /* 파란색 */
  font-weight: bold;
}

/* 퀴즈 혜택 및 FEVER DAY */
.income-sub {
  font-size: 16px;
  color: #666;
  margin-left: 10px;
}

/* ✅ 지출 박스 스타일 */
.expense-box {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #F2EAE2;
  border-radius: 10px;
  width: 90%;
  text-align: left;
}

/* ✅ 지출 헤더 (제목과 총 지출 금액) */
.expense-box .summary-header {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  width: 100%;
}

/* ✅ 지출 총액 빨간색 강조 */
.summary-expense-amount {
  color: red;
  font-size: 18px;
  font-weight: bold;
}

/* ✅ 개별 지출 항목 정렬 */
.summary-content {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: -15px;
}


/* 🔹 총계와 내 잔고를 한 줄로 배치 */
.summary-bottom {
  display: flex;
  flex-direction: column; /* 🔥 세로 정렬 (총계와 내 잔고 버튼을 분리) */
  align-items: center; /* 가운데 정렬 */
  gap: 10px; /* 🔥 요소 간 간격 추가 */
  padding: 5px 10px;
  font-size: 22px;
  font-weight: bold;
  color: black;
  margin-top: 0px;
  gap: 0px;
}

/* 🔹 총계 스타일 */
.summary-total {
  display: flex;
  align-items: center;
  gap:400px; /* 총계와 금액 사이 간격 조정 */
}

.summary-total h3 {
  font-size: 20px;
  margin-right: 10px;
}

.total-amount {
  font-size: 22px;
  font-weight: bold;
  color: #000;
}


/* 🔹 내 잔고 컨테이너 - 길고 같은 색의 버튼으로 변경 */
.balance-container {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  background: #4C1D0D; /* 버튼과 같은 색 */
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 10px;
  width: 550px; /* 박스 길이 늘리기 */
  height: 30px;
  margin-top: -2px; /* 위쪽 여백 추가 */
}

/* 🔹 내 잔고 버튼을 박스 내부에 포함 */
.balance-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  text-align: left; /* 텍스트도 왼쪽 정렬 */
}

/* 🔹 내 잔고 금액 스타일 */
.balance-amount {
  font-size: 20px;
  font-weight: bold;
  color: white;
}



</style>