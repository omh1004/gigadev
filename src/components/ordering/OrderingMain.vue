<template>
  <div class="app-container">
    <div class="header">
      <div class="d-30">D-30</div>
      <div class="money-display">
        <span class="money-icon">💰</span>
        <span class="money-amount">{{ money.toLocaleString() }}원</span>
      </div>
      <div class="settings-icon">⚙️</div>
    </div>

    <div class="main-content">
      <div class="back-button">
        <img src="@/assets/common/Vector.png" alt="back" />
      </div>

      <div class="title-section">
        <h2 class="delivery-title">발주</h2>
      </div>

      <div class="product-section">
        <div class="product-table">
          <div class="table-header">
            <div class="category-header">분류</div>
            <div class="name-header">상품명</div>
            <div class="quantity-header">수량</div>
            <div class="price-header">발주 가격</div>
            <div class="stock-header">보유 수량</div>
          </div>

          <div class="categories-menu">
            <div 
              class="category-item" 
              :class="{ active: selectedCategory === '신선 식품' }"
              @click="selectedCategory = '신선 식품'"
            >
              <div class="category-name">신선 식품</div>
            </div>
            <div 
              class="category-item" 
              :class="{ active: selectedCategory === '즉석 식품' }"
              @click="selectedCategory = '즉석 식품'"
            >
              <div class="category-name">즉석 식품</div>
            </div>
            <div 
              class="category-item" 
              :class="{ active: selectedCategory === '전자 제품' }"
              @click="selectedCategory = '전자 제품'"
            >
              <div class="category-name">전자 제품</div>
            </div>
          </div>

          <div class="product-items-container">
            <div class="product-items">
              <div v-for="product in filteredProducts" :key="product.id" class="product-row">
                
                <div class="product-image-container">
                  <img class="product-image" :src="product.image" :alt="product.name">
                  <div class="product-name">{{ product.name }}</div>
                </div>
                <div class="quantity-control">
                  <button class="decrease-button" @click="decreaseQuantity(product)">−</button>
                  <span class="quantity-display">{{ product.quantity }}</span>
                  <button class="increase-button" @click="increaseQuantity(product)">+</button>
                </div>
                <div class="price-display">{{ product.price.toLocaleString() }}원</div>
                <div class="stock-display">{{ product.stock }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-section">
          <div class="cart-title">장바구니</div>
          <div v-if="cart.length > 0" class="cart-items">
            <div v-for="(item, index) in cart" :key="index" class="cart-item">
              <div class="cart-item-name">{{ item.name }} {{ item.quantity }}개</div>
            </div>
            <div class="cart-total">
              총 {{ getTotalItems() }}개
              <br>
              총 {{ getTotalPrice().toLocaleString() }}원
            </div>
          </div>
          <button class="order-button" @click="placeOrder">발주하기</button>
        </div>
      </div>

      <div class="footer">
        <div class="total-products">총 상품 개수: {{ getTotalProductCount() }}/50</div>
      </div>
    </div>
    
    <div v-show="popup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <p>알림</p>
        </div>
        <div class="popup-body">
          <p v-for="(item, index) in cart" :key="index">{{ item.name }}+{{ item.quantity }}</p>
          <p v-if="popupMessage">{{ popupMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupMessage: '',
      cartList: [],
      itemPrice: 0,
      popup: false,
      money: 500000,
      selectedCategory: '신선 식품',
      products: [
        {
          id: 1,
          category: '신선 식품',
          name: '딸기',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 1,
          price: 2000,
          stock: 50
        },
        {
          id: 2,
          category: '즉석 식품',
          name: '사과',
          image: '@/assets/tutorial/fruit/apple.png',
          quantity: 0,
          price: 3000,
          stock: 50
        },
        {
          id: 3,
          category: '전자 제품',
          name: '양상추',
          image: '@/assets/tutorial/fruit/fineapple.png',
          quantity: 0,
          price: 3500,
          stock: 50
        },
        {
          id: 4,
          category: '전자 제품',
          name: '파인애플',
          image: '@/assets/tutorial/fruit/pineapple.png',
          quantity: 0,
          price: 4000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
        {
          id: 6,
          category: '즉석 식품',
          name: '사과2',
          image: '@/assets/tutorial/fruit/apple.png',
          quantity: 0,
          price: 3000,
          stock: 50
        },
        {
          id: 7,
          category: '전자 제품',
          name: '양상추2',
          image: '@/assets/tutorial/fruit/fineapple.png',
          quantity: 0,
          price: 3500,
          stock: 50
        },
        {
          id: 8,
          category: '전자 제품',
          name: '파인애플2',
          image: '@/assets/tutorial/fruit/pineapple.png',
          quantity: 0,
          price: 4000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '@/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
          stock: 50
        },
      ],
      cart: [
        {
          name: '딸기',
          quantity: 1,
          price: 2000
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.category === this.selectedCategory);
    }
  },
  methods: {
    increaseQuantity(product) {
      product.quantity++;
      this.updateCart(product);
    },
    decreaseQuantity(product) {
      if (product.quantity > 0) {
        product.quantity--;
        this.updateCart(product);
      }
    },
    updateCart(product) {
      const existingItem = this.cart.find(item => item.name === product.name);
      
      if (product.quantity > 0) {
        if (existingItem) {
          existingItem.quantity = product.quantity;
        } else {
          this.cart.push({
            name: product.name,
            quantity: product.quantity,
            price: product.price
          });
        }
      } else if (existingItem) {
        const index = this.cart.indexOf(existingItem);
        this.cart.splice(index, 1);
      }
    },
    getTotalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    getTotalProductCount() {
      return this.products.reduce((total, product) => total + product.quantity, 0);
    },
    placeOrder() {
      const totalPrice = this.getTotalPrice();
      
      if (totalPrice > this.money) {
        this.popupMessage = '잔액이 부족합니다.';
        this.popup = true;
        return;
      }
      
      if (this.cart.length === 0) {
        this.popupMessage = '주문할 상품을 선택해주세요.';
        this.popup = true;
        return;
      }
      
      this.money -= totalPrice;
      this.popupMessage = '발주완료';
      this.popup = true;
    },
    closePopup() {
      this.popup = false;
      this.popupMessage = '';
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 100%;
  
  margin: 0 auto;
  border: 2px solid #753422;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  overflow: hidden;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0d0b0;
}

.d-30 {
  font-weight: bold;
  font-size: 18px;
}

.money-display {
  background-color: #5e2813;
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.settings-icon {
  font-size: 24px;
}

.main-content {
  padding: 15px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e74c3c;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
}

.back-button img {
  width: 20px;
  height: 20px;
}

.title-section {
  text-align: center;
  margin-bottom: 20px;
}

.delivery-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  display: inline-block;
  position: relative;
}


.product-section {
  display: flex;
  gap: 20px;
}

.product-table {
  flex: 3;
  border: 1px solid #d0bc95;
  border-radius: 5px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #f5e9d0;
  padding: 10px 0;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #d0bc95;
}

.categories-menu {
  display: flex;
  flex-direction: column;
}

.category-item {
  padding: 15px;
  border-bottom: 1px solid #d0bc95;
  cursor: pointer;
}

.category-item.active {
  background-color: #5e2813;
  color: white;
}

.product-items-container {
  border-left: 1px solid #d0bc95;
  max-height: 400px;
  overflow-y: auto;
}

/* Custom scrollbar styles */
.product-items-container::-webkit-scrollbar {
  width: 8px;
}

.product-items-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.product-items-container::-webkit-scrollbar-thumb {
  background: #5d4037;
  border-radius: 4px;
}

.product-items-container::-webkit-scrollbar-thumb:hover {
  background: #4a332c;
}

.product-items {
  display: flex;
  flex-direction: column;
}

.product-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 10px;
  border-bottom: 1px solid #d0bc95;
  align-items: center;
  text-align: center;
}

.product-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.decrease-button, .increase-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.quantity-display {
  width: 30px;
  text-align: center;
}

.cart-section {
  flex: 1;
  border: 1px solid #d0bc95;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.cart-title {
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  margin-bottom: 15px;
}

.cart-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-item {
  margin-bottom: 10px;
}

.cart-total {
  margin-top: auto;
  text-align: right;
  font-weight: bold;
  padding: 10px 0;
}

.order-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}

.total-products {
  display: inline-block;
  border: 1px solid #e74c3c;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  position: relative;
}


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.popup-content {
  background-color: #F2F1EC;
  width: 400px;
  border-radius: 30px;
  overflow: hidden;
}

.popup-header {
  background-color: #6A396C;
  padding: 15px;
  text-align: center;
  color: white;
  font-weight: bold;
}

.popup-header p {
  margin: 0;
}

.popup-body {
  padding: 20px;
  text-align: center;
}
</style>