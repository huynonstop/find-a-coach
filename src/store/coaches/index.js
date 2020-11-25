import coachesData from './mockData';
export default {
  namespaced: true,
  state() {
    return {
      coaches: coachesData,
      isCoach: false,
    };
  },
  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoach(state, payload) {
      state.isCoach = payload;
    },
  },
  actions: {
    addCoach(context, data) {
      const userId = context.rootGetters.userId;
      const coachData = {
        id: userId,
        ...data,
      };
      context.commit('addCoach', coachData);
      context.commit('setCoach', true);
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches.length > 0;
    },
    // isCoach(state, getters, rootState, rootGetters) {
    //   const coaches = getters.coaches;
    //   const userId = rootGetters.userId;
    //   return coaches.some(coach => coach.id === userId);
    // },
    isCoach(state) {
      return state.isCoach;
    },
  },
};
