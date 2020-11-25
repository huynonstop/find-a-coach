import { createStore } from 'vuex';
import coachesModule from './coaches';

export default createStore({
  modules: {
    coaches: coachesModule,
  },
  state: {},
  mutations: {},
  actions: {},
});
