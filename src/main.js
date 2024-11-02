import { createApp } from 'vue'
import axios from 'axios';
import './style.css'
import App from './App.vue'

import router from './router';
import store from './store';

const app = createApp(App);

import vant from 'vant';
import { Locale } from 'vant';
import 'vant/lib/index.css';
import enUS from 'vant/es/locale/lang/en-US';

import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import Select from 'primevue/select';
// import "vue-select/dist/vue-select.css";

Locale.use('en-US', enUS);


axios.defaults.withCredentials = true;
<<<<<<< HEAD
axios.defaults.baseURL = 'https://dev.countryballsbot.ru/api/v1/';
// axios.defaults.baseURL = 'https://countryballsbot.ru/api/v1/'; 


app.use(store);
app.use(router);
app.use(vant);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});






// app.use(VueApexCharts);
// app.use(PrimeVue, {
//     pt: {
//         panel: {
//             style: { maxWidth: '1200px' }
//         }
//     }, 
//     ripple: true 
// });


app.mount("#app");

