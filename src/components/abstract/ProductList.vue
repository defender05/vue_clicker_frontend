<template>
    <div class="list_container">
        <!-- <div class="product_body">
            <slot name="body"></slot>
        </div> -->
    
        <div
        v-for="(item, index) in products"
        :key="index"
        class="item"
        @click="clickProduct(index)"
        >
            <slot name="body"></slot>
            <!-- <div v-if="item.image" class="product_image_container">
                <img v-if="item.image" :src="item.image" class="product_image" />
            </div>
            <img v-else class="empty_slot" src="../assets/images/empty_slot.svg"/>
    
    
            <div v-if="item.name" class="product_name">{{ item.name }}</div>
            <div v-if="item.capacity" class="product_capacity">{{ item.capacity }} т/с</div> -->
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
import { ref, watchEffect } from 'vue';

defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  }
})

const products = ref([]);
const selected_product = ref({});
const popupState = ref(false);

const clickProduct = (index) => {
    const product = products.value[index];
    selected_product.value = product;
    showRemoveEnterprisePopup();
}



</script>



<style scoped>
.list_container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.slot {
  width: calc(50% - 10px);
  height: calc(190px - 10px);;
  padding: 20px;
  /* border: 1px solid #1F1F1F; */
  border-radius: 10px;
  background-color: #121111;
  display: flex;

  flex: 1 1 calc(50% - 10px); /* Занимает половину ширины с учетом отступа */
  flex-direction: column;
  align-items: left;
  justify-content: center;
  cursor: pointer;
  
}

.empty_slot {
  height: 30%;
  width: 100%;

}

.add_slot_button {
  width: 100%;
  background-color: #191919;
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 15px 0px;
  margin-top: 20px;
}
.add_slot_button:focus {
  background-color: #ffffff;
  border: none;
  color: #000000;
}
.product_image_container {
  max-height: 100px;
  width: 100%;
  
  background: repeat-x center url("../assets/images/background_slot_image.svg");
  border: 1px solid #1F1F1F;
  border-radius: 10px;
  margin-bottom: 10px;
  align-content: center;
}
.enterprise_name {
  font-size: 1em;
  color: #fff;
  text-align: left;
}

.enterprise_image {
  height: 60%;
  width: 60%;
  object-fit: contain;

}

.enterprise_capacity {
  font-size: 1em;
  color: #FF7618;
  text-align: left;
}
</style>