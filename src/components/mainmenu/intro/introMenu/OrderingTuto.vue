<template>
    <div class="order-container">
        <div class="header">
        <div class="left-section">D-30</div>
        <div class="right-section">
          <div class="money-bag">
            <span class="bag-icon">💰</span>
            <span class="amount">500,00원</span>
            <span class="settings-icon">⚙️</span>
          </div>
        </div>
      </div>
  
      <div class="content">
        <div class="back-button">
          <span>◀</span>
        </div>
        
        <div class="order-section">
          <div class="section-title">발주</div>
          
          <div class="product-table">
            <div class="table-header">
              <div class="header-cell">분류</div>
              <div class="header-cell">상품명</div>
              <div class="header-cell">수량</div>
              <div class="header-cell">발주 가격</div>
              <div class="header-cell">보유 수량</div>
            </div>
            
            <div class="product-row" v-for="product in products" :key="product.id">
              <div class="category-cell" :class="{ 'fresh': product.category === '신선 식품' }">
                {{ product.category }}
              </div>
              <div class="product-cell">
                <img :src="product.image" :alt="product.name" class="product-image" />
                <div class="product-name">{{ product.name }}</div>
              </div>
              <div class="quantity-cell">
                <button class="decrease-btn">−</button>
                <span class="quantity">{{ product.quantity }}</span>
                <button class="increase-btn">+</button>
              </div>
              <div class="price-cell">{{ product.price }}원</div>
              <div class="stock-cell">{{ product.stock }}</div>
            </div>
          </div>
          
          <div class="storage-info">
            총 창고 개수: 0/50
          </div>
        </div>
        
        <div class="cart-section">
          <div class="section-title">장바구니</div>
          
          <div class="cart-item" v-for="(item, index) in cart" :key="index">
            <div class="item-name">{{ item.name }} {{ item.quantity }}개</div>
            <div class="item-price">{{ item.price }}원</div>
          </div>
          
          <button class="order-button">발주하기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StoreOrderInterface',
    data() {
      return {
        money: 500000,
        products: [
          {
            id: 1,
            category: '신선 식품',
            name: '딸기',
            image: '@/assets/tutorial/fruit/strawberry.png',
            quantity: 1,
            price: 2000,
            stock: 0
          },
          {
            id: 2,
            category: '즉석 식품',
            name: '사과',
            image: '@/assets/tutorial/fruit/strawberry.png',
            quantity: 0,
            price: 3000,
            stock: 0
          },
          {
            id: 3,
            category: '전자 제품',
            name: '양상추',
            image: '@/assets/tutorial/fruit/fineapple.png',
            quantity: 0,
            price: 3500,
            stock: 0
          }
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
    methods: {
      increaseQuantity(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
          product.quantity++;
          this.updateCart(product);
        }
      },
      decreaseQuantity(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product && product.quantity > 0) {
          product.quantity--;
          this.updateCart(product);
        }
      },
      updateCart(product) {
        const cartItem = this.cart.find(item => item.name === product.name);
        if (product.quantity > 0) {
          if (cartItem) {
            cartItem.quantity = product.quantity;
          } else {
            this.cart.push({
              name: product.name,
              quantity: product.quantity,
              price: product.price * product.quantity
            });
          }
        } else if (cartItem) {
          const index = this.cart.indexOf(cartItem);
          this.cart.splice(index, 1);
        }
      },
      submitOrder() {
        // Order submission logic
      }
    }
  }
  </script>
  
  <style scoped>
  .order-container {
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
  
  
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 100px;
    margin-top:50px;
    border: 2px solid #8B4513;
    border-radius: 24px;
    min-width: 90vw;
    
  }

  .money-display {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #5d4037;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
  }
  
  .content {
    display: flex;
    position: relative;
  }
  
  .back-button {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #6a3e14;
    font-size: 24px;
    cursor: pointer;
  }
  
  .order-section {
    flex: 3;
    padding: 0 40px;
    min-width:60vw;
    min-height: 50vh;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .product-table {
    background-color: #fff8e1;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #6a3e14;
  }
  
  .table-header {
    display: flex;
    background-color: #f0e4ca;
    padding: 10px 0;
  }
  
  .header-cell {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
  
  .product-row {
    display: flex;
    border-top: 1px solid #e0d6be;
    padding: 10px 0;
  }
  
  .category-cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .fresh {
    background-color: #5d4037;
    color: white;
  }
  
  .product-cell {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  
  .product-image {
    width: 40px;
    height: 40px;
  }
  
  .quantity-cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  .decrease-btn, .increase-btn {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #aaa;
    background-color: white;
    cursor: pointer;
  }
  
  .price-cell, .stock-cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .storage-info {
    text-align: right;
    padding: 10px;
    font-size: 14px;
  }
  
  .cart-section {
    flex: 1;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    min-width: 20vw;
  }
  
  .cart-item {
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .order-button {
    margin-top: auto;
    background-color: #f0e4ca;
    border: none;
    border-radius: 10px;
    padding: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .order-button:hover {
    background-color: #e6d9bd;
  }
  </style>