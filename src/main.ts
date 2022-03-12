import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import BaseHeader from './components/BaseHeader.vue';
import BaseButton from './components/BaseButton.vue';
import BaseCard from './components/BaseCard.vue';
import BaseSpinner from './components/BaseSpinner.vue';
import BaseDialog from './components/BaseDialog.vue';

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.component('BaseHeader', BaseHeader);
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseDialog', BaseDialog);
app.mount('#app');
