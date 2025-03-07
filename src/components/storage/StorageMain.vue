<template>
    <div id="app" class="inventory-container">
      <div class="inventory-card">
        <div class="inventory-header">
          <div class="d-day">D-30</div>
          <div class="point-container">
            <span class="inventory-points">500,000원</span>
            <!-- <img src="" alt="코인" class="coin-icon"> -->
          </div>
        </div>
        
        <div class="inventory-title">창고</div>
        <div class="inventory-status">창고 개수 : 110/150</div>
        
        <div class="inventory-content">
          <div class="inventory-tabs">
            <div 
              v-for="(tab, index) in tabs" 
              :key="index" 
              :class="['tab', { active: activeTab === index }]"
              @click="activeTab = index"
            >
              {{ tab.name }}
            </div>
          </div>
          
          <div class="inventory-grid">
            <div 
              v-for="(item, index) in filteredItems" 
              :key="index" 
              class="inventory-item"
            >
              <div class="item-card">
                <img src="" :alt="item.name" class="item-image">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-quantity">× {{ item.quantity }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="add-item-container">
          <button class="add-item-button" @click="openPopup">
            <span class="plus-icon">+</span> 확장하기
          </button>
        </div>
      </div>

      <!-- 팝업 창 -->
      <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content">
          <h3>확장하기</h3>
          <div class="expansion-options">
            <button 
              v-for="option in expansionOptions" 
              :key="option.id" 
              @click="handleOptionClick(option.id)"
            >
              {{ option.name }}
            </button>
          </div>
          <button class="close-btn" @click="closePopup">닫기</button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name:'StorageVue',
    data() {
    return {
      activeTab: 0,
      tabs: [
        { name: "1. 신선식품", id: "fresh" },
        { name: "2. 즉석식품", id: "processed" },
        { name: "3. 전자제품", id: "electronics" }
      ],
      inventoryItems: [
        { name: '딸기', quantity: 2, type: "fresh" },
        { name: '방울토마토', quantity: 5, type: "fresh" },
        { name: '수박', quantity: 10, type: "fresh" },
        { name: '사과', quantity: 5, type: "fresh" },
        { name: '열대과일', quantity: 20, type: "fresh" },
        { name: '수박', quantity: 10, type: "fresh" },
        { name: '토마토', quantity: 10, type: "fresh" },
        { name: '파인애플', quantity: 10, type: "fresh" },
        { name: '게', quantity: 20, type: "fresh" },
        { name: '계란', quantity: 10, type: "fresh" },
        {name: '라면', quantity: 10, type: "processed"},
        {name: '컴퓨터', quantity: 10, type: "electronics"},
        // 다른 타입의 아이템들도 유사하게 추가할 수 있습니다
      ]
    };
  },
  computed: {
    filteredItems() {
      const tabType = this.tabs[this.activeTab].id;
      return this.inventoryItems.filter(item => item.type === tabType);
    }
  }
}
</script>
<style>
  .inventory-container {
    width: 100%;
    max-width: 670px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }

  .inventory-card {
      border: 1px solid #dfbc95;
      border-radius: 15px;
      overflow: hidden;
      background-color: #fffbf2;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .inventory-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      background-color: #fffbf2;
      border-bottom: 1px solid #dfbc95;
  }

  .d-day {
      background-color: white;
      padding: 5px 10px;
      border-radius: 20px;
      border: 1px solid #dfbc95;
      font-weight: bold;
  }

  .point-container {
      display: flex;
      align-items: center;
      background-color: #7a2e1d;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
  }

  .coin-icon {
      width: 20px;
      height: 20px;
      margin-left: 5px;
  }

  .inventory-title {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      padding: 15px 0 5px;
  }

  .inventory-status {
      font-size: 14px;
      color: #666;
      text-align: right;
      padding: 0 15px 10px;
  }

  .inventory-tabs {
      display: flex;
      background-color: #fffbf2;
      border-bottom: 1px solid #dfbc95;
      border-top: 1px solid #dfbc95;
  }

  .tab {
      flex: 1;
      text-align: center;
      padding: 10px;
      cursor: pointer;
      border-right: 1px solid #dfbc95;
      transition: background-color 0.3s;
  }

  .tab:last-child {
      border-right: none;
  }

  .tab.active {
      background-color: #ffe6bf;
      font-weight: bold;
  }

  .inventory-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      padding: 15px;
      background-color: #fffbf2;
  }

  .inventory-item {
      display: flex;
      justify-content: center;
  }

  .item-card {
      width: 80px;
      height: 100px;
      background-color: #fff;
      border: 1px solid #dfbc95;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
  }

  .item-image {
      width: 50px;
      height: 50px;
      object-fit: contain;
  }

  .item-name {
      font-size: 12px;
      text-align: center;
      margin-top: 5px;
  }

  .item-quantity {
      color: #ea8e23;
      font-size: 14px;
      font-weight: bold;
      margin-top: 2px;
  }

  .add-item-container {
      display: flex;
      justify-content: center;
      padding: 10px 0 20px;
  }

  .add-item-button {
      background-color: #ffe6bf;
      border: 1px solid #dfbc95;
      border-radius: 20px;
      padding: 8px 20px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
  }

  .plus-icon {
      margin-right: 5px;
      font-weight: bold;
  }
</style>