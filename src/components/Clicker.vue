<template>
    <div :style="coinStyle" @click="handleClick"></div>
    <AnimatedNumbers v-for="(number, index) in numbers" 
                   :key="index" 
                   :number="number" 
                   :initialPosition="coinPosition" 
                   @remove="removeNumber" />
</template>
  
<script setup>
import { ref } from 'vue';
import AnimatedNumbers from './AnimatedNumbers.vue';
import coinImage from '../assets/coin.svg';

const rotationX = ref(0);
const rotationY = ref(0);

const numbers = ref([]);
let coinPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Позиция монеты

const coinStyle = ref({
    width: '212px',
    height: '212px',
    backgroundImage: `url(${coinImage})`,
    borderRadius: '50%',
    position: 'relative',
    top: '0%',
    left: '25%',
    transform: 'translate(-50%, 50%)',
    transition: 'transform 0.2s'
});

const rotateCoin = (deltaX, deltaY) => {
    rotationX.value += deltaY;
    rotationY.value += deltaX;

    coinStyle.value.transform = `translate(-50%, 50%) rotateY(${rotationY.value}deg) rotateX(${rotationX.value}deg)`;
};

const handleClick = (event) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = event.clientX < centerX ? 20 : -20; // Поворот по оси Y
    const deltaY = event.clientY < centerY ? -20 : 20; // Поворот по оси X
    
    coinPosition = { x: event.clientX, y: event.clientY };

    rotateCoin(deltaX, deltaY);

    spawnNumber(); // Спавн цифры

    setTimeout(() => {
        rotateCoin(-deltaX, -deltaY); // Возвращаем в исходное положение
    }, 100);
};

const spawnNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10); // Генерируем случайное число от 0 до 9
    numbers.value.push(randomNumber);
};

const removeNumber = (index) => {
    numbers.value.splice(index, 1); // Удаляем число из массива
};

</script>
  
<style>

/* #app {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
} */
</style>