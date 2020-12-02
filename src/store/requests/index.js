export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequests(state, payload) {
      state.requests.push(payload);
    },
  },
  actions: {
    contactCoach(context, payload) {
      const newRequest = {
        id: new Date().toISOString(),
        ...payload,
      };
      context.commit('addRequests', newRequest);
    },
  },
  getters: {
    requests(state, getters, rootState, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(state, getters) {
      return getters.requests.length;
    },
  },
};
