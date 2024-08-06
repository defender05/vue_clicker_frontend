<script setup>
import { ref } from 'vue';
import Tabs from '../components/Tabs.vue';
import EnterprisesShop from '../components/EnterprisesShop.vue'
import BoostShop from '../components/BoostShop.vue'
import SlotsShop from '../components/SlotsShop.vue'
import CasesShop from '../components/CasesShop.vue'

import enterpriseIcon from '../assets/images/shop/shop_enterprises_icon.svg'
import boostIcon from '../assets/images/shop/shop_boosts_icon.svg'
import slotsIcon from '../assets/images/shop/shop_slots_icon.svg'
import casesIcon from '../assets/images/shop/shop_cases_icon.svg'

import enterpriseActive from '../assets/images/shop/shop_enterprises_icon_active.svg'
import boostActive from '../assets/images/shop/shop_boosts_icon_active.svg'
import slotsActive from '../assets/images/shop/shop_slots_icon_active.svg'
import casesActive from '../assets/images/shop/shop_cases_icon_active.svg'

const tabsData = [
  { name: 'tab1', label: 'Предприятия', component: EnterprisesShop, icon: enterpriseIcon, icon_active: enterpriseActive },
  { name: 'tab2', label: 'Бусты', component: BoostShop, icon: boostIcon, icon_active: boostActive },
  { name: 'tab3', label: 'Слоты', component: SlotsShop, icon: slotsIcon, icon_active: slotsActive },
  { name: 'tab4', label: 'Кейсы', component: CasesShop, icon: casesIcon, icon_active: casesActive },
]

</script>

<template>
    <div class="shop_content">
        <Tabs :tabs="tabsData" />
    </div>

</template>

<style scoped>
.shop_content {
    padding: 10px 30px;
}
</style>