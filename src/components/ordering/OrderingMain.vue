<template>
  <div v-show="popup" id="orderPopup" @click="closePopup">
    <div id="popupbox">
        <p id="almTitle">알림</p>
      <div id="almText">
        <p v-for="item in cart">{{item.name}}+{{ item.quantity }}</p>
        <p>발주완료</p>
      </div>
    </div>
  </div>
  <div class="order-container">
      <div class="header">
      <div class="left-section">D-30</div>
      <div class="right-section">
        <div class="money-bag">
          <span class="bag-icon">💰</span>
          <span class="amount">500,00원</span>
        </div>
        <span class="settings-icon">⚙️</span>
      </div>
    </div>

    <div class="content">
      <div class="back-button">
        <span>◀</span>
      </div>
      
      <div class="order-section">        
        <div class="product-table">
          
          <div class="product-row" v-for="product in products" :key="product.id">

<div class="product-cell">
  <img :src="'product.image'" :alt="product.name" class="product-image" />
  <div class="product-name">{{ product.name }}</div>
</div>
<div class="quantity-cell">
  <button class="decrease-btn" @click="decreaseQuantity(product.id)">−</button>
  <span class="quantity">{{ product.quantity }}</span>
  <button class="increase-btn" @click="increaseQuantity(product.id)">+</button>
</div>
<div class="price-cell">{{ product.quantity*product.price }}원</div>
<div class="stock-cell">{{ product.stock-product.quantity}}</div>
</div>
</div>
      </div>
      <div class="cart-section">
        <div class="section-title">장바구니</div>
        
        <div class="cart-item" v-for="(item, index) in cart" :key="index">
          <div class="item-name">{{ item.name }} {{ item.quantity }}개</div>
          <div class="item-price">{{ item.price }}원</div>
        </div>
        
        <button class="order-button" @click="clickOrder(cart)">발주하기</button>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreOrderInterface',
  data() {
    return {
      cartList:[],
      itemPrice:0,
      popup:false,
      money: 500000,
      products: [
        {
          mount:500000,
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
          image: '@/assets/tutorial/fruit/strawberry.png',
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
          console.log(cartItem);
          cartItem.quantity = product.quantity;
          cartItem.price = (product.price*product.quantity);
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
    clickOrder(cart) {
      console.log(cart);

      cart.forEach(i=>{
        console.log(i.name);
        this.itemPrice+=i.price;
      })


      this.popup=true;

    },
    closePopup(){
      this.popup=false;
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.order-container {
  font-family: RecipekoreaOTF;
font-size: 20px;
background-color: #f5f5f5;

text-align: center;
max-width: 100%;
min-height: 100vh;

background-image: url('@/resources/whiteimg.png');
background-size:cover;

display: flex;
flex-direction: column;
align-items: center; 

}



.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 20px;
  border: 3px solid #8B4513;
  border-radius: 9999px;
  min-width: 90vw;
  margin-top: 30px;
  height: 40px;
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
.money-bag {
  display: flex;
  align-items: center;
  background-color: #5D2906;
  color: white;
  padding: 8px 16px;
  border-radius: 9999px;
  gap:50px;
  height: 27px;
  width: 180px;
}
.money-bag {
font-size: 20px;
}

.bag-icon {
  margin-right: 8px;
}

.settings-icon {
  font-size: 24px;
}
.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: right;
  margin-left: auto;
}
.left-section {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
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
min-width:65vw;
min-height: 68vh;
background-image: url('@/assets/ordering/ordering.png');
background-repeat: no-repeat;
background-size: contain;
margin-top:75px;
margin-left: 200px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}


.product-table {
  margin-top: 60px;
  /* margin-right: 150px; */
  margin-left:150px;
  /* background-color: #fff8e1; */
  border-radius: 10px;
  overflow: hidden;
  /* border: 2px solid #6a3e14; */
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
  /* padding: 10px 0; */
  text-align: center;
  min-height: 120px;
  margin-top: 10px;
  width: 50vw;
  margin-left: 15px;
}

.category-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  min-width:100px;
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
  justify-content: center;
  gap: 5px;
  /* min-width:140px; */
   
   
   width:90px;
   margin-left:30px;
  
  
}

.product-image {
  width:auto;
  heigt:auto;
}

.quantity-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  min-width:15px;
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
  min-width:115px;
  min-height: 100px;
  
}

.storage-info {
  text-align: right;
  padding: 10px;
  font-size: 14px;
}

.cart-section {
  margin-left: 0px;
  margin-top: 80px;
  width: 100px;
  flex: 1;
  background-color: #EAE5DE;
  border:5px solid #603421;
  border-radius: 40px;
  
  display: flex;
  flex-direction: column;
  min-width: 13vw;

}

.cart-item {
  background-color: #EAE5DE;
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

#orderPopup{
  position: absolute;
  width: 40vw;
  height: 20vw;
  top:30%;
  left:30%;
  z-index:1;
  border-radius: 30px;
}

#popupbox {
  width: 100%;
  height: 100%;
  font-family: RecipekoreaOTF;
  background-color: #6A396C;
  z-index: 3;
  padding: 0px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
}
#almTitle {
  font-family: RecipekoreaOTF;
  font-size: 1.5vw;
  font-weight: bold;
  text-align: center;
  height: 0.3vw;
  color: #ffffff;
  margin-top: 1vw;
}
#almText {
  background-color: #ffffff;
  width: 98%;
  height: 98%;
  margin: 1vw auto 0.5vw;
  border-radius: 0 0 25px 25px;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  font-weight: bold;
}
#almText p {
  margin: 0.1vw 0;
}

  .quiz-title {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }





</style>