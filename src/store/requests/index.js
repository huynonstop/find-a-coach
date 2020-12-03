import firebase from '@/firebase.config.js';
const { databaseURL } = firebase;
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
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactCoach(context, { coachId, ...payload }) {
      const userId = context.rootGetters.userId;
      const newRequest = {
        userId,
        ...payload,
      };
      const response = await fetch(`${databaseURL}/requests/${coachId}.json`, {
        method: 'POST',
        body: JSON.stringify(newRequest),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed');
        throw error;
      }
      newRequest.id = responseData.name;
      newRequest.coachId = coachId;
      context.commit('addRequests', newRequest);
    },
    async loadRequests(context) {
      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(
        `${databaseURL}/requests/${userId}.json?auth=${token}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed');
        throw error;
      }
      const requests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: userId,
          email: responseData[key].email,
          message: responseData[key].message,
          userId: responseData[key].userId,
        };
        requests.push(request);
      }
      context.commit('setRequests', requests);
    },
  },
  getters: {
    requests(state, getters, rootState, rootGetters) {
      const userId = rootGetters.userId;
      return state.requests.filter(req => req.coachId === userId);
    },
    hasRequests(state, getters) {
      return getters.requests.length;
    },
  },
};
