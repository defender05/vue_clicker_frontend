import { createStore } from 'vuex';
import axios from "axios";

const store = createStore({

  state: {
    UserData: Object,
    CountriesData: [],
    EnterprisesData: [],
    country_image_url: '',
    capacity: 0,
    gdp_balance: 0,
    energy: 0,
  },

  mutations: {
    setUserData(state, data) {
      state.UserData = data;
    },
    setCountriesData(state, data) {
      state.CountriesData = data;
    },
    setEnterprisesData(state, data) {
      state.EnterprisesData = data;
    },
    setEnterprisesData(state, data) {
      state.EnterprisesData = data;
    },
    setCountryImageUrl(state, data) {
      state.country_image_url = data;
    },
    setCapacity(state, data) {
      state.capacity = data;
    },
    setBalance(state, data) {
      state.gdp_balance = data;
    },
    increaseBalance(state) {
      if (state.energy > 0) {
        state.gdp_balance = state.gdp_balance + (state.capacity * 2);
      }
    },
    setEnergy(state, data) {
      state.energy = data;
    },
    decreaseEnergy(state, data) {
      if (state.energy > 0 && state.energy > data) {
        state.energy -= data;
      } else {
        state.energy = 0;
      }
    },
  },

  actions: {

    async fetchUser({ commit }, payload) {
      try {
        const { data } = await axios.get(`user/get/tg/${payload.tg_id}`);
        console.log(data);
        commit('setUserData', data);
      } catch (error) { console.error(error); }
    },

    async fetchCountries({ commit }, payload) {
      try {
        const { data } = await axios.get('countries/list', {params: payload});
        // console.log(data);
        commit('setCountriesData', Array.from(data));
      } catch (error) { console.error(error); }
    },

    async fetchEnterprises({ commit }, payload) {
      try {
        const { data } = await axios.get(`enterprises/listByUser/${payload.tg_id}`);
        // console.log(data);
        commit('setEnterprisesData', Array.from(data));
      } catch (error) { console.error(error); }
    },

    async fetchUpdateGameBalance({ commit }, payload) {
      try {
        const { data } = await axios.patch(`user/updateGameBalance?tg_id=${payload.tg_id}&current_tap_count=${payload.current_tap_count}`);
        console.log(`Updated balance: ${data.balance}`);
        commit('setBalance', data.balance);
      } catch (error) { console.error(error); }
    },

  },
  
  getters: {
    getUserData: state => state.UserData,
    getCountriesData: state => state.CountriesData,
    getEnterprisesData: state => state.EnterprisesData,
    getCountryImageUrl: state => state.country_image_url,
    getCapacity: state => state.capacity,
    getBalance: state => state.gdp_balance,
    getEnergy: state => state.energy,
  }
});

export default store;