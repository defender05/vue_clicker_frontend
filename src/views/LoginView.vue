<style scoped>
.login_content {
    width: 100%;
}
.p-select {
    width: 95%;
    margin: 0px;
    padding: 10px 0px;

    color: #fff;
    background-color: #151515;
    border: 1px solid #1F1F1F;
    border-radius: 10px;
}
.p-select:hover {
    border: 1px solid #1F1F1F!important;
}
.p-select:focus {
    border: 1px solid #FFFFFF!important;
}

/* .p-select-list-option, .p-select-list */
</style>

<template>
    <div class="login_content">
        <!-- <Select v-model="selectedCountry" :options="prime_countries" optionLabel="name" placeholder="Выбери страну" style="country_select">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                    <img :src="slotProps.value.image_url"  style="width: 35px" />
                    <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex items-center">
                    <img :src="slotProps.option.image_url"  style="width: 35px" />
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Select> -->
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="result"
                    is-link
                    readonly
                    name="country"
                    label="Страна"
                    placeholder="Выбери страну"
                    @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-action-sheet
                        v-model:show="showPicker"
                        :actions="columns" 
                        @select="onSelect"
                     />
                    <!-- <van-picker
                        title="Список стран"
                        :columns="columns"
                        @confirm="onConfirm"
                        @change="onChange"
                    /> -->
                </van-popup>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                Войти
                </van-button>
            </div>
        </van-form>

        
    </div>

</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { showToast } from 'vant';
// import Select from 'primevue/select';

const router = useRouter();
const store = useStore();

const selectedCountry = ref();
const prime_countries = ref([]);
//     { name: 'Australia', code: 'AU' },
//     { name: 'Brazil', code: 'BR' },
//     { name: 'China', code: 'CN' },
//     { name: 'Egypt', code: 'EG' },
//     { name: 'France', code: 'FR' },
//     { name: 'Germany', code: 'DE' },
//     { name: 'India', code: 'IN' },
//     { name: 'Japan', code: 'JP' },
//     { name: 'Spain', code: 'ES' },
//     { name: 'United States', code: 'US' }
// ]);

let user = null;
let countries = [];
let columns = [];

onBeforeMount(async () => {
    await store.dispatch('fetchCountries',
        { offset: 0, limit: 100 }
    );
    countries = await store.getters.getCountriesData;
    console.log("Countries", countries);

    for (let item of countries) {
        prime_countries.value.push({
            name: item.name,
            value: item.name,
            image_url: item.image_url
        });
        columns.push({
            name: item.name,
            icon: item.image_url
        });
        // columns.push({
        //     text: item.name,
        //     value: item.name,
        //     icon: item.image_url
        // });
    }
    console.log("Columns", columns);

   
});



const result = ref('');
const showPicker = ref(false);

const onSelect = (item) => {
    result.value = item.name;
    showToast(item.name);
    showPicker.value = false;
};

const onSubmit = () => {
    router.push('/home');
};

// const onConfirm = ({ selectedOptions }) => {
//     result.value = selectedOptions[0]?.text;
//     showPicker.value = false;
    
// };

// const onChange = ({ selectedValues }) => {
//     showToast(`Value: ${selectedValues.join(',')}`);
// };


</script>

