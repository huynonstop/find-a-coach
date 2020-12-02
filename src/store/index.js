import { createStore } from 'vuex';
import coachesModule from './coaches';
import requestsModule from './requests';
export default createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
  state() {
    return {
      userId: 'c3',
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
  mutations: {},
  actions: {},
});
