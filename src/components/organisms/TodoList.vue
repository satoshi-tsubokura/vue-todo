<template>
  <v-list  select-strategy="classic" class="todo-list" :max-height="maxListHeight" ref="todoListRef">
    <v-fade-transition :group="true">
      <TodoItem v-for="item in todoList" :key="item.id" :todo="item" @toggle-is-done="toggleIsDone(item)"></TodoItem>
    </v-fade-transition>
  </v-list>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import TodoItem from './TodoItem.vue';
import { useSearchStates } from '../../stores/searchStates';

defineProps(['todoList', 'tabHeight']);
const { changeQueryStates, queryStates } = useSearchStates();

const todoListRef = ref(null);
const maxListHeight = ref(0);
onMounted(() => {
  //リストのmaxheightの設定
  // 左列の高さに合わせる
  maxListHeight.value = inject('leftColHeightRef').value;
  
  // スクロールしたら新たにtodoListを取得する
  const todoListElement = todoListRef.value.$el;
  todoListElement.addEventListener('scroll', (ev) => {
    const maxScrollTop = ev.target.scrollHeight - ev.target.clientHeight;

    // < 1にすると、下部に到達した判定にならない時がある。
    const isScrollBottom = maxScrollTop - ev.target.scrollTop < 1.2;

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
.todo-list {
  padding: 10px;
  min-height: 50px;
  overflow-y: scroll;
}
</style>
