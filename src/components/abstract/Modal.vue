<template>
<div class="modal-overlay" @click.self="close">
    <div class="modal-content">
    <header class="modal-header">
        <slot name="header"></slot>
        <button class="close-button" @click="close">×</button>
    </header>
    <div class="modal-body">
        <slot name="body"></slot>
    </div>
    <footer class="modal-footer">
        <slot name="footer"></slot>
    </footer>
    </div>
</div>
</template>
  
<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Модальное окно'
    }
})

const close = () => {
// Эмитируем событие закрытия модального окна
emit('close')
}
</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-body {
    margin-top: 10px;
}

.modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>