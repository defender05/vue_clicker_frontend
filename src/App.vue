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
      
      <van-tabbar v-show="showTabbar" v-model="active" class="menu_bar">
    
        <van-tabbar-item to="/home" class="menu_bar_item">
          <div class="flex_col">
            <div><img src="./assets/home.svg" alt="" class="menu_item_img"></div>
            <div class="menu_item_text">Главная</div>
          </div>
        </van-tabbar-item>

        <van-tabbar-item to="/mine" class="menu_bar_item">
          <div class="flex_col">
            <div><img src="./assets/clicker.svg" alt="" class="menu_item_img"></div>
            <div class="menu_item_text">Кликер</div>
          </div>
        </van-tabbar-item>

        <van-tabbar-item to="/shop" class="menu_bar_item">
          <div class="flex_col">
            <div><img src="./assets/shop.svg" alt="" class="menu_item_img"></div>
            <div class="menu_item_text">Магазин</div>
          </div>
        </van-tabbar-item>

        <van-tabbar-item to="/rating" class="menu_bar_item">
          <div class="flex_col">
            <div><img src="./assets/rating.svg" alt="" class="menu_item_img"></div>
            <div class="menu_item_text">Рейтинг</div>
          </div>
        </van-tabbar-item>
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
  color: #ffffff;
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
  color:#FF7618;
}


</style>
