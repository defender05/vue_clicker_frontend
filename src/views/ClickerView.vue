<template>
    <div class="clicker_content">

        <div class="balance_info flex_row">
            <div class="flex_col" style="width: 100%; gap: 10px">
                <div class="balance_text">Баланс</div>
                <div class="balance_row flex_row">
                    <span v-if="user_balance" class="user_game_balance">{{ user_balance }}</span>
                    <span v-else class="user_game_balance">0</span>
                    <!-- <img src="../assets/coin.svg" class="balance_coin_image"> -->
                </div>
            </div>
        </div>

        <div class="click_image_container flex_row">
            <!-- <img src="../assets/coin.svg" class="click_image" :style="coinStyle"> -->
            <!-- <Clicker /> -->
             
            <div class="coinStyle" @click="handleClick" :style="coinStyle"></div>
            <div v-for="(position, index) in plusOnePositions" 
            :key="index" 
            class="animated_number" 
            :style="getPlusOneStyle(position)">
                +1
            </div>
             
            
        </div>

        <div class="boosts flex_row">
        
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


onBeforeMount(async () => {
    let user = await store.getters.getUserData;
    // console.log('User image_url:', user.country.image_url);

    user_balance.value = user.game_balance;
    user_capacity.value = user.total_capacity;
    
    // console.log("UserData", JSON.stringify(user));
    
});

// onUpdated(async () => {
//     let balance = store.getters.getBalance;
//     console.log('Updated balance:', balance);

//     user_balance.value = balance;
//     // console.log("UserData", JSON.stringify(user));
// });

const tiltX = ref(0);
const tiltY = ref(0);
const plusOnePositions = ref([]);

const coinStyle = computed(() => ({
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

//   let capacity_value = store.getters.getCapacity;
//   store.commit('increaseBalance', capacity_value);

  // Убираем элемент через 2 секунды
  setTimeout(() => {
      newPosition.opacity = 0; // Уменьшаем непрозрачность
      // Удаляем элемент через 2.5 секунды, чтобы дать время на анимацию
      setTimeout(() => {
          plusOnePositions.value.shift();
      }, 500); // Время анимации
  }, 2000);
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
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0% 5%;
    gap: 20px;
}
.balance_info {
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
    font-size: 2.5em;
    font-weight: 500;
    color: #FF7618;
    margin-right: 10px;
}
.balance_text {
    color: #5c5b5b;
    font-size: 1em;
    font-weight: 100;
}
.balance_coin_image {
    width: 50%;
    height: auto;

}
.balance_text {
    color: #5c5b5b;
    font-size: 1em;
    font-weight: 100;
}
.click_image_container {
    width: 100%;
    height: 100%;
    justify-content: center;
    margin: auto;
    /* perspective: 1000px; */
}


.coinStyle {
  width: 212px;
  height: 212px;
  background-image: url(../assets/coin.svg);
  border-radius: 50%;
  box-shadow: 0px 0px 16px 0px rgba(138, 143, 254, 0.05);
  transition: transform 0.2s ease;
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
}
</style>