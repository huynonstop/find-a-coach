import coachesData from './mockData';
export default {
  namespaced: true,
  state() {
    return {
      coaches: coachesData,
    };
  },
  mutations: {},
  actions: {},
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches.length > 0;
    },
  },
};
