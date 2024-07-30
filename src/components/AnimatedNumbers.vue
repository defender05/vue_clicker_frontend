<template>
    <div class="number" :style="numberStyle">{{ number }}</div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

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
    transition: 'transform 1s ease, opacity 1s ease',
    transform: 'translateY(-100px)',
    opacity: 1
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
}
</style>