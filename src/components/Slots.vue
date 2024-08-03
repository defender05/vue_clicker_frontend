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
      <img v-else class="empty_slot" src="../assets/images/empty_slot.svg"/>


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
          <img class="slot_popup_image" src="../assets/images/empty_slot_image.svg" alt="">
          <div class="slot_popup_title">Слот пуст</div>
          <van-divider class="divider" />
          <div class="slot_popup_desc">Данный слот не занят никаким предприятием.
          Добавьте предприятие, чтобы начать зарабатывать быстрее.</div>
          <div class="slot_popup_button">Добавить предприятие</div>
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
          <img class="slot_popup_image" src="../assets/images/empty_slot_image.svg" alt="">
          <div class="slot_popup_title">Слот занят</div>
          <van-divider class="divider" />
          <div class="slot_popup_desc">Данный слот занят.</div>
          <div class="slot_popup_button">Удалить предприятие</div>
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
import { ref, defineEmits, watchEffect } from 'vue';
import Modal from './Modal.vue';
import slot_default_image from '../assets/images/empty_slot.svg';

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
const buyEnterprisePopupState = ref(false);
const removeEnterprisePopupState = ref(false);
const isModalVisible = ref(false)

// watch(() => props.enterprises, (newEnterprises) => {
//   console.log('Данные предприятий обновлены:', newEnterprises);
// });
watchEffect(() => {
  let ents = props.enterprises;
  let slots_count = props.enterprises_slots;

  console.log('Кол-во слотов:', slots_count);
  console.log('Данные предприятий обновлены:', ents);

  for (let item of ents) {
    slots.value.push({
      image: item.image_url,
      name: item.name,
      capacity: item.capacity,
    })
  }

  
  if (ents.length < slots_count) {
    let empty_slot_count = slots_count - ents.length;
    for (let i = 0; i < empty_slot_count; i++) { 
      slots.value.push({
        image: null,
        name: null,
        capacity: null,
      })
    }
  }
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



const showBuyEnterprisePopup = () => {
  buyEnterprisePopupState.value = true;
};
const showRemoveEnterprisePopup = () => {
  removeEnterprisePopupState.value = true;
};


const showPurchaseModal = () => {
  isModalVisible.value = true
}

const purchaseSlot = () => {
  if (slots.value.length < 15) {
    slots.value.push({ 
      image: null,
      name: null,
      capacity: null, 
    })
    emit('update:slotCount', slots.value.length);
  }
  isModalVisible.value = false
}

const toggleEnterprise = (index) => {
  // console.log(index);
  const slot = slots.value[index];
  if (slot.enterprise) {
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
  height: calc(190px - 10px);
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
  height: 100px;
  width: auto;
  background: repeat-x center url("../assets/images/background_slot_image.svg");
  border: 1px solid #1F1F1F;
  border-radius: 10px;
  margin-bottom: 10px;
}
.enterprise_name {
  font-size: 1em;
  color: #fff;
  text-align: left;
}

.enterprise_image {
  height: 100px;
  width: auto;

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
.slot_popup_button {
  color: #000000;
  font-size: 1.3em;
  padding: 20px 10px;
  background-color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
