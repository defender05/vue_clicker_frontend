<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const user_name = ref('');
const user_avatar = ref('');
const user_balance = ref(0);
const user_capacity = ref(0);


onMounted(async () => {
    await store.dispatch('fetchUser', { tg_id: "1347962579" }); // ВРЕМЕННО - УДАЛИТЬ
    let user = await store.getters.getUserData;
    console.log('User image_url:', user.country.image_url);

    user_name.value = `${user.first_name} ${user.last_name}`; 
    user_avatar.value = user.country.image_url;
    user_balance.value = user.game_balance;
    user_capacity.value = user.total_capacity;
    
    // console.log("UserData", JSON.stringify(user));
    
});

</script>

<template>
    <div class="home_content">

        <div class="user_info flex_row">
            <!-- <van-image
                :src="user_avatar"
                class="avatar_image"
            /> -->
            <div class="image_container">
                <img v-if="user_avatar" :src="user_avatar" class="avatar_image">
                <van-skeleton v-else title avatar :row="0" />
            </div>
   
            <span class="user_name">{{ user_name }}</span>
            <img src="../assets/user_edit.svg" class="user_edit_image">
        </div>

        <div class="main_info flex_row">
            <div class="flex_col" style="width: 100%;">
                <div class="balance_row flex_row">
                    <span class="user_game_balance">{{ user_balance.toLocaleString() }}</span>
                    <img src="../assets/coin.svg" class="balance_coin_image">
                </div>

                <!-- <div class="flex_row">
                    <span class="balance_text">Баланс</span>
                </div> -->

                <div class="stat_row flex_row">
                    <div class="stat_box flex-col">
                        <div class="flex_row">
                            <span v-if="user_capacity < 10000" class="stat_box_number">{{ user_capacity }}</span>
                            <span v-else class="stat_box_number">{{ user_capacity / 1000 }}k</span>
                            <span class="stat_box_unit">т/ч</span>
                        </div>
                        <div class="stat_box_title">Производительность</div>
                    </div>
                    <div class="stat_box flex-col">
                        <div><span class="stat_box_number">{{ 12000 }}+</span></div>
                        <div class="stat_box_title">Место в рейтинге</div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>
.home_content {
    display: flex;
    flex-direction: column;
    padding: 0% 5%;
    gap: 20px;
}

/* СТРОКА - Имя и ватарка юзера */
.user_info {
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.user_name {
    font-size: 1.5em;
    font-weight: 400;
    color:rgb(255, 255, 255);
    margin-right: auto;
}
.image_container {
    width: 50px; /* Устанавливаем нужную ширину контейнера */
    height: 50px; /* Устанавливаем нужную высоту контейнера */
    overflow: visible; /* Скрываем часть изображения, выходящую за пределы контейнера */
    margin: 0px 15px;
}
.avatar_image {
    width: 100px;
    height: auto; 
    object-fit: contain; /* Сохраняем пропорции изображения */
    object-position: center; /* Центрируем изображение в контейнере */
    transform-origin: center;
    transform: translate(-25px, -22px);
}
.user_edit_image {
    width: 35px;
    height: 35px;
    margin-right: 30px;
}

/* СТРОКА - Баланс, место в рейтинге и производительность */
.main_info {
    background-color: #0C0C0C;
    border: 1px solid #1F1F1F;
    border-radius: 20px;
    padding: 20px;
}
.balance_row {
    align-items: center;
    /* justify-content: space-between; */
}
.user_game_balance {
    font-size: 2em;
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
    width: 25px;
    height: 25px;
}
.stat_row {
    margin-top: 10px;
    justify-content: space-between;
    gap: 15px;
}
.stat_box {
    width: 100%;
    background-color: #0C0C0C;
    border: 1.5px solid #1f1f1f7a;
    border-radius: 8px;
    padding: 10px;
    text-align: justify;
}
.stat_box_title {
    font-size: 90%;
    color: #6B6B6B;
}
.stat_box_number {
    font-size: 1.5em;
    font-weight: 500;
    color: #ffffff;
    margin-right: 5px;
}
.stat_box_unit {
    font-size: 1.5em;
    color: #FF7618;
}
</style>