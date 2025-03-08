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
        <div class="back-button">
          <span class="arrow">◀</span>
        </div>
        <div class="title">창고</div>
        <div class="skip-button">
          <span>SKIP</span>
          <span class="double-arrow">▶▶</span>
        </div>
      </div>
      

      
      <!-- Tab Menu -->
      <div class="tab-container">
        <div class="tab-menu">
          <div class="tab-item">신선식품</div>
          <div class="tab-divider"></div>
          <div class="tab-item active">즉석식품</div>
          <div class="tab-divider"></div>
          <div class="tab-item">전자제품</div>
        </div>
  
        <!-- Inventory Content -->
        <div class="fruit-container" :style="containerStyle">
    <div class="fruit-row" v-for="(row, rowIndex) in fruitRows" :key="rowIndex">
      <div class="fruit-item" v-for="(fruit, fruitIndex) in row" :key="fruitIndex">
        <img :src="fruit.image" :alt="fruit.name" class="fruit-image">
        <div class="fruit-discount" v-if="fruit.discount">{{ fruit.discount }}</div>
        <div class="fruit-name">{{ fruit.name }}</div>
        <div class="fruit-quantity">x{{ fruit.quantity }}</div>
      </div>
    </div>
  </div>
      </div>
      
      <!-- Confirm Button -->
      <div class="button-container">
        <button class="confirm-button">
          <span class="plus-icon">+</span>
          <span>확장하기</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>

  const model={  
    image:'src/assets/common/fruit/strawberry.png',
    fruits: [
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '사과', image: 'src/assets/common/fruit/apple.png', quantity: 1, discount: null },
        { name: '딸기', image: 'src/assets/common/fruit/strawberry.png', quantity: 1, discount: null },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        { name: '파인애플', image: 'src/assets/common/fruit/fineapple_s.png', quantity: 3, discount: '50%' },
        // 과일 데이터 더 추가 가능
      ],
      itemsPerRow: 5,
      maxVisibleRows: 3,
      rowHeight: 150, 
  }


  export default {
    name: 'KoreanInventoryInterface'
    ,data(){
      return model;
    }
    ,computed: {
        // 과일 배열을 5개씩 나누어 2차원 배열로 변환
        fruitRows() {
          const rows = [];
          for (let i = 0; i < this.fruits.length; i += this.itemsPerRow) {
            rows.push(this.fruits.slice(i, i + this.itemsPerRow));
          }
          return rows;
        },
        // 컨테이너 스타일 (스크롤 설정)
        containerStyle() {
          // 행의 개수가 maxVisibleRows보다 많으면 스크롤 설정
          if (this.fruitRows.length > this.maxVisibleRows) {
            return {
              height: `${this.maxVisibleRows * this.rowHeight}px`,
              overflowY: 'scroll'
            };
          }
          return {};
        }
      }
  }
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
    gap:50px;
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
    border-bottom:4px solid #6F3533;
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
  width: 80px;
}

.fruit-image {
  width: 60px;
  height: 60px;
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

  </style>