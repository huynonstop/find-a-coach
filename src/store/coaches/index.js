import firebase from '@/firebase.config.js';
const { databaseURL } = firebase;
export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
      fetchTimestamp: null,
    };
  },
  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      state.fetchTimestamp = new Date().getTime();
    },
  },
  actions: {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId;
      const coachData = {
        ...data,
      };
      const response = await fetch(`${databaseURL}/coaches/${userId}.json`, {
        method: 'PUT',
        body: JSON.stringify(coachData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed');
        throw error;
      }
      context.commit('addCoach', {
        ...coachData,
        id: userId,
      });
    },
    async loadCoaches(context, { forceRefresh }) {
      if (!forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await fetch(`${databaseURL}/coaches.json`);
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed');
        throw error;
      }
      const arrayCoaches = [];
      for (const key in responseData) {
        const {
          firstName,
          lastName,
          description,
          hourlyRate,
          areas,
        } = responseData[key];
        const coach = {
          id: key,
          firstName,
          lastName,
          description,
          hourlyRate,
          areas,
        };
        arrayCoaches.push(coach);
      }
      context.commit('setCoaches', arrayCoaches);
      context.commit('setFetchTimestamp');
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches.length > 0;
    },
    isCoach(state, getters, rootState, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.fetchTimestamp;
      if (!lastFetch) {
        return true;
      }
      const current = new Date().getTime();
      return current - lastFetch > 60 * 1000;
    },
  },
};
