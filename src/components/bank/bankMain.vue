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
        <h2 cla>대출 신청</h2>
        <p>대출 가능 금액: {{ formattedLimit }}</p>
        <input 
          v-model="loanAmount" 
          type="number" 
          placeholder="대출 금액 입력"
          @input="validateInput"
        />
        <button class = "loan-btn1" @click="applyLoan">신청하기기</button>
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
      loanLimit: 5000000, // 대출 가능 한도
      loanAmount: "", // 대출 입력값
      errorMessage: "", // 오류 메시지
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
}

.loan-apply h2 {
  font-size: 24px;
  font-weight: bold;
}

.loan-apply input {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
}

.loan-apply button {
  margin-top: 12px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
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

/* ✅ 기존 대출 내역 스타일 유지 */
.loan-history {
  position: absolute;
  width: 60%;
  max-height: 75%;
  background: #F9F8F2;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
}

.loan-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.loan-table {
  width: 100%;
  border-collapse: collapse;
}

.loan-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
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
}

.loan-apply input {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.loan-apply button {
  margin-top: 12px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

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

/* ✅ 3번 버튼 이미지 적용 */
/* .loan-btn1 {
  background: url("@/resources/loan-btn.png") no-repeat center;
  width: 100%;
  height: 100px;
  border: none;
  cursor: pointer;
} */

</style>
