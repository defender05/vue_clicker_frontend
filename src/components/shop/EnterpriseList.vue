<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import ProductList from '../abstract/ProductList.vue';

const store = useStore();

defineProps({
  msg: String,
})

</script>


<template>
  <ProductList :products="products">
    <template #body>
      <div v-if="item.image" class="product_image_container">
        <img v-if="item.image" :src="item.image" class="product_image" />
      </div>
      <img v-else class="empty_slot" src="../assets/images/empty_slot.svg"/>

      <div v-if="item.name" class="product_name">{{ item.name }}</div>
      <div v-if="item.capacity" class="product_capacity">{{ item.capacity }} т/с</div>
    </template>
  </ProductList>
</template>


<style scoped>

</style>
