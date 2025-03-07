<template>
    <div class="game-container">
    <!-- 상단 헤더 -->
    <div class="header">
        <div class="left-section">D-30</div>
        <div class="right-section">
          <div class="money-bag">
            <span class="bag-icon">💰</span>
            <span class="amount">500,000원</span>
          </div>
          <div class="settings-icon">⚙️</div>
        </div>
      </div>

    <!-- 메인 콘텐츠 -->
    <div class="main-content">


      <!-- 메인 테이블 영역 -->
      <div class="main-table-area">
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
      font-family: RecipekoreaOTF;
  font-size: 20px;
  margin-top: 50px;
  background-color: #f5f5f5;
  
  text-align: center;
  max-width: 100%;
  min-height: 90vh;

  background-image: url('@/assets/common/homeMain.png');
  background-size:cover;

  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
}

/* 헤더 스타일 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 100px;
    border: 3px solid #8B4513;
    border-radius: 9999px;
    min-width: 90vw;
    margin-top: 30px;
    height: 40px;
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
  padding-bottom: 15px;
  padding-right: 15px;
  width:50vw;
  height: 50vh;
  background-image: url(@/assets/storage/ordering.png);
  background-size: cover;
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
  margin-top: 30px;
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