import { createStore } from 'vuex';
import firebase from '@/firebase.config.js';
const { googleAPI } = firebase;
import coachesModule from './coaches';
import requestsModule from './requests';
export default createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
  state() {
    return {
      token: null,
      tokenExpiresIn: null,
      userId: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuth(state) {
      return state.token && state.userId;
    },
  },
  mutations: {
    setUser(state, { token, userId, tokenExpiresIn }) {
      state.token = token;
      state.userId = userId;
      state.tokenExpiresIn = tokenExpiresIn;
    },
  },
  actions: {
    async login(context, { email, password }) {
      const response = await fetch(googleAPI('signInWithPassword'), {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || '');
        throw error;
      }
      console.log(responseData);
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiresIn: responseData.expiresIn,
      });
    },
    async signup(context, { email, password }) {
      const response = await fetch(googleAPI('signUp'), {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || '');
        throw error;
      }
    },
    logout(context) {
      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiresIn: null,
      });
    },
  },
});
