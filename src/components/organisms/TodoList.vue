<template>
  <v-list  select-strategy="classic" class="todo-list" ref="todoListRef">
    <!-- <v-fade-transition :group="true"> -->
      <TodoItem v-for="item in todoList" :key="item.id" :todo="item" @toggle-is-done="toggleIsDone(item)"></TodoItem>
    <!-- </v-fade-transition> -->
  </v-list>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TodoItem from './TodoItem.vue';
import { useSearchStates } from '../../stores/searchStates';

defineProps(['todoList']);
const { changeQueryStates, queryStates } = useSearchStates();

const todoListRef = ref(null);

onMounted(() => {
  // スクロールしたら新たにtodoListを取得する
  const todoListElement = todoListRef.value.$el;
  todoListElement.addEventListener('scroll', (ev) => {

  // chromeでなぜか1以下にならない。Math.ceilで小数点切り上げ
  const isScrollBottom = Math.abs(ev.target.scrollHeight - ev.target.clientHeight - Math.ceil(ev.target.scrollTop)) <= 1;

    if (isScrollBottom) {
      changeQueryStates({ page: queryStates.page + 1 })
    }
  })
});

function toggleIsDone(todo) {
  todo.isDone = !todo.isDone;
}
</script>

<style lang="scss" scoped>
@use '../../assets/scss/variables' as *;

.todo-list {
  padding: 10px;
  overflow-y: scroll;
  height: 840px;

  @media all and (max-width: $sm-bp) {
    // 画面の高さ - ヘッダーの高さ - タブの高さ - containerのpadding
    height: calc(100vh - $sm-header-height - $todolist-tab-height - 32px)
  }
}
</style>
