<script setup>
import { ref, defineProps } from 'vue'


// Определение пропсов для компонента
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
  },
  tabButtonsStyle: {
    type: Object,
    default: () => ({})
  },
  buttonStyle: {
    type: Object,
    default: () => ({})
  },
  activeButtonStyle: {
    type: Object,
    default: () => ({})
  }
})

// Состояние активной вкладки
const activeTab = ref(props.tabs[0]?.name || '')

// Функция для изменения активной вкладки
const setActiveTab = (tabName) => {
  activeTab.value = tabName
}

const getCurrentTabComponent = () => {
  return props.tabs.find(tab => tab.name === activeTab.value)?.component || null
}
</script>

<template>
  <div class="tabs_container">
    <div class="tabs_buttons" :style="props.tabButtonsStyle">
      
      <button
        v-for="tab in props.tabs"
        :key="tab.name"
        @click="setActiveTab(tab.name)"
        :class="{ active: activeTab === tab.name }"
        :style="activeTab === tab.name ? props.activeButtonStyle : props.buttonStyle"
      >
        <img v-if="activeTab === tab.name" :src="tab.icon_active" style="margin-bottom: 5px; fill: blue">
        <img v-else :src="tab.icon" style="margin-bottom: 5px; fill: blue">
        
        {{ tab.label }}
      </button>
    </div>
    <van-divider class="shop_divider" />
    <div class="tab-content">
      <component :is="getCurrentTabComponent()" :input_data="activeTab"/>
    </div>
  </div>
</template>


<style scoped>
.tabs_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabs_buttons {
  width: 100%;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 10px;
}

button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: #6F6F6F;
  background-color: #101010;
  border: 2px solid #191919;
  border-radius: 15px;
}

button.active {
  background-color: rgba(255, 118, 24, 0.12);
  border: 2px solid #FF7618;
  color: #FF7618;
}

.tab-content {
  padding: 0px;
  width: 100%;
  text-align: left;
}
.shop_divider {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 1px;
  background-color: #191919;
}
</style>

