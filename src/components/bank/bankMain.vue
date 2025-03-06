<template>
    <div class="bank-container">
      <!-- ✅ 달력 (항상 보이게 유지) -->
      <div class="calandar">
        <!-- ✅ 대출 내역 표시 (대출내역 버튼 클릭 시) -->
        <div class="loan-history" v-if="activeTab === 'loanHistory'">
          <div class="loan-header">
            <span class="title">대출 합계 : {{ totalLoan.toLocaleString() }}원</span>
          </div>
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
      loanRecords: [
        { date: "2025.01.20", type: "중간 운영 대출금", amount: 100000 },
        { date: "2025.01.15", type: "중간 운영 대출금", amount: 50000 },
        { date: "2025.01.12", type: "중간 운영 대출금", amount: 20000 },
        { date: "2025.01.10", type: "중간 운영 대출금", amount: 40000 },
        { date: "2025.01.07", type: "중간 운영 대출금", amount: 40000 },
        { date: "2025.01.05", type: "중간 운영 대출금", amount: 200000 },
        { date: "2025.01.01", type: "초기 운영 대출금", amount: 1000000 },
      ],
    };
  },
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

/* ✅ 달력 스타일 */
.calandar {
  position: relative;  /* ✅ 대출 내역과 함께 유지 */
  width: 1025px;
  height: 525px;
  background-image: url("@/resources/calendar.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  /* ✅ 내부 요소를 정렬하여 달력 안에 배치 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* ✅ 내용이 달력 밖으로 나가지 않도록 설정 */

}

/* ✅ 대출 내역 스타일 */
.loan-history {
  position: absolute;  /* ✅ 달력 내부에 고정되도록 수정 */
  width: 65%; /* ✅ 달력 안에서 최대한 넓게 차지 */
  max-height: 75%;  /* ✅ 달력 높이에 맞춤 (스크롤 추가) */
  overflow-y: auto;  /* ✅ 내용이 넘칠 경우 스크롤 추가 */
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 10px;
}


/* 대출 내역 제목 */
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
}

.loan-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
}

.loan-table .amount {
  text-align: right;
  font-weight: bold;
}

/* ✅ 버튼 컨테이너 위치 조정 */
.button-container {
  position: absolute;
  top: 58%;
  left: calc(50% + 360px); /* 버튼이 테이블과 겹치지 않도록 조정 */
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

/* 개별 버튼 크기 */
.loan-history-btn {
  height: 120px;
}

.loan-btn {
  height: 80px;
}

.sales-settlement-btn {
  height: 120px;
}

/* 버튼 hover 효과 */
.tab-button:hover {
  background: #3D261B;
}

/* ✅ 활성화된 버튼 스타일 */
.tab-button.active {
  background: #F9F8F2;
  color: #481B0B;
}

/* ✅ 활성화된 버튼에 절취선 추가 */
.tab-button.active::before {
  content: "";
  position: absolute;
  left: -4px;
  top: 10%;
  height: 80%;
  width: 4px;
  border-left: 2px dashed #D5CCC4;
}
</style>
