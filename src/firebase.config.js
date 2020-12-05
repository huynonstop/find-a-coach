const API_KEY = 'AIzaSyAMPWqntK3t_S4gxyeYxyuYo1E75CpiUNs';
export default {
  databaseURL: 'https://find-coach-vuejs.firebaseio.com',
  API_KEY,
  googleAPI: (mode = 'signUp') =>
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
};
