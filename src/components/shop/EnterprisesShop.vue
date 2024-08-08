<script setup>
import { ref } from 'vue'
import Tabs from '../abstract/Tabs.vue';

import EnterprisesList from './EnterpriseList.vue'
import BoostList from './BoostList.vue'
import SlotsList from './SlotsList.vue'

import smallDefault from '/src/assets/images/enterprises_shop/small_ent.svg';
import middleDefault from '/src/assets/images/enterprises_shop/middle_ent.svg';
import bigDefault from '/src/assets/images/enterprises_shop/big_ent.svg';

import smallActive from '/src/assets/images/enterprises_shop/small_ent_active.svg';
import middleActive from '/src/assets/images/enterprises_shop/middle_ent_active.svg';
import bigActive from '/src/assets/images/enterprises_shop/big_ent_active.svg';

const tabsData = [
  { name: 'small', label: 'Малый бизнес', component: EnterprisesList, icon: smallDefault, icon_active: smallActive },
  { name: 'middle', label: 'Средний бизнес', component: BoostList, icon: middleDefault, icon_active: middleActive },
  { name: 'big', label: 'Крупный бизнес', component: SlotsList, icon: bigDefault, icon_active: bigActive },
]
const tabButtonsStyle = {
  width: 'auto',
  height: '100px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px'
}
const buttonStyle = {
  color: '#A1A1A1',
  backgroundColor: 'rgba(255, 118, 24, 0.0)',
}
const activeButtonStyle = {
  backgroundColor: 'rgba(255, 118, 24, 0.0)',
  border: '2px solid rgba(255, 255, 255, 1)',
  color: '#fff'
}
</script>

<template>
<Tabs 
  :tabs="tabsData" 
  :tabButtonsStyle="tabButtonsStyle" 
  :buttonStyle="buttonStyle" 
  :activeButtonStyle="activeButtonStyle"
/>
</template>

<style scoped>

</style>
