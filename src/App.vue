<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import TabBar from './components/TabBar.vue';

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
            router.push('/clicker');
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
      <TabBar v-show="showTabbar"/>
    </div>
  </div>
</template>


<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
#content {
  /* z-index: 0; */
  height: 100%;
  background: radial-gradient(circle, #161515 0%, #000000 100%);
}
/* :root:root {
  --van-tabbar-height: 100px;
} */
.menu_bar {
  border: 0;
  background-color: #131212;
  height: 60px;
  
}
.menu_item_img {
  height: 25px;
  width: 25px;
  color: var(--svg-color, #868686);
  --svg-color: #868686;
}
.menu_item_text {
  color: #868686;
  margin-top: 3px;
  font-size: 1em;
  font-weight: 400;
}
.menu_bar_item {
  padding-bottom: 5px;
}
.menu_bar_item:focus {
  background-color: #000000;
}
.menu_bar_item:focus div{
  color:#FF7618;
}
.menu_bar_item:focus .menu_item_img{
  color:#FF7618;
  --svg-color: #FF7618;
}


</style>
