const API_KEY = import.meta.env.VITE_FIREBASE_KEY || 'AIzaSyAMPWqntK3t_S4gxyeYxyuYo1E75CpiUNs';
const DATABASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://find-coach-vuejs.firebaseio.com/';
export enum AUTH_MODE {
  LOGIN = 'signInWithPassword',
  SIGNUP = 'signUp',
  LOOKUP = 'lookup',
}
const FIREBASE_CONFIG = {
  DATABASE_URL,
  API_KEY,
  authGoogleAPI: (mode: AUTH_MODE) =>
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
};
export default FIREBASE_CONFIG;
