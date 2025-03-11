<template>
  <div class="app-container">
    <!-- <div class="header">
      <div class="d-30">D-30</div>
      <div class="money-display">
        <span class="money-icon">💰</span>
        <span class="money-amount">{{ money.toLocaleString() }}원</span>
      </div>
      <div class="settings-icon">⚙️</div>
    </div> -->
    <div class="topbar">
      <p class="left-section">D-30</p>
      <div style="display:flex;align-items:center;">
          <div class="moneybar">
              <img src="@/resources/money.png" width="35vw" height="35vw">
              <div class="line"></div>
              <div class="money"><p>{{ money.toLocaleString() }}원</p></div>
          </div>
          <img src="@/resources/gameoption.png" width="30vw" height="30vw" class="settings-icon" @click="opensettings=!opensettings">
      </div>
    </div>

    <div class="main-content">
      <div class="back-button" @click="backToMain">
        <img id="backbtn" src="@/assets/common/Vector.png" alt="back" />
      </div>

      <div class="title-section">
        <h2 class="delivery-title">발주</h2>
      </div>

      <div class="product-section">
        <div style="margin-top:4vh;">
          <div class="product-table">
            <div class="table-header">
              <div class="category-header">분류</div>
              <div class="name-header">상품명</div>
              <div class="quantity-header">수량</div>
              <div class="price-header">발주 가격</div>
              <div class="stock-header">보유 수량</div>
            </div>

            <div style="display:flex;align-items:flex-start;height:55vh;">
              <div style="width:20%;height:55vh;">
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
              </div>
              <div style="width:80%;height:55vh;">
                <div class="product-items-container">
                  <div class="product-items">
                    <div v-if="selectedCategory=='신선 식품' || selectedCategory=='즉석 식품' && days>=5 || selectedCategory=='전자 제품' && days>=15 "
                          v-for="product in filteredProducts" :key="product.id" class="product-row">
                      
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
                      <!-- <div class="stock-display">{{ product.stock }}</div> -->
                      <!-- 창고 더미데이터 추가, 창고 데이터에서 가져오는 것으로 수정중 -->
                      <div class="stock-display">{{ getStock(product.id) }}</div>
                    </div>
                    <div v-else-if="selectedCategory=='즉석 식품'" class="comingsoon">
                      <h1>5일차 오픈 예정</h1>
                    </div>
                    <div v-else-if="selectedCategory=='전자 제품'" class="comingsoon">
                      <h1>15일차 오픈 예정</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="total-products-fake">총 상품 개수: {{ getTotalProductCount() }}/50</div>
        </div>
        <div style="text-align:center;">
          <div class="cart-section">
            <div class="cart-title">장바구니</div>
            <div class="cart-items">
              <div v-for="(item, index) in cart" :key="index" class="cart-item">
                <div class="cart-item-name">{{ item.name }} {{ item.quantity }}개</div>
              </div>
            </div>
            <div class="cart-total">
              총 {{ getTotalItems() }}개
              <br>
              총 {{ getTotalPrice().toLocaleString() }}원
              </div>
          </div>
          <button class="order-button" @click="placeOrder"></button>
        </div>
      </div>

      <div class="footer">
        <!-- <div class="total-products">총 상품 개수: {{ getTotalProductCount() }}/50</div> -->
      </div>
    </div>
    
    <div v-show="popup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <p>알림</p>
        </div>
        <div class="popup-body">
          <p v-if="!storage" v-for="(item, index) in cart" :key="index">{{ item.name }}+{{ item.quantity }}</p>
          <p v-if="popupMessage">{{ popupMessage }}</p>
          <button v-if="storage" class="storagebutton" @click="gotostorage">확장하러 가기</button>
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
      storageCount:0,
      storage:false,
      days:5,
      products: [
        {
          id: 1,
          category: '신선 식품',
          name: '딸기',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 1,
          price: 2000,
        },
        {
          id: 2,
          category: '즉석 식품',
          name: '사과',
          image: '/src/assets/tutorial/fruit/apple.png',
          quantity: 0,
          price: 3000,
        },
        {
          id: 3,
          category: '전자 제품',
          name: '양상추',
          image: '/src/assets/tutorial/fruit/fineapple.png',
          quantity: 0,
          price: 3500,
        },
        {
          id: 4,
          category: '전자 제품',
          name: '파인애플',
          image: '/src/assets/tutorial/fruit/pineapple.png',
          quantity: 0,
          price: 4000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
        {
          id: 6,
          category: '즉석 식품',
          name: '사과2',
          image: '/src/assets/tutorial/fruit/apple.png',
          quantity: 0,
          price: 3000,
        },
        {
          id: 7,
          category: '전자 제품',
          name: '양상추2',
          image: '/src/assets/tutorial/fruit/fineapple.png',
          quantity: 0,
          price: 3500,
        },
        {
          id: 8,
          category: '전자 제품',
          name: '파인애플2',
          image: '/src/assets/tutorial/fruit/pineapple.png',
          quantity: 0,
          price: 4000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
        {
          id: 5,
          category: '신선 식품',
          name: '딸기2',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 0,
          price: 2000,
        },
      ],
      cart: [
        {
          id: 1,
          category: '신선 식품',
          name: '딸기',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          quantity: 1,
          price: 2000,
        }
      ],
      storageProduct:[
        {
          id: 1,
          category: '신선 식품',
          name: '딸기',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          // 창고 DB에 있는 데이터. category, name, image column 추가하기?
          ExpDate:2,  // 유통기한
          quantity: 10,   // 발주수량, orderQuantity
          price: 2000,   // 판매가, salesPrice
          saledgree:4,  // 발주일자
          disposeYn:false,  // 폐기여부
        },
        {
          id: 1,
          category: '신선 식품',
          name: '딸기',
          image: '/src/assets/tutorial/fruit/strawberry.png',
          // 창고 DB에 있는 데이터. category, name, image column 추가하기?
          ExpDate:1,  // 유통기한
          quantity: 5,   // 발주수량
          salesPrice: 1000,   // 판매가
          saledgree:3,  // 발주일자
          disposeYn:false,  // 폐기여부
        },
        {
          id: 6,
          category: '즉석 식품',
          name: '사과2',
          image: '/src/assets/tutorial/fruit/apple.png',
          // 창고 DB에 있는 데이터. category, name, image column 추가하기?
          ExpDate:4,  // 유통기한
          quantity: 5,   // 발주수량
          salesPrice: 1000,   // 판매가
          saledgree:5,  // 발주일자
          disposeYn:false,  // 폐기여부
        },
      ],
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
          // this.cart.push({
          //   name: product.name,
          //   quantity: product.quantity,
          //   price: product.price
          // });
          this.cart.push({...product});
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
    // getTotalProductCount() {
    //   return this.products.reduce((total, product) => total + product.quantity, 0);
    // },
    getTotalProductCount(){
      return this.storageProduct.reduce((total, product) => total + product.quantity, 0);
    },
    placeOrder() {
      const totalPrice = this.getTotalPrice();
      const productamount = this.storageProduct.reduce((amount, product) => amount + product.quantity, 0);
      
      // 창고 안 상품 개수 데이터(변수)가 필요
      // 임시로 여기에 storageCount 변수를 추가
      let cartquan = 0;
      this.cart.forEach(c=>{
        cartquan += c.quantity;
      })

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

      if( productamount+cartquan>50 ){
        this.popupMessage = '창고가 가득 찼습니다 창고를 정리하거나 확장해주세요';
        this.storage = true;
        this.popup = true;
        return;
      }
      
      this.cart.forEach(c=>{
        const existProduct = this.storageProduct.find(p=>{
          if(c.category=='신선 식품'){
            if(p.id==c.id && p.ExpDate==3){
              return p;
            }
          }else if(c.category=='즉석 식품'){
            if(p.id==c.id && p.ExpDate==4){
              return p;
            }
          }else if(c.category=='전자 제품'){
            if(p.id==c.id){
              return p;
            }
          }
        });

        if(existProduct!=null){
          existProduct.quantity += c.quantity;
        }else{
          let expdate = 0;
          if(c.category=='신선 식품') expdate = 3;
          else if(c.category=='즉석 식품') expdate = 4;
          else if(c.category=='전자 제품') expdate = 999;
          else expdate = 0;
          this.storageProduct.push({...c,ExpDate:expdate,saledgree:this.days,disposeYn:false,});
        }
      });

      this.money -= totalPrice;
      this.popupMessage = '발주완료';
      this.popup = true;
    },
    closePopup() {
      this.popup = false;
      this.storage = false;
      this.popupMessage = '';
    },

    gotostorage(){
      this.$router.push({
        name:"storageMain",
        state:{
          popup:true,
        }
      });
    },
    backToMain(){
      this.$router.push("/mainMenu");
      // this.$router.back();
    },
    getStock(id){
      let stock = 0;
      this.storageProduct.filter(p=>p.id==id).forEach(p=>stock+=p.quantity);
      return stock;
    }
  },
}

</script>

<style scoped>
.app-container {
  width: 100vw;
  height:100vh;
  margin: 0 auto;
  /* border: 2px solid #753422; */
  /* border-radius: 15px; */
  /* background-color: #ffffff; */
  background-image:url('@/resources/whiteimg.png');
  background-size:100% 100%;
  font-family: Arial, sans-serif;
  overflow: hidden;
  position: relative;
}
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6vw 1.7vw;
    margin-bottom: 1vh;
    border: 0.25vw solid #8B4513;
    border-radius: 9999px;
    width: 90vw;
    margin-top: 4vh;
    margin-left: 3vw;
    height: 5vh;
  }
  .left-section {
    font-size: 1.5vw;
    font-weight: bold;
    text-align: left;
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

.main-content {
  padding: 15px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 4vh;
  left: 4vw;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
}

.back-button img {
  width: 40px;
  height: 40px;
}

.title-section {
  text-align: center;
  margin: 1.5vh 0;
}

.delivery-title {
  font-size: 2vw;
  font-weight: bold;
  margin: 0;
  display: inline-block;
  position: relative;
}


.product-section {
  display: flex;
  justify-content:space-around;
  align-items:center;
  gap: 20px;
}

.product-table {
  /* flex: 3; */
  width:54vw;
  height:61vh;
  border: 7px solid #5e2813;
  border-top-left-radius: 52px;
  border-radius: 52px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #f5e9d0;
  text-align: center;
  font-weight: bold;
  border-bottom: 7px solid #5e2813;
  height:6vh;
}
.table-header div{
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:1.2vw;
  min-height:6vh;
  border-right:7px solid #5e2813;
}
.table-header>.stock-header{
  border-right:0;
}

.categories-menu {
  display: flex;
  flex-direction: column;
  height:55vh;
  border-right:7px solid #5e2813;
}

.comingsoon{
  width:100%;
  height:48vh;
  display:flex;
  justify-content:center;
  align-items:center;
}

.comingsoon>h1{
  font-size:4vh;
}

.category-item {
  display:flex;
  justify-content:center;
  align-items:center;
  padding: 1vh;
  border-bottom:7px solid #5e2813;
  cursor: pointer;
  height:11vh;
}

.category-item.active {
  background-color: #5e2813;
  color: white;
}

.product-items-container {
  border-left: 1px solid #d0bc95;
  /* max-height: 400px; */
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
  overflow:auto;
  max-height:55vh;
  scrollbar-width:none;
}

.product-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-bottom:7px solid #5e2813;
  align-items: center;
  text-align: center;
  height:13vh;
}

.product-row>div{
  height:13vh;
  border-right:7px solid #5e2813;
}

.product-row>.stock-display{
  display:flex;
  justify-content:center;
  align-items:center;
  border-right:0;
}

.product-row>.price-display{
  display:flex;
  justify-content:center;
  align-items:center;
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
  /* flex: 1; */
  width:15vw;
  height:56vh;
  border: 7px solid #5e2813;
  border-radius: 52px;
  padding: 1%;
  display: flex;
  flex-direction: column;
  background-color:rgba(94,40,19,0.3);
}

.cart-title {
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  margin: 15px;
}

.cart-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:flex-start;
  margin-left:0.5vw;
}

.cart-itme-name{
  text-align:left;
}

.cart-item {
  margin-bottom: 10px;
}

.cart-total {
  margin-top: auto;
  text-align: right;
  font-weight: bold;
  padding: 1vh 1vw;
}

.order-button {
  width:9vw;
  height:6.5vh;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  background-image:url('/src/resources/orderbutton.png');
  background-color:rgba(0,0,0,0);
  background-size:100% 100%;
  margin-top:1vh;
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

.total-products-fake{
  text-align:right;
  padding-right:0.5vw;
  padding-top:1vh;
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

.storagebutton{
  width:12.5vw;
  height:5.5vh;
  background-color:rgba(0,0,0,0);
  border:0;
  background-image:url("@/resources/increasestorage.png");
  background-size:100% 100%;
}

.timerbar{
  width:30vw;
  height:40px;
  border:3px solid #6F3533;
  border-radius:30px;
  overflow:hidden;
}
.timeleft{
  width:30vw;
  height:40px;
  background-color:#5E395A;
}
.time{
  position:relative;
  right:70px;
}
.moneybar{
  display:flex;
  justify-content:space-around;
  align-items:center;
  width: 15vw;
  height:7vh;
  margin-right:1.5vw;
  background-image:url(@/resources/moneybar.png);
  background-size: 100% 100%;
}
.line{
  min-height:28px;
  border-left:2px dashed rgba(256,256,256,0.2);
}
.money{
  display:flex;
  justify-content:flex-end;
  width:6vw;
  font-size: 1.3vw;
}
.money p{
  color:#FFFFFF;
}
#backbtn {
  width: 2vw;
  height: 3vh;
  margin-top: 0;
}
</style>