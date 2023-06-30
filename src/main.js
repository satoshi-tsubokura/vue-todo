import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/scss/base.scss';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
});
const app = createApp(App);

app.use(createPinia());
app.use(vuetify);

app.mount('#app');
