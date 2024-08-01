<template>
  <div class="coinStyle" @click="handleClick" :style="coinStyle"></div>
  <div v-for="(position, index) in plusOnePositions" 
  :key="index" 
  class="animated_number" 
  :style="getPlusOneStyle(position)">
      +1
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

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

  let capacity_value = store.getters.getCapacity;
  store.commit('increaseBalance', capacity_value);
  user_balance.value = store.getters.getBalance;

  // Убираем элемент через 2 секунды
  setTimeout(() => {
      newPosition.opacity = 0; // Уменьшаем непрозрачность
      // Удаляем элемент через 2.5 секунды, чтобы дать время на анимацию
      setTimeout(() => {
          plusOnePositions.value.shift();
      }, 1000); // Время анимации
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

<style>
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
  user-select: none;
  background: linear-gradient(180deg, #e8c547 0%, #ef882b 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>