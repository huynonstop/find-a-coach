import { createStore } from 'vuex';
import firebase from '@/firebase.config.js';
import router from '@/router';
const { googleAPI } = firebase;
import coachesModule from './coaches';
import requestsModule from './requests';

let logoutTimer = null;

export default createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
  state() {
    return {
      token: null,
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
    isReady(state) {
      return state.token !== null && state.userId !== null;
    },
  },
  mutations: {
    setUser(state, { token, userId }) {
      state.token = token;
      state.userId = userId;
    },
  },
  actions: {
    firstLoad(context) {
      context.commit('setUser', {
        token: '',
        userId: '',
      });
    },
    async login(context, { email, password }) {
      return context.dispatch('auth', {
        email,
        password,
        mode: 'login',
      });
    },
    async signup(context, { email, password }) {
      return context.dispatch('auth', {
        email,
        password,
        mode: 'signUp',
      });
    },
    async auth(context, { email, password, mode }) {
      let authURL = {
        login: 'signInWithPassword',
        signUp: 'signUp',
      };
      const response = await fetch(googleAPI(authURL[mode]), {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
      const { idToken, localId, expiresIn, message } = await response.json();
      if (!response.ok) {
        const error = new Error(message || '');
        throw error;
      }
      if (mode === 'login') {
        const expiresAt = new Date().getTime() + +expiresIn * 3600;
        localStorage.setItem(
          'user',
          JSON.stringify({
            idToken,
            localId,
            expiresAt,
          })
        );
        logoutTimer = setTimeout(() => {
          context.dispatch('logout');
          router.replace('/coaches');
        }, +expiresIn * 3600);
        context.commit('setUser', {
          token: idToken,
          userId: localId,
        });
      }
    },
    async tryAuth(context) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.idToken || !user.localId || !user.expiresAt) {
        return;
      }
      try {
        const { idToken, localId, expiresAt } = user;
        const expiresIn = expiresAt - new Date().getTime();
        if (expiresIn < 0) {
          throw new Error('Auto auth fail');
        }
        const response = await fetch(googleAPI('lookup'), {
          method: 'POST',
          body: JSON.stringify({ idToken }),
        });
        const responseData = await response.json();
        if (!response.ok || localId !== responseData.users[0].localId) {
          throw new Error('Auto auth fail');
        }
        context.commit('setUser', {
          token: idToken,
          userId: localId,
        });
        logoutTimer = setTimeout(() => {
          context.dispatch('logout');
          router.replace('/coaches');
        }, expiresIn);
      } catch (error) {
        return;
      }
    },
    logout(context) {
      localStorage.removeItem('user');
      clearTimeout(logoutTimer);
      context.commit('setUser', {
        token: '',
        userId: '',
      });
    },
  },
});
