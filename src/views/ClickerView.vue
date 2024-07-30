<script setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex';
import Clicker from '../components/Clicker.vue';

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


// const coinStyle = { value: { transform: 'rotateY(0deg) rotateX(0deg)' } };

// const centerX = window.innerWidth / 2; // Центр по оси X
// const centerY = window.innerHeight / 2; // Центр по оси Y


// const handleMouseDown = (event) => {
//     console.log('click')
//     // for (let i = 0; i < event.touches.length; i++) {
//     //     const touch = event.touches[i];

//     //     const rotationY = touch.clientX < centerX ? -10 : 10; // Поворот по оси Y
//     //     const rotationX = touch.clientY < centerY ? -10 : 10; // Поворот по оси X
//     //     rotateCoin(rotationX, rotationY);
//     // }
//     const { clientX, clientY } = event;

//     const rotationY = clientX < centerX ? -10 : 10; // Поворот по оси Y
//     const rotationX = clientY < centerY ? -10 : 10; // Поворот по оси X
//     rotateCoin(rotationX, rotationY);

//     // setTimeout(() => {
//     //     rotateCoin(-rotationX, -rotationY); // Возвращаем в исходное положение
//     // }, 1000);
// };

// const handleTouchStart = (event) => {
//     console.log('click')
//     // for (let i = 0; i < event.touches.length; i++) {
//     //     const touch = event.touches[i];

//     //     const rotationY = touch.clientX < centerX ? -10 : 10; // Поворот по оси Y
//     //     const rotationX = touch.clientY < centerY ? -10 : 10; // Поворот по оси X
//     //     rotateCoin(rotationX, rotationY);
//     // }

//     const touch = event.touches[0];
//     const rotationY = touch.clientX < centerX ? -10 : 10; // Поворот по оси Y
//     const rotationX = touch.clientY < centerY ? -10 : 10; // Поворот по оси X
//     rotateCoin(rotationX, rotationY);

//     setTimeout(() => {
//         rotateCoin(-rotationX, -rotationY); // Возвращаем в исходное положение
//     }, 1000);
// };

// const rotateCoin = (rotationX, rotationY) => {
//   const currentTransform = coinStyle.value.transform;
  
//   // Извлекаем текущие углы вращения
//   const currentRotationY = parseFloat(currentTransform.match(/rotateY\(([^deg]*)/)[1]) || 0;
//   const currentRotationX = parseFloat(currentTransform.match(/rotateX\(([^deg]*)/)[1]) || 0;

//   // Обновляем трансформацию
//   coinStyle.value.transform = `rotateY(${currentRotationY + rotationY}deg) rotateX(${currentRotationX + rotationX}deg)`;
// };

// const handleTouchStart = (event) => {
//   const touch = event.touches[0];
//   const centerX = window.innerWidth / 2;

//   // Определяем направление поворота
//   const rotationDirection = touch.clientX < centerX ? -10 : 10; // Поворот в зависимости от клика
//   rotateCoin(rotationDirection);
// };

// Обработчик клика
// document.addEventListener('click', (event) => {
//   const { clientX, clientY } = event;

//   // Определяем направление вращения
//   const rotationY = clientX < centerX ? -10 : 10; // Поворот по оси Y
//   const rotationX = clientY < centerY ? -10 : 10; // Поворот по оси X

//   rotateCoin(rotationX, rotationY);

//   // Возвращение в исходное положение через некоторое время (например, 1 секунда)
//   setTimeout(() => {
//     rotateCoin(-rotationX, -rotationY); // Возвращаем в исходное положение
//   }, 1000);
// });


</script>

<template>
    <div class="clicker_content">

        <div class="balance_info flex_row">
            <div class="flex_col" style="width: 100%; gap: 10px">
                <div class="balance_text">Баланс</div>
                <div class="balance_row flex_row">
                    <span v-if="user_balance" class="user_game_balance">{{ user_balance.toLocaleString() }}</span>
                    <span v-else class="user_game_balance">0</span>
                    <!-- <img src="../assets/coin.svg" class="balance_coin_image"> -->
                </div>
            </div>
        </div>

        <div class="click_image_container flex_row">
            <!-- <img src="../assets/coin.svg" class="click_image" :style="coinStyle"> -->
            <Clicker />
        </div>

        <div class="boosts flex_row">
        
        </div>

    </div>

</template>

<style scoped>
.clicker_content {
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
    height: auto;
    justify-content: center;
    /* perspective: 1000px; */
}
.click_image {
    /* user-select: none;
    pointer-events: none; */
    width: 100px;

}
</style>