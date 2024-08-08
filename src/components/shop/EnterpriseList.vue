<template>
  <ProductList :input_products="product_list" :itemStyle="itemStyle">
    <template #body="{ item, index }">
  
      <div v-if="item.image_url" class="product_image_container">
        <img v-if="item.image_url" :src="item.image_url" class="product_image" />
      </div>

      <div v-if="item.name" class="product_name">{{ item.name }}</div>
      
      <div class="flex_row">
        <div v-if="item.capacity && item.capacity < 1000" class="product_capacity">{{ item.capacity}} т/с</div>
        <div v-else class="product_capacity">{{ item.capacity / 1000 }}k т/с</div>

        <div v-if="item.game_price" class="game_price">
        {{ item.game_price < 1000 ? item.game_price : item.game_price / 1000 + 'k'}}
        <img class="price_icon" src="/src/assets/images/coin.svg" />
        </div>
        <div v-else class="stars_price">{{ item.stars_price }}
          <img class="price_icon" src="/src/assets/images/ton_icon.svg" />
        </div>
      </div>
    </template>
  </ProductList>

</template>


<script setup>
import { ref, onBeforeMount, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex';
import ProductList from '../abstract/ProductList.vue';

const store = useStore();

const props = defineProps({
  input_data: {
    type: [String, Number, Object, Array],
    required: false
  }
});

const product_list = ref([]);

onBeforeMount(async () => {
  // Получаем данные из хранилища
  const enterprisesData = store.getters.getEnterprisesData;

  // Фильтрация данных на основе значения из input_data
  product_list.value = enterprisesData.filter(enterprise => {
    // Условие фильтрации. Замените на ваше условие.
    // Например, если input_data — это строка и нужно найти совпадение с именем:
    return enterprise.type_id && enterprise.type_id === props.input_data;
  });

  // console.log("Enterprise list - tab name: ", props.input_data);
});

onMounted(async () => {
  
});

watchEffect(() => {
  const enterprisesData = store.getters.getEnterprisesData;
  product_list.value = enterprisesData.filter(enterprise => {
    // console.log("type_id", enterprise.type_id);
    // Условие фильтрации. Замените на ваше условие.
    // Например, если input_data — это строка и нужно найти совпадение с именем:
    return enterprise.type_id && enterprise.type_id == props.input_data;
  });
  // console.log("Current product_list", JSON.stringify(product_list.value));
});

const itemStyle = {
  width: 'calc(200px - 0px)',
  height: 'calc(205px - 10px)',
  padding: '20px',
  /* border: 1px solid #1F1F1F; */
  borderRadius: '10px',
  backgroundColor: '#121111',
  display: 'flex',

  flex: '1 1 calc(50% - 10px)', /* Занимает половину ширины с учетом отступа */
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'center',
  cursor: 'pointer',
}

</script>





<style scoped>
/* .product_item {
  width: calc(50% - 0px);
  height: calc(190px - 10px);
  padding: 20px 20px;
  border-radius: 10px;
  background-color: #121111;
  display: flex;

  flex: 1 1 calc(50% - 10px); 
  flex-direction: column;
  align-items: left;
  justify-content: center;
  cursor: pointer;
} */
.product_image_container {
  max-height: 100px;
  width: 100%;
  
  background: repeat-x center url("/src/assets/images/background_slot_image.svg");
  border: 1px solid #1F1F1F;
  border-radius: 10px;
  margin-bottom: 10px;
  align-content: center;
}
.product_image {
  height: 60%;
  width: 100%;
  object-fit: contain;
}
.info_container {
  width: 100%;
}
.product_name {
  max-width: 90%;
  min-height: 22px;
  font-size: 1em;
  color: #fff;
  text-align: left;
  margin-bottom: 5px;

  white-space: nowrap; /* Запрет на перенос текста */
  overflow: hidden; /* Скрыть переполняющийся текст */
  text-overflow: ellipsis; /* Добавить многоточие в конце */
}
.product_capacity {
  font-size: 1em;
  color: #6e6e6e;
  text-align: left;
}
.game_price {
  
  margin-left: auto;
  font-size: 1em;
  color: #FF7618;
  text-align: right;
  vertical-align: baseline;
}
.stars_price {
  margin-left: auto;
  font-size: 1em;
  color: #229CFF;
  text-align: right;
}
.price_icon {
  vertical-align: top;
  width: 18px;
  height: auto;
  margin-left: 5px;
}
</style>
