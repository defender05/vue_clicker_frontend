<script setup>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import Tabs from '../components/abstract/Tabs.vue';
import EnterprisesShop from '../components/shop/EnterprisesShop.vue'
import BoostShop from '../components/shop/BoostShop.vue'
import SlotsShop from '../components/shop/SlotsShop.vue'
import CasesShop from '../components/shop/CasesShop.vue'

import enterpriseIcon from '../assets/images/shop/shop_enterprises_icon.svg'
import boostIcon from '../assets/images/shop/shop_boosts_icon.svg'
import slotsIcon from '../assets/images/shop/shop_slots_icon.svg'
import casesIcon from '../assets/images/shop/shop_cases_icon.svg'

import enterpriseActive from '../assets/images/shop/shop_enterprises_icon_active.svg'
import boostActive from '../assets/images/shop/shop_boosts_icon_active.svg'
import slotsActive from '../assets/images/shop/shop_slots_icon_active.svg'
import casesActive from '../assets/images/shop/shop_cases_icon_active.svg'

// import EnterpriseList from '../components/shop/EnterpriseList.vue'

const store = useStore();

onBeforeMount(async () => {
    await store.dispatch('fetchEnterprises', { type_id: null });
});

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
    background-color: black;
    padding: 10px 30px;
}
</style>