<template>
    <span :class="['number', { 'fade-out': isFading }]" :style="numberStyle">{{ number }}</span>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['remove'])

const props = defineProps({
    number: {
        type: Number,
        required: true
    },
    initialPosition: {
        type: Object,
        required: true
    }
})


const numberStyle = ref({
    position: 'absolute',
    left: `${props.initialPosition.x}px`,
    top: `${props.initialPosition.y}px`,
    transition: 'opacity 1s ease',
    transform: 'translateY(10px)',
    opacity: 1,
    '--initial-x': `${props.initialPosition.x}px`,
    '--initial-y': `${props.initialPosition.y}px`,
});

onMounted(() => {
    // Убираем элемент после анимации
    setTimeout(() => {
        numberStyle.value.opacity = 0; // Прозрачность для исчезновения
    }, 500);

    setTimeout(() => {
        emit('remove'); // Сообщаем родителю, что можно удалить элемент
    }, 2000); // Удаляем через 2 секунды
});

</script>

<style scoped>
.number {
    font-size: 24px;
    color: #ffcc00; /* Цвет цифр */
    animation: up 1s linear ease-out; /* Примените анимацию */
    user-select: none; /* Запретить выделение текста */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
}

.fade-out {
    opacity: 0;
    transition: all 1s ease;
}

@keyframes up {
    to {
        transform: translateY(-200px);
    }
}
</style>