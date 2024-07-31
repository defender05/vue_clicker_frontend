import { createStore } from 'vuex';
import axios from "axios";

const store = createStore({

  state: {
    UserData: Object,
    CountriesData: [],
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
    setCapacity(state, data) {
      state.capacity = data;
    },
    setBalance(state, data) {
      state.gdp_balance = data;
    },
    increaseBalance(state, data) {
      state.gdp_balance += data;
    },
    setEnergy(state, data) {
      state.energy = data;
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
        const { data } = await axios.post('countries/list', {params: payload});
        // console.log(data);
        commit('setCountriesData', Array.from(data));
      } catch (error) { console.error(error); }
    },

  },
  
  getters: {
    getUserData: state => state.UserData,
    getCountriesData: state => state.CountriesData,
    getCapacity: state => state.capacity,
    getBalance: state => state.gdp_balance,
    getEnergy: state => state.energy,
  }
});

export default store;