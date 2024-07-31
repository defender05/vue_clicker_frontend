<template>
    <div class="coinStyle" @click="handleClick"></div>
</template>
  
<script setup>

import { ref } from 'vue';


const handleClick = (event) => {
    const $coinImage = document.querySelector('.coinStyle');
    const rect = $coinImage.getBoundingClientRect();

    const offfsetX = event.clientX - rect.left - rect.width / 2;
    const offfsetY = event.clientY - rect.top - rect.height / 2;

    const DEG = 40;

    const tiltX = (offfsetY / rect.height) * DEG;
    const tiltY = (offfsetX / rect.width) * -DEG;

    $coinImage.style.setProperty('--tiltX', `${tiltX}deg`);
    $coinImage.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
        $coinImage.style.setProperty('--tiltX', `0deg`)
        $coinImage.style.setProperty('--tiltY', `0deg`)
    }, 300);

    const plusOne = document.createElement('div');
    plusOne.classList.add('animated_number');
    plusOne.textContent = '+1';
    plusOne.style.left = `${event.clientX}px`;
    plusOne.style.top = `${event.clientY - 30}px`;

    $coinImage.parentElement.appendChild(plusOne);

    setTimeout(() => {
        plusOne.remove()
    }, 2000)
};

// const rotateCoin = (deltaX, deltaY) => {
//     rotationX.value += deltaY;
//     rotationY.value += deltaX;

//     coinStyle.value.transform = `rotateY(${rotationY.value}deg) rotateX(${rotationX.value}deg)`;
// };

// const handleClick = (event) => {
//     if (event.touches) {
//         for (let i = 0; i < event.touches.length; i++) {
//             const touch = event.touches[i];

//             const deltaX = touch.clientX < centerX ? 20 : -20; // Поворот по оси Y
//             const deltaY = touch.clientY < centerY ? -20 : 20; // Поворот по оси X

//             rotateCoin(deltaX, deltaY);

//             spawnNumber(); // Спавн цифры

//             setTimeout(() => {
//                 rotateCoin(-deltaX, -deltaY); // Возвращаем в исходное положение
//             }, 100);
//         }
//     }


//     const deltaX = event.clientX < centerX ? 20 : -20; // Поворот по оси Y
//     const deltaY = event.clientY < centerY ? -20 : 20; // Поворот по оси X
    
//     coinPosition = { x: event.clientX, y: event.clientY };

//     rotateCoin(deltaX, deltaY);

//     spawnNumber(); // Спавн цифры

//     setTimeout(() => {
//         rotateCoin(-deltaX, -deltaY); // Возвращаем в исходное положение
//     }, 100);
// };

// const spawnNumber = () => {
//     const randomNumber = Math.floor(Math.random() * 10); // Генерируем случайное число от 0 до 9
//     numbers.value.push(randomNumber);
// };

// const removeNumber = (index) => {
//     numbers.value.splice(index, 1); // Удаляем число из массива
// };

</script>
  
<style>
.coinStyle {
  width: 212px;
  height: 212px;
  background-image: url(../assets/coin.svg);
  border-radius: 50%;
  box-shadow: 0px 0px 16px 0px rgba(138, 143, 254, 0.05);
  transition: transform 0.2s ease;
  --tiltX: 0deg;
  --tiltY: 0deg;
  transform: rotateX(var(--tiltX)) rotateY(var(--tiltY));
}
.animated_number {
  position: absolute;
  font-family: Inter;
  text-shadow: 0px 0px 4px rgba(234, 182, 64, 0.25);
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(180deg, #e8c547 0%, #ef882b 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
  user-select: none;
  animation: move-up 2s forwards;
}
@keyframes move-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}
</style>