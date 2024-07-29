<style scoped>
.start_content {
    height: 100vh;
    width: 100%;
    align-items: center;
    align-content: center;
    background: radial-gradient(circle, #2D1D11 0%, #050505 100%);
}
.rotating_icon {
    width: 30%; /* Задайте нужный размер */
    height: 30%; /* Задайте нужный размер */
    animation: rotate 2s linear infinite; /* Примените анимацию */
    transform-origin: center; /* Установите центр вращения */
}

@keyframes rotate {
    from {
        transform: rotate(0deg); /* Начальное состояние */
    }
    to {
        transform: rotate(360deg); /* Конечное состояние */
    }
}

/* .p-select-list-option, .p-select-list */
</style>

<template>
    <div class="start_content">
        <img src="../assets/coin.svg" alt="" class="rotating_icon">
    </div>

</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const router = useRouter();
const store = useStore();

let user = null;

onBeforeMount(async () => {
    await store.dispatch('fetchUser', { tg_id: "1347962579" });
    user = await store.getters.getUserData;
    console.log("UserData", JSON.stringify(user));

    if (user.country == null) {
        router.push('/login');
    } else {
        router.push('/home');
    }
});

</script>

