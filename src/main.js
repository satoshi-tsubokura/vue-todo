import './assets/base.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import { useTodoList } from './stores/todolist';

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

//検証用
const { createTodo } = useTodoList();

const testData = [
  {
    title: 'testtesttesttesttest',
    limitedStr: '2023-06-24',
    memo: 'memomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemomemo'
  },
  {
    title: 'テストテストテストテストテストテストテス'
  },
  {
    title: 'Todoリスト',
    limitedStr: '2023-07-01'
  },
  {
    title: 'ボタンの色を設定する。'
  },
  {
    title: 'ボタンの大きさを変える'
  },
  {
    title: '作業中と完了を表示させる。'
  }
];

testData.forEach((data) => {
  createTodo(data);
});
