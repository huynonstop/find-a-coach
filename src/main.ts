import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import BaseHeader from './components/common/BaseHeader.vue';
import BaseButton from './components/common/BaseButton.vue';
import BaseCard from './components/common/BaseCard.vue';
import BaseSpinner from './components/common/BaseSpinner.vue';
import BaseDialog from './components/common/BaseDialog.vue';
import BaseBadge from './components/common/BaseBadge.vue';
import BaseInput from './components/BaseInput.vue';

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.component('BaseHeader', BaseHeader);
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseDialog', BaseDialog);
app.component('BaseBadge', BaseBadge);
app.component('BaseInput', BaseInput);

app.mount('#app');
