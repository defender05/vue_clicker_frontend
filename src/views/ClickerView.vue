<template>
    <div class="clicker_content">

        <div class="balance_info_row flex_row">
            <div class="flex_col" style="width: 100%; gap: 10px">
                <div class="balance_text">Баланс</div>
                <div class="balance_row flex_row">
                    <span v-if="user_balance" class="user_game_balance">{{ user_balance.toLocaleString() }}</span>
                    <span v-else class="user_game_balance">0</span>
                    <img src="../assets/images/coin.svg" class="balance_coin_image">
                </div>
            </div>
        </div>

        <div class="params_info_row flex_row">
            <div class="params_box flex_col">
                <div class="param_box_title">Производительность</div>
                <div class="param_box_value">{{ user_capacity }} т/с</div>
            </div>
            <div class="params_box flex_col">
                <div class="param_box_title">Множитель</div>
                <div class="param_box_value">x2</div>
            </div>
            <div class="params_box flex_col">
                <div class="param_box_title">Буст</div>
                <div class="param_box_value">50%</div>
            </div>
        </div>

        <div class="click_image_row flex_row">
            <!-- <img src="../assets/coin.svg" class="click_image" :style="coinStyle"> -->
            <!-- <Clicker /> -->
             
            <div class="coinStyle" @click="handleClick" :style="coinStyle"></div>
            <div v-for="(position, index) in plusOnePositions" 
            :key="index" 
            class="animated_number" 
            :style="getPlusOneStyle(position)">
                +{{ user_capacity * 2 }}
            </div>
             
            
        </div>

        <div class="clicker_box_row flex_row">
            <div class="clicker_box flex_row">
                <img class="clicker_box_icon" src="../assets/images/energy_icon.svg" alt="">
                {{ user_energy }} / 500
            </div>
            <div class="clicker_box flex_row">
                <img class="clicker_box_icon" src="../assets/images/boost_icon.svg" alt="">
                Бусты
            </div>
        
        </div>

    </div>

</template>

<script setup>
import { ref, computed, onBeforeMount, } from 'vue'
import { useStore } from 'vuex';
// import Clicker from '../components/Clicker.vue';
// import ClickerTest from '../components/ClickerTest.vue';

const store = useStore();
const user_balance = ref(0);
const user_capacity = ref(0);
const user_energy = ref(0);
const user_country_image = ref('');


onBeforeMount(async () => {
    // let user = await store.getters.getUserData;
    let user = {
          id: '001',
          tg_id: '1111111',
          username: 'velozadrot',
          first_name: 'Chelovek',
          last_name: 'Pawuk',
          game_balance: 1000000,
          total_capacity: 10000,
          enterprises_slots: 10,
          country: {
            image_url: 'https://s3.timeweb.cloud/a483be37-countryballs/countries_icons/russia.svg'
          },
          energy: 500
    }
    // console.log('User image_url:', user.country.image_url);
    // let store_balance = store.getters.getBalance;
    // let store_capacity = store.getters.getCapacity;
    // let store_energy = store.getters.getEnergy;
    // let store_country_image = store.getters.getCountryImageUrl;

    let store_balance = user.game_balance;
    let store_capacity = user.total_capacity;
    let store_energy = user.energy;
    let store_country_image = user.country.image_url;
    

    user_balance.value = (store_balance !== null) ? store_balance : user.game_balance;
    user_capacity.value = (store_capacity !== null) ? store_capacity : user.total_capacity;
    user_energy.value = (store_energy !== null) ? store_energy : user.energy;
    user_country_image.value = store_country_image;
    console.log('store_country_image:', user_country_image.value);

    // console.log("UserData", JSON.stringify(user));
    
});

// onUpdated(async () => {
//     let balance = store.getters.getBalance;
//     console.log('Updated balance:', balance);

//     user_balance.value = balance;
//     // console.log("UserData", JSON.stringify(user));
// });

let timeoutId; // Переменная для хранения идентификатора таймера
const update_balance_delay = 5000; // Задержка в миллисекундах (5 секунд)

const tiltX = ref(0);
const tiltY = ref(0);
const plusOnePositions = ref([]);

const coinStyle = computed(() => ({
    background: `center url(${user_country_image.value}) no-repeat`,
    backgroundSize: '100%',
    transform: `rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`
}));

const handleClick = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  
  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 40;

  tiltX.value = (offsetY / rect.height) * DEG;
  tiltY.value = (offsetX / rect.width) * -DEG;

  setTimeout(() => {
      tiltX.value = 0;
      tiltY.value = 0;
  }, 300);

  const newPosition = {
      left: `${event.clientX}px`,
      top: `${event.clientY - 30}px`,
      opacity: 1
  };

  plusOnePositions.value.push(newPosition);

  store.commit('increaseBalance');
  store.commit('decreaseEnergy', 1);
  user_balance.value = store.getters.getBalance;
  user_energy.value = store.getters.getEnergy;

  // Убираем элемент через 2 секунды
  setTimeout(() => {
      newPosition.opacity = 0; // Уменьшаем непрозрачность
      // Удаляем элемент через 2.5 секунды, чтобы дать время на анимацию
      setTimeout(() => {
          plusOnePositions.value.shift();
      }, 500); // Время анимации
  }, 5000);

  // Сбрасываем предыдущий таймер, если он существует
  if (timeoutId) {
    console.log("Сброс таймера");
    clearTimeout(timeoutId);
  }

  // Устанавливаем новый таймер
  timeoutId = setTimeout(async () => {
    console.log("Обновление баланса");
    await store.dispatch('fetchUpdateGameBalance', { tg_id: "1001521242", current_tap_count: 500 - user_energy.value});
    timeoutId = null; // Сбрасываем идентификатор таймера после выполнения
  }, update_balance_delay);
};

const getPlusOneStyle = (position) => ({
  left: position.left,
  top: position.top,
  position: 'absolute',
  opacity: position.opacity,
  transition: 'opacity 1s ease, transform 0.2s ease',
  transform: position.opacity === 0 ? 'translateY(-20px)' : 'translateY(0)'
});

</script>



<style scoped>
.clicker_content {
    position: relative;
    height: 100vh;
    background: radial-gradient(circle, #161515 0%, #000000 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 120px;
    gap: 20px;
}
.balance_info_row {
    background-color: #0C0C0C;
    border: 1px solid #1F1F1F;
    border-radius: 20px;
    padding: 15px;
}
.balance_row {
    align-items: center;
    justify-content: center;
}
.user_game_balance {
    font-family: ReadexPro;
    font-size: 2.5em;
    font-weight: 500;
    /* color: #FF7618; */
    margin-right: 10px;
    background: -webkit-linear-gradient(#FF7618, #FF9900);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.balance_text {
    color: #5c5b5b;
    font-size: 1.2em;
    font-weight: 100;
    
}
.balance_coin_image {
    width: 35px;
    height: 35px;
}


.params_info_row {
    width: auto;
    height: auto;
    justify-content: center;
    margin-top: 0px;
    margin-bottom: auto;
    gap: 10px;
}
.params_box {
    background-color: #0D0B0B;
    border: 0;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.2em;
    font-weight: 100;
    color: #ffffff;
    text-align: center;
    justify-content: center;
    width: 100%;
    gap: 2px;
}
.param_box_title {
    font-family: 'Roboto Condensed';
    font-weight: 400;
    font-size: 14px;
    color: #545454;
}
.param_box_value {
    font-family: 'Roboto Condensed';
    font-weight: 500;
    font-size: 18px;
    background: -webkit-linear-gradient(#E0E0E0, #858784);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}




.click_image_row {
    width: 100%;
    height: auto;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
    overflow: visible;
    /* margin-bottom: auto; */
    /* perspective: 1000px; */
}
.clicker_box_row {
    gap: 10px;
}
.clicker_box {
    background-color: #0C0C0C;
    border: 1.5px solid #1F1F1F;
    border-radius: 10px;
    padding: 15px;
    font-size: 1.2em;
    font-weight: 100;
    color: #ffffff;
    text-align: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
}
.clicker_box_icon {
    width: 25px;
    height: auto;
}


.coinStyle {
    width: 400px;
    height: 400px;
    /* background: center url('https://s3.timeweb.cloud/27959e0a-country-balls/countries_icons/russia.png') no-repeat; */
    background-size: 200%;
    /* box-shadow: 0px 0px 16px 0px rgba(138, 143, 254, 0.05); */
    transition: transform 0.2s ease;
    object-fit: contain; 
    object-position: center;
    transform-origin: center;
}

.animated_number {
    font-family: SFProDisplay;
    text-shadow: 0px 0px 4px rgba(234, 182, 64, 0.25);
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(180deg, #e8c547 0%, #ef882b 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    pointer-events: none;

    user-select: none; /* Запретить выделение текста */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
}
</style>