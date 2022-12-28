import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

import './assets/main.css';
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');
