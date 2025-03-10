<template>
  <div class="main-container">
    <!-- Header -->
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
    
    <!-- Navigation -->
    <div class="navigation">
      <div class="back-button" @click="goBack">
        <img src="@/assets/common/Vector.png" alt="back" />
      </div>
      <div class="title">창고</div>
    </div>
    
    <!-- Tab Menu -->
    <div class="tab-container">
      <div class="tab-menu">
        <div class="tab-item" :class="{ active: selectedTab === '신선식품' }" @click="selectTab('신선식품')">신선식품</div>
        <div class="tab-divider"></div>
        <div class="tab-item" :class="{ active: selectedTab === '즉석식품' }" @click="selectTab('즉석식품')">즉석식품</div>
        <div class="tab-divider"></div>
        <div class="tab-item" :class="{ active: selectedTab === '전자제품' }" @click="selectTab('전자제품')">전자제품</div>
      </div>

      <!-- Inventory Content -->
      <div class="fruit-container" :style="containerStyle">
        <div class="fruit-row" v-for="(row, rowIndex) in filteredFruitRows" :key="rowIndex">
          <div class="fruit-item" v-for="(fruit, fruitIndex) in row" :key="fruitIndex">
            <img :src="fruit.image" :alt="fruit.name" class="fruit-image">
            <div class="fruit-discount" v-if="fruit.discount">{{ fruit.discount }}</div>
            <div class="fruit-quantity">x{{ fruit.quantity }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Confirm Button -->
    <div class="button-container">
      <button class="confirm-button" @click="placeOrder">
        <span class="plus-icon">+</span>
        <span @click="">확장하기</span>
      </button>
    </div>


    <div v-show="popup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <p>알림</p>
        </div>
        <div class="popup-body">
          <p>50 >> 70</p>
          <p>필요금액</p>
          <p>30,000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const model = {
  image: 'src/assets/common/fruit/strawberry.png',
  popup:false,
  fruits: [
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
    { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%', category: '신선식품' },
    { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%', category: '신선식품' },
    { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null, category: '신선식품' },
    { name: '라면', image: 'src/assets/common/food/ramen.png', quantity: 5, discount: '20%', category: '즉석식품' },
    { name: '햄버거', image: 'src/assets/common/food/burger.png', quantity: 2, discount: null, category: '즉석식품' },
    { name: '노트북', image: 'src/assets/common/electronics/laptop.png', quantity: 1, discount: '10%', category: '전자제품' },
    { name: '스마트폰', image: 'src/assets/common/electronics/phone.png', quantity: 1, discount: null, category: '전자제품' },
    // Add more items as needed
  ],
  itemsPerRow: 5,
  maxVisibleRows: 3,
  rowHeight: 150, // Reverted row height to original
  selectedTab: '신선식품'
  ,  popupMessage: ''
};

export default {
  name: 'KoreanInventoryInterface',
  data() {
    return model;
  },
  computed: {
    fruitRows() {
      const rows = [];
      for (let i = 0; i < this.fruits.length; i += this.itemsPerRow) {
        rows.push(this.fruits.slice(i, i + this.itemsPerRow));
      }
      return rows;
    },
    filteredFruitRows() {
      const filteredFruits = this.fruits.filter(fruit => fruit.category === this.selectedTab);
      const rows = [];
      for (let i = 0; i < filteredFruits.length; i += this.itemsPerRow) {
        rows.push(filteredFruits.slice(i, i + this.itemsPerRow));
      }
      return rows;
    },
    containerStyle() {
      if (this.filteredFruitRows.length > this.maxVisibleRows) {
        return {
          height: `${this.maxVisibleRows * this.rowHeight}px`,
          overflowY: 'scroll'
        };
      }
      return {};
    }
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    goBack(){
      this.$router.push('/mainmenu');
    },
    placeOrder() {
      this.popupMessage = '50 >> 70 필요금액 30,000';
      this.popup = true;
    },
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  font-family: RecipekoreaOTF;
  font-size: 24px;
  background-color: #f5f5f5;
  text-align: center;
  max-width: 100%;
  min-height: 90%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/resources/whiteimg.png');
  background-size: 100% 100%;
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
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  z-index: 1000;
}

.left-label {
  font-weight: bold;
  font-size: 18px;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.left-section {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.money-display {
  background-color: #5d2906;
  color: white;
  padding: 6px 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
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

.money-bag {
  display: flex;
  align-items: center;
  background-color: #5D2906;
  color: white;
  padding: 8px 16px;
  border-radius: 9999px;
  gap: 50px;
  height: 27px;
  width: 180px;
}

.navigation {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 12px;
  margin-top: 60px; /* Adjusted to account for fixed header */
}

.back-button {
  color: #5d2906;
  font-size: 24px;
  cursor: pointer;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.skip-button {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #5d2906;
  cursor: pointer;
}

.double-arrow {
  font-size: 16px;
}

.inventory-status-bar {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 16px;
}

.info-text {
  font-size: 14px;
}

.capacity-text {
  font-size: 14px;
  font-weight: bold;
}

.tab-container {
  width: 800px;
  border: 4px solid #6F3533;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #EAE5DE;
}

.tab-menu {
  display: flex;
  background-color: #fff3d4;
  border-bottom: 4px solid #6F3533;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px;
  font-weight: bold;
  cursor: pointer;
}

.tab-item.active {
  background-color: #fff3d4;
  color: #5d2906;
}

.tab-divider {
  width: 1px;
  background-color: #8b4513;
}

.inventory-content {
  padding: 16px;
}

.info-row {
  background-color: #ffe8c8;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
}

.items-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.item {
  width: 80px;
  height: 100px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px;
}

.discount-badge {
  position: absolute;
  top: -8px;
  left: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.item-image {
  font-size: 28px;
  margin-bottom: 4px;
}

.item-name {
  font-size: 12px;
  margin-bottom: 4px;
}

.item-count {
  font-size: 12px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.confirm-button {
  background-color: #fff3d4;
  border: 2px solid #8b4513;
  border-radius: 16px;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;
}

.plus-icon {
  font-weight: bold;
  font-size: 18px;
}

.fruit-container {
  border: 2px solid #8B4513;
  border-radius: 10px;
  background-color: #f5f5dc;
  padding: 10px;
  width: 100%;
}

.fruit-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.fruit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 160px; /* Reverted width */
  margin: 5px; /* Reverted margin */
}

.fruit-image {
  width: 120px; /* Reverted width */
  height: 120px; /* Reverted height */
}

.fruit-discount {
  position: absolute;
  bottom: 40px;
  left: 10px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 12px;
}

.fruit-name {
  margin-top: 5px;
  font-size: 14px;
}

.fruit-quantity {
  font-size: 12px;
  margin-top: 3px;
}

/* Webkit 브라우저용 스크롤바 스타일링 */
.fruit-container::-webkit-scrollbar {
  width: 8px;
}

.fruit-container::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.fruit-container::-webkit-scrollbar-thumb {
  background-color: #523629;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
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