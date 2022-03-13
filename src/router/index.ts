import FIREBASE_CONFIG, { AUTH_MODE } from '@/firebase.config';
import type { UserInfo } from '../store/user';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import useUserStore from '../store/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const tryAutoAuth = async (userStore: any, next: any): Promise<void> => {
  const userData = localStorage.getItem('user');
  if (!userData) {
    return;
  }
  try {
    const user: UserInfo = JSON.parse(userData);
    if (!user.token || !user.userId || !user.expiresAt) {
      return;
    }
    const { token, userId, expiresAt } = user;
    const expiresIn = expiresAt - new Date().getTime();
    if (expiresIn < 0) {
      throw new Error('Auto auth expired');
    }
    const res = await fetch(FIREBASE_CONFIG.authGoogleAPI(AUTH_MODE.LOOKUP), {
      method: 'POST',
      body: JSON.stringify({ idToken: token }),
    });
    const data = await res.json();
    if (!res.ok || userId !== data.users[0].localId) {
      throw new Error('Auto auth fail');
    }
    userStore.setUser({
      token,
      userId,
    });
    userStore.setAuthTimeout(
      setTimeout(() => {
        userStore.logout();
        next('/coaches');
      }, expiresIn)
    );
  } catch (error) {
    userStore.logout();
    return;
  }
};

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await tryAutoAuth(userStore, next);
  if (to.meta?.needAuth && !userStore.isAuth) {
    next('/auth');
  } else if (to.meta?.needUnAuth && userStore.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
