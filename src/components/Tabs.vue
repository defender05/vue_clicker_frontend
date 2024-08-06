<script setup>
import { ref, defineProps } from 'vue'

// Определение пропсов для компонента
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
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
  <div class="tabs-container">
    <div class="tabs-buttons">
      
      <button
        v-for="tab in props.tabs"
        :key="tab.name"
        @click="setActiveTab(tab.name)"
        :class="{ active: activeTab === tab.name }"
      >
        <img v-if="activeTab === tab.name" :src="tab.icon_active" style="margin-bottom: 5px; fill: blue">
        <img v-else :src="tab.icon" style="margin-bottom: 5px; fill: blue">
        
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-content">
      <component :is="getCurrentTabComponent()" />
    </div>
  </div>
</template>


<style scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabs-buttons {
  width: 100%;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
  margin-bottom: 20px;
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
  border-radius: 8px;
}

button.active {
  background-color: rgba(255, 118, 24, 0.12);
  border: 2px solid #FF7618;
  color: #FF7618;
}

.tab-content {
  border: 1px solid #ddd;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  text-align: left;
}
</style>

