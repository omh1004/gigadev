<template>
    <div class="main-container">
      <!-- Header -->
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
      
      <!-- Inventory Status -->
      <div class="inventory-status-bar">
        <div class="info-text">발주된 상품은 다음과 같이 창고에 표시 됩니다.</div>
        <div class="capacity-text">창고 개수 : 110/150</div>
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
        <div class="inventory-content">
          <!-- Info Row 1 -->
          <div class="info-row">
            <div class="info-text">
              유통기한 하루 전(D-1) 상품가격이 50% 할인됩니다.
            </div>
          </div>
          
          <!-- Items Row 1 -->
          <div class="items-row">
            <div class="item">
              <div class="discount-badge">50%</div>
              <div class="item-image">🍓</div>
              <div class="item-name">딸기</div>
              <div class="item-count">× 2</div>
            </div>
            
            <div class="item">
              <div class="item-image">🍓</div>
              <div class="item-name">딸기</div>
              <div class="item-count">× 8</div>
            </div>
            
            <div class="item">
              <div class="discount-badge">50%</div>
              <div class="item-image">🍎</div>
              <div class="item-name">사과</div>
              <div class="item-count">× 10</div>
            </div>
            
            <div class="item">
              <div class="item-image">🍎</div>
              <div class="item-name">사과</div>
              <div class="item-count">× 5</div>
            </div>
            
            <div class="item">
              <div class="discount-badge">50%</div>
              <div class="item-image">🍉</div>
              <div class="item-name">왕상추</div>
              <div class="item-count">× 25</div>
            </div>
          </div>
          
          <!-- Info Row 2 -->
          <div class="info-row">
            <div class="info-text">
              유통기한 임박 상품은 모두 판매되지 않으면 다음 날 자동 폐기됩니다.
            </div>
          </div>
          
          <!-- Items Row 2 -->
          <div class="items-row">
            <div class="item">
              <div class="item-image">🍅</div>
              <div class="item-name">방울주</div>
              <div class="item-count">× 10</div>
            </div>
            
            <div class="item">
              <div class="item-image">🍍</div>
              <div class="item-name">파인애플</div>
              <div class="item-count">× 10</div>
            </div>
            
            <div class="item">
              <div class="item-image">🦐</div>
              <div class="item-name">파인애플</div>
              <div class="item-count">× 20</div>
            </div>
            
            <div class="item">
              <div class="item-image">🥚</div>
              <div class="item-name">세포</div>
              <div class="item-count">× 10</div>
            </div>
            
            <div class="item">
              <div class="item-image">🥚</div>
              <div class="item-name">계란</div>
              <div class="item-count">× 10</div>
            </div>
          </div>
          
          <!-- Info Row 3 -->
          <div class="info-row">
            <div class="info-text">
              자동 폐기될 대비해 상품을 20%로 조기 판매할 수 있습니다.
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
  export default {
    name: 'KoreanInventoryInterface'
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
  margin-top: 50px;
  background-color: #f5f5f5;
  
  text-align: center;
  max-width: 100%;
  min-height: 90%;

  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 



  


  background-image: url('@/assets/common/homeMain.png');

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

  
  .left-label {
    font-weight: bold;
    font-size: 18px;
  }
  
  .right-section {
    display: flex;
    align-items: center;
    gap: 12px;
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
  
  .money-icon {
    font-size: 16px;
  }
  
  .settings-icon {
    font-size: 20px;
  }
  
  .navigation {
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
    border: 2px solid #8b4513;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 20px;
    background-color: white;
  }
  
  .tab-menu {
    display: flex;
    background-color: #fff3d4;
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
    background-color: #fff3d4;
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
  </style>