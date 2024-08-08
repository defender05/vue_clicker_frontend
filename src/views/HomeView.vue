<template>
    <div class="home_content">

        <div class="user_info flex_row">
            <div class="avatar_image_container">
                <img v-if="user_avatar" :src="user_avatar" class="avatar_image">
                <van-skeleton v-else title avatar :row="0" />
            </div>
   
            <div class="name_container flex-col">
                <div class="user_username">@{{ user_username }}</div>
                <div v-if="user_full_name" class="user_name">{{ user_full_name }}</div>
                <div v-else class="user_name">Иван Иванов</div>
            </div>
 
            <img src="../assets/images/user_edit.svg" class="user_edit_image">
        </div>

        <div class="main_info flex_row">
            <div class="flex_col" style="width: 100%;">
                <div class="balance_row flex_row">
                    <span class="user_game_balance">{{ user_balance.toLocaleString() }}</span>
                    <img src="../assets/images/coin.svg" class="balance_coin_image">
                </div>

                <!-- <div class="flex_row">
                    <span class="balance_text">Баланс</span>
                </div> -->

                <div class="stat_row flex_row">
                    <div class="stat_box flex-col">
                        <div class="flex_row">
                            <span v-if="user_capacity < 10000" class="stat_box_number">{{ user_capacity }}</span>
                            <span v-else class="stat_box_number">{{ user_capacity / 1000 }}k</span>
                            <span class="stat_box_unit">т/с</span>
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

        <div class="slots_row flex_row">
            <div class="flex_col" style="width: 100%;">
                <div class="slots_title_row flex_row">
                    <span>Мои предприятия</span><span style="color: #2d2d2d">{{ user_enterprises.length }} / {{ user_enterprises_slots }}</span>
                </div>
                <!-- <van-divider class="divider" style="borderColor: #1F1F1F; margin: 0; padding: 15px 5px"/> -->
                <Slots :enterprises="user_enterprises" :enterprises_slots="user_enterprises_slots" @update:slotCount="updateSlotCount"/>
            </div>
            
        </div>

    </div>

</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import Slots from '../components/home/Slots.vue';

const store = useStore();
const user_username = ref('');
const user_full_name = ref('');
const user_avatar = ref('');
const user_balance = ref(0);
const user_capacity = ref(0);
const user_enterprises_slots = ref(0);
const user_enterprises = ref([]);

const slotCount = ref(0);

let first_name = '';
let last_name = '';


onBeforeMount(async () => {
    let user = await store.getters.getUserData;
    await store.dispatch('fetchUserEnterprises', { tg_id: user.tg_id });
    
    let enterprises = await store.getters.getUserEnterprisesData;

    first_name = user.first_name ? user.first_name : '';
    last_name = user.last_name ? user.last_name : '';

    user_username.value = user.username;
    user_full_name.value = `${first_name} ${last_name}`;
    user_avatar.value = user.country.image_url;

    let store_balance = store.getters.getBalance;
    let store_capacity = store.getters.getCapacity;

    user_balance.value = (store_balance !== 0) ? store_balance : user.game_balance;
    user_capacity.value = (store_capacity !== 0) ? store_capacity : user.total_capacity;
    user_enterprises_slots.value = user.enterprises_slots;
    user_enterprises.value = enterprises;
    console.log('enterprises slots:', user_enterprises_slots.value);

    // console.log("UserData", JSON.stringify(user));
    
});

// watchEffect(() => {
//     console.log('Данные предприятий обновлены:', newEnterprises);
// });

// Обновляем количество слотов
const updateSlotCount = (count) => {
    slotCount.value = count; 
};

</script>



<style scoped>
.home_content {
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    gap: 20px;
}

/* СТРОКА - Имя и ватарка юзера */
.user_info {
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.name_container {
    text-align: start;
    margin-right: auto;
}
.user_username {
    max-width: 200px;
    font-size: 0.8em;
    font-weight: 400;
    color:rgb(111, 111, 111);
    white-space: nowrap; /* Запрет на перенос текста */
    overflow: hidden; /* Скрыть переполняющийся текст */
    text-overflow: ellipsis; /* Добавить многоточие в конце */
}
.user_name {
    max-width: 200px;
    font-size: 1.5em;
    font-weight: 400;
    color:rgb(255, 255, 255);
    margin-right: auto;
    white-space: nowrap; /* Запрет на перенос текста */
    overflow: hidden; /* Скрыть переполняющийся текст */
    text-overflow: ellipsis; /* Добавить многоточие в конце */
    /* border: 1px solid #ccc;  Граница для видимости */
}
.avatar_image_container {
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
    font-family: ReadexPro;
    font-size: 2.5em;
    font-weight: 500;
    /* color: #FF7618; */
    margin: 0px 10px;
    background: -webkit-linear-gradient(#FF7618, #FF9900);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.balance_text {
    color: #5c5b5b;
    font-size: 1em;
    font-weight: 100;
}
.balance_coin_image {
    width: 30px;
    height: 30px;
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
    padding: 10px 15px;
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

.slots_row {
    background-color: #0C0C0C;
    border: 1px solid #1F1F1F;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 100px;
}

.slots_title_row {
    font-size: 1.2em;
    font-weight: 100;
    color: #ffffff;
    text-align: left;
    padding: 0px 5px 20px 5px;
    justify-content: space-between;
}
</style>