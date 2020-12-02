import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  BaseCard,
  BaseBadge,
  BaseButton,
  BaseSpinner,
  BaseDialog,
} from './components/UI';
const app = createApp(App);
app.use(store);
app.use(router);
app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.mount('#app');
