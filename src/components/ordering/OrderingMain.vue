<template>
    <div class="game-container">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="day-counter">
        <div class="day-label">D-30</div>
      </div>
      <div class="money-display">
        <div class="money-icon">원</div>
        <div class="money-amount">500,000</div>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 왼쪽 농장 아이콘 -->
      <div class="left-icon">
        <img src="" alt="농장 아이콘" />
      </div>

      <!-- 메인 테이블 영역 -->
      <div class="main-table-area">
        <div class="table-header">
          <span>밭주</span>
        </div>

        <table class="crop-table">
          <thead>
            <tr>
              <th>본명</th>
              <th>식물명</th>
              <th>수량</th>
              <th>판주 가격</th>
              <th>보유 수량</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="crop-name">
                <span>산삼 씨앗</span>
              </td>
              <td class="plant-cell">
                <img src="" alt="산삼" class="crop-icon" />
              </td>
              <td class="quantity-cell">
                <button class="decrease-btn">-</button>
                <span class="quantity-value">1</span>
                <button class="increase-btn">+</button>
              </td>
              <td class="price-cell">
                <span>2,000원</span>
              </td>
              <td class="owned-cell">0</td>
            </tr>
            <tr>
              <td class="crop-name">
                <span>루바 씨앗</span>
              </td>
              <td class="plant-cell">
                <img src="" alt="루바" class="crop-icon" />
              </td>
              <td class="quantity-cell">
                <button class="decrease-btn">-</button>
                <span class="quantity-value">0</span>
                <button class="increase-btn">+</button>
              </td>
              <td class="price-cell">3,000원</td>
              <td class="owned-cell">0</td>
            </tr>
            <tr>
              <td class="crop-name">
                <span>수박 씨앗</span>
              </td>
              <td class="plant-cell">
                <img src="" alt="수박" class="crop-icon" />
              </td>
              <td class="quantity-cell">
                <button class="decrease-btn">-</button>
                <span class="quantity-value">0</span>
                <button class="increase-btn">+</button>
              </td>
              <td class="price-cell">3,500원</td>
              <td class="owned-cell">0</td>
            </tr>
            <tr>
              <td class="crop-name empty-cell"></td>
              <td class="plant-cell">
                <img src="" alt="파인애플" class="crop-icon" />
              </td>
              <td class="quantity-cell">
                <button class="decrease-btn">-</button>
                <span class="quantity-value">0</span>
                <button class="increase-btn">+</button>
              </td>
              <td class="price-cell">4,000원</td>
              <td class="owned-cell">0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 오른쪽 장바구니 영역 -->
      <div class="cart-area">
        <div class="cart-header">
          <span>장바구니</span>
        </div>
        <div class="cart-content">
          <div class="cart-item">총 1개</div>
          <div class="cart-total">총 2,000원</div>
        </div>
        <button class="purchase-button">
          <span>밭사기</span>
        </button>
      </div>
    </div>

    <!-- 하단 푸터 -->
    <div class="footer">
      <span>밭주 3개: 0/50</span>
    </div>
  </div>
</template>
<script>
export default {
    name:'OrderingVue',
    data() {
    return {
      day: 30,
      money: 500000,
      crops: [
        { id: 1, name: '산삼 씨앗', icon: '🌱', quantity: 1, price: 2000, owned: 0 },
        { id: 2, name: '루바 씨앗', icon: '🍎', quantity: 0, price: 3000, owned: 0 },
        { id: 3, name: '수박 씨앗', icon: '🍉', quantity: 0, price: 3500, owned: 0 },
        { id: 4, name: '', icon: '🍍', quantity: 0, price: 4000, owned: 0 }
      ],
      cartItems: 1,
      cartTotal: 2000
    }
  },
  methods: {
    increaseQuantity(crop) {
      crop.quantity++;
      this.updateCart();
    },
    decreaseQuantity(crop) {
      if (crop.quantity > 0) {
        crop.quantity--;
        this.updateCart();
      }
    },
    updateCart() {
      this.cartItems = this.crops.reduce((sum, crop) => sum + crop.quantity, 0);
      this.cartTotal = this.crops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0);
    }
  }
}
</script>
<style>
    .game-container {
  width: 700px;
  border: 3px solid #c0a080;
  border-radius: 15px;
  background-color: #fff8e1;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: 'Arial', sans-serif;
}

/* 헤더 스타일 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 10px;
}

.day-counter {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  padding: 5px 15px;
  position: relative;
  border: 1px solid #ddd;
}

.day-label {
  font-weight: bold;
  margin-right: 10px;
}

.notification-icon {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  right: -8px;
}

.money-display {
  display: flex;
  align-items: center;
  background-color: #5a3921;
  color: white;
  border-radius: 15px;
  padding: 5px 15px;
}

.money-icon {
  margin-right: 5px;
  font-weight: bold;
}

/* 메인 콘텐츠 스타일 */
.main-content {
  display: flex;
  margin-bottom: 10px;
}

.left-icon {
  width: 50px;
  position: relative;
  margin-right: 10px;
}

.icon-circle {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  left: -8px;
}

/* 테이블 영역 스타일 */
.main-table-area {
  flex: 1;
  margin-right: 10px;
}

.table-header {
  position: relative;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.header-circle {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  left: -8px;
}

.crop-table {
  width: 100%;
  border-collapse: collapse;
}

.crop-table th, .crop-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: white;
}

.crop-table th {
  background-color: #f0f0f0;
  font-weight: normal;
}

.crop-name {
  position: relative;
  text-align: left;
  background-color: #fff8e1 !important;
}

.crop-circle {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  display: inline-block;
  margin-right: 5px;
}

.quantity-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.decrease-btn, .increase-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-value {
  margin: 0 5px;
}

.price-cell {
  position: relative;
}

.price-circle {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  left: -8px;
}

.empty-cell {
  background-color: #fff8e1 !important;
}

/* 장바구니 영역 스타일 */
.cart-area {
  width: 150px;
  display: flex;
  flex-direction: column;
}

.cart-header {
  position: relative;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.cart-circle {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  left: -8px;
}

.cart-content {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  flex: 1;
  border-radius: 5px;
  margin-bottom: 10px;
  min-height: 100px;
}

.cart-total {
  margin-top: 60px;
  text-align: right;
}

.purchase-button {
  position: relative;
  background-color: #f8d56f;
  border: 1px solid #ddd;
  border-radius: 25px;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: bold;
  color: #5a3921;
}

.button-circle {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  left: -8px;
}

/* 푸터 스타일 */
.footer {
  position: relative;
  text-align: center;
}

.footer-circle {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  left: 45%;
}

/* 반응형 스타일 */
@media (max-width: 700px) {
  .game-container {
    width: 100%;
  }
  
  .main-content {
    flex-direction: column;
  }
  
  .cart-area {
    width: 100%;
    margin-top: 20px;
  }
}
</style>