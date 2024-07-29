<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";


const router = useRouter();
const route = useRoute(); // Получаем текущий маршрут
const active = ref(0);

const menu_items = ref([
    {
        label: 'Главная',
        command: () => {
            router.push('/home');
        }
    },
    {
        label: 'Кликер',
        command: () => {
            router.push('/mine');
        }
    },
    {
        label: 'Магазин',
        command: () => {
            router.push('/shop');
        }
    },
    {
        label: 'Рейтинг',
        command: () => {
            router.push('/rating');
        }
    }
]);

// Вычисляемое свойство для проверки, следует ли показывать tabbar
const showTabbar = computed(() => {
    let state = route.name !== 'login' && route.name !== 'start';
    return state; // Скрываем tabbar на странице логина
});

</script>


<template>
  <van-config-provider theme="dark">...</van-config-provider>

  <div class="container">
    <div id="content"><router-view /></div>

    <div id="footer">
      
      <van-tabbar v-show="showTabbar" v-model="active" active-color="#FF7618">
        <van-tabbar-item icon="home-o" to="/home">Главная</van-tabbar-item>
        <van-tabbar-item icon="search" to="/mine">Кликер</van-tabbar-item>
        <van-tabbar-item icon="search" to="/shop">Магазин</van-tabbar-item>
        <van-tabbar-item icon="search" to="/rating">Рейтинг</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>


<style scoped>
.container {
  
  width: 100%;
  height: 100%;
}
.content {
  z-index: 0;
  height: 100vh;
}
:root {
  --van-tabbar-height: 100;
}


</style>
