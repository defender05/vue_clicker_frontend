import { createStore } from 'vuex';
import axios from "axios";

const store = createStore({

  state: {
    UserData: Object,
    CountriesData: [],
    UserEnterprisesData: [],
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
    setUserEnterprisesData(state, data) {
      state.UserEnterprisesData = data;
    },
    setEnterprisesData(state, data) {
      state.EnterprisesData = data;
    },
    removeEntepriseWithSlot(state, data) {
      // Находим индекс объекта с нужным enterprise_id
      const index = state.UserEnterprisesData.findIndex(item => item.enterprise_id === data.enterprise_id);

      // Если объект найден, удаляем его из массива
      if (index !== -1) {
        state.UserEnterprisesData.splice(index, 1);
        console.log(`Removed enterprise with id ${data.enterprise_id}`);
      } else {
        console.log(`Enterprise with id ${data.enterprise_id} not found`);
      }
    },
    setCountryImageUrl(state, data) {
      state.country_image_url = data;
    },
    setCapacity(state, data) {
      state.capacity = data;
    },
    decreaseCapacity(state, value) {
      state.capacity -= value;
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

    async fetchUpdateGameBalance({ commit }, payload) {
      try {
        const { data } = await axios.patch(`user/updateGameBalance?tg_id=${payload.tg_id}&current_tap_count=${payload.current_tap_count}`);
        // console.log(`Updated balance: ${data.balance}`);
        commit('setBalance', data.balance);
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
        const { data } = await axios.get('enterprises/listByType', {params: payload});
        // console.log(data);
        commit('setEnterprisesData', Array.from(data));
      } catch (error) { console.error(error); }
    },

    async fetchUserEnterprises({ commit }, payload) {
      try {
        const { data } = await axios.get(`enterprises/listByUser/${payload.tg_id}`);
        // console.log(data);
        commit('setUserEnterprisesData', Array.from(data));
      } catch (error) { console.error(error); }
    },

    async fetchAddEnterpriseToSlot({ commit }, payload) {
      try {
        // enterprises/removeEnterpriseWithSlot?tg_id=${payload.tg_id}&enterprise_id=${payload.enterprise_id}
        const { data } = await axios.post(`enterprises/buy`, {params: payload});
        console.log(`Buing ent: ${data}`);
        commit('setBalance', data); // TODO: добавить сеттер
      } catch (error) { console.error(error); }
    },

    async fetchRemoveEnterpriseWithSlot({ commit }, payload) {
      try {
        const { data } = await axios.post(
          'enterprises/removeEnterpriseWithSlot',
           null,
            { params: payload }
          );
        console.log(`Removed ent: ${data}`);
        commit('removeEntepriseWithSlot', {
          tg_id: payload.tg_id,
          enterprise_id: payload.enterprise_id
        });
      } catch (error) { console.error(error); }
    },

  },
  
  getters: {
    getUserData: state => state.UserData,
    getCountriesData: state => state.CountriesData,
    getUserEnterprisesData: state => state.UserEnterprisesData,
    getCountryImageUrl: state => state.country_image_url,
    getCapacity: state => state.capacity,
    getBalance: state => state.gdp_balance,
    getEnergy: state => state.energy,
  }
});

export default store;