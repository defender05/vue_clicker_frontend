<template>
  <div>
    <div class="slots-container">
      <div
        v-for="(slot, index) in slots"
        :key="index"
        class="slot"
        @click="toggleEnterprise(index)"
      >
      <div v-if="slot.image" class="enterprise_image_container">
        <img v-if="slot.image" :src="slot.image" class="enterprise_image" />
      </div>
      <img v-else class="empty_slot" src="/src/assets/images/empty_slot.svg"/>


        <div v-if="slot.name" class="enterprise_name">{{ slot.name }}</div>
        <div v-if="slot.capacity" class="enterprise_capacity">{{ slot.capacity }} т/с</div>
      </div>
    </div>

    <button @click="showPurchaseModal" class="add_slot_button">Добавить слот</button>

    <van-popup
      v-model:show="buyEnterprisePopupState"
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
    </van-popup>

    <van-popup
      v-model:show="removeEnterprisePopupState"
      round
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <template #default>
        <div class="popup_container flex-col">
          <div v-if="selected_slot.image" class="enterprise_popup_image_container">
            <img v-if="selected_slot.image" :src="selected_slot.image" class="enterprise__popup_image" />
          </div>
          <div class="slot_popup_title">
            <span style="margin-right: 10px;">{{ selected_slot.name }}</span>
            <span style="font-size: 0.7em; color: #FF7618">{{ selected_slot.capacity }} т/с</span>
          </div>
          <van-divider class="divider" />
          <div v-if="selected_slot.description" class="slot_popup_desc">{{ selected_slot.description }}</div>
          <div v-else class="slot_popup_desc">Тут должно быть описание предприятия, но его нет :(</div>

          <button class="bordered_button" @click="removeEnterpriseWithSlot(selected_slot.tg_id, selected_slot.id, selected_slot.capacity)">Удалить предприятие</button>
        </div>
      </template>
    </van-popup>

    <Modal v-if="isModalVisible" @close="isModalVisible">
      <template #header>
        <h2>Купить слот</h2>
      </template>
      <template #body>
        <p>Вы хотите купить новый слот?</p>
      </template>
      <template #footer>
        <button @click="purchaseSlot">Купить</button>
        <button @click="isModalVisible = false">Отмена</button>
      </template>
    </Modal>

  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Modal from '../abstract/Modal.vue';
// import slot_default_image from '../assets/images/empty_slot.svg';

const store = useStore();
const router = useRouter();

const props = defineProps({
  slotCount: {
    type: Number,
    default: 0,
  },
  enterprises_slots: {
    type: Number,
    default: 0,
  },
  enterprises: {
    type: Array,
  },
});
const emit = defineEmits(['update:slotCount']);

// const slots = ref(Array.from({ length: props.user_enterprises_slots }, () => ({
//       image: null,
//       name: null,
//       capacity: null,
//   })));
const slots = ref([]);
const selected_slot = ref({});
const buyEnterprisePopupState = ref(false);
const removeEnterprisePopupState = ref(false);
const isModalVisible = ref(false)

// watch(() => props.enterprises, (newEnterprises) => {
//   console.log('Данные предприятий обновлены:', newEnterprises);
// });
const InitEnterprisesSlots = (ents, slots_count) => {
  slots.value = [];
  for (let item of ents) {
    slots.value.push({
      tg_id: item.tg_id,
      id: item.enterprise_id,
      image: item.image_url,
      name: item.name,
      capacity: item.capacity,
      description: item.description,
      game_price: item.game_price,
      stars_price: item.stars_price,
    })
  }

  
  if (ents.length < slots_count) {
    let empty_slot_count = slots_count - ents.length;
    for (let i = 0; i < empty_slot_count; i++) { 
      slots.value.push({
        tg_id: null,
        id: null,
        image: null,
        name: null,
        capacity: null,
        description: null,
        game_price: null,
        stars_price: null,
      })
    }
  }
};

watchEffect(() => {
  let ents = props.enterprises;
  let slots_count = props.enterprises_slots;

  console.log('Кол-во слотов:', slots_count);
  console.log('Данные предприятий обновлены:', ents);

  InitEnterprisesSlots(ents, slots_count);
});



// onBeforeMount(async () => {
  
//   console.log(ents[0]);
//   for (let item of ents) {
//     slots.value.push({
//       image: item.image_url,
//       name: item.name,
//       capacity: item.capacity,
//     })
//   }
// });

// Добавление предприятия в слот
const addEnterpriseToSlot = () => {
  router.push('/shop');
};
// Удаление предприятия из слота
const removeEnterpriseWithSlot = async (tg_id, enterprise_id, capacity) => {
  console.log('Удаление предприятия из слота:', tg_id, ' - ', enterprise_id);
  /* Для краткости можно воспользоваться синтаксисом ES6,
    который позволяет использовать сокращенную запись для свойств объекта,
    если имя свойства и имя переменной совпадают: 
    Эта запись эквивалентна { tg_id: tg_id, enterprise_id: enterprise_id }.*/
  await store.dispatch('fetchRemoveEnterpriseWithSlot', {tg_id, enterprise_id});
  
  // let ents = store.getters.getEnterprisesData;
  // let user = store.getters.getUserData;

  store.commit('decreaseCapacity', capacity);
  removeEnterprisePopupState.value = false;
};


// Показать попап добавления предприятия в слот
const showBuyEnterprisePopup = () => {
  buyEnterprisePopupState.value = true;
};
// Показать попап удаления предприятия из слота
const showRemoveEnterprisePopup = () => {
  removeEnterprisePopupState.value = true;
};


const showPurchaseModal = () => {
  isModalVisible.value = true
}

const purchaseSlot = () => {
  if (slots.value.length < 15) {
    slots.value.push({
      tg_id: null,
      id: null, 
      image: null,
      name: null,
      capacity: null,
      description: null,
      game_price: null,
      stars_price: null,
    })
    emit('update:slotCount', slots.value.length);
  }
  isModalVisible.value = false
}

const toggleEnterprise = (index) => {
  // console.log(index);
  const slot = slots.value[index];
  if (slot.name) {
    selected_slot.value = slot;
    showRemoveEnterprisePopup();
  } else {
    showBuyEnterprisePopup();
  }
  // const slot = slots.value[index]
  // if (slots.value[index].enterprise) {
  //   slots.value[index].enterprise = null
  //   slots.value[index].image = slot_default_image
  // } else {
  //   // showBottomPopup();
  //   const enterpriseName = 'Предприятие'
  //   if (enterpriseName) {
  //     slots.value[index].enterprise = enterpriseName
  //     slots.value[index].image = ''
  //   }
  // }
}
</script>

<style scoped>
.slots-container {
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
.enterprise_image_container {
  max-height: 100px;
  width: 100%;
  
  background: repeat-x center url("/src/assets/images/background_slot_image.svg");
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


.popup_container {
  background-color: #0C0C0C;
  border: 1px solid #1F1F1F;
  border-radius: 20px;
  padding: 20px;
  
}
.enterprise_popup_image_container {
  height: 130px;
  width: 100%;
  
  background: repeat-x center url("../assets/images/background_slot_image.svg");
  border: 1px solid #1F1F1F;
  border-radius: 10px;
  margin-bottom: 10px;
  align-content: center;
}
.enterprise__popup_image {
  height: 60%;
  width: 60%;
  object-fit: contain;

}
.slot_popup_title {
  color: #fff;
  font-size: 1.5em;
  padding-top: 10px;
  text-align: left;
}

.slot_popup_desc {
  color: #9C9C9C;
  font-size: 1.0em;
  padding: 0px;
  text-align: left;
}


</style>
