import { defineStore } from 'pinia';
export interface UserState {
  userId: string | null;
  token: string | null;
  timeout: number | null;
}
export interface UserInfo {
  userId: string | null;
  token: string | null;
  expiresAt?: number | null;
}
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: null,
    token: null,
    timeout: null,
  }),
  getters: {
    isAuth: (state) => state.userId && state.token,
    isReady: (state) => !state.userId && !state.token,
    isCoach: (state) => (coaches: { id: string }[]) =>
      coaches.some((coach) => coach.id === state.userId),
    isUser: (state) => (id: string) => id === state.userId,
  },
  actions: {
    setUser({ token, userId }: UserInfo) {
      this.token = token;
      this.userId = userId;
    },
    logout() {
      this.setUser({ token: null, userId: null });
      localStorage.removeItem('user');
      this.clearAuthTimeout();
    },
    setAuthTimeout(id: number) {
      this.timeout = id;
    },
    clearAuthTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = null;
    },
  },
});

export default useUserStore;
