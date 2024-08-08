<template>
  <div>
    <div class="product_container">
      <div
      v-for="(item, index) in props.input_products"
      :key="index"
      :style="props.itemStyle"
      @click="clickProduct(index)"
      >
          <slot name="body" :item="item" :index="index"></slot>
      </div>
    </div>
  </div>


    
    <!-- <van-popup
          v-model:show="popupState"
          round
          position="bottom"
          :style="{ height: 'auto' }"
        >
          <template #default>
            <div class="popup_container flex-col">
              <div v-if="selected_slot.image" class="enterprise_popup_image_container"></div>
              <div class="slot_popup_title">
                <span style="margin-right: 10px;">Слот пуст</span>
                <span style="font-size: 0.7em; color: #FF7618">0 т/с</span>
              </div>
              <van-divider class="divider" />
              <div class="slot_popup_desc">Данный слот не занят никаким предприятием.
              Добавьте предприятие, чтобы начать зарабатывать быстрее.</div>
    
              <button class="filled_button" @click="addEnterpriseToSlot">Добавить предприятие</button>
            </div>
          </template>
    </van-popup> -->
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue';

const products = ref([]);
const selected_product = ref({});
const popupState = ref(false);

const props = defineProps({
  input_products: {
    type: Array,
    required: true,
    default: () => [],
  },
  itemStyle: {
    type: Object,
    default: () => ({})
  },
})

onBeforeMount(async () => {
    products.value = props.input_products;
    console.log("Current product_list", JSON.stringify(props.input_products));
});

watchEffect(() => {
  products.value = props.input_products;
});

const clickProduct = (index) => {
    const product = props.input_products[index];
    selected_product.value = product;
    showRemoveEnterprisePopup();
}



</script>



<style scoped>
.product_container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 100px;
}
</style>