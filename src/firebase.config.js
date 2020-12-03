const API_KEY = process.env.VUE_APP_API_KEY;
export default {
  databaseURL: 'https://find-coach-vuejs.firebaseio.com',
  API_KEY,
  googleAPI: (mode = 'signUp') =>
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
};
