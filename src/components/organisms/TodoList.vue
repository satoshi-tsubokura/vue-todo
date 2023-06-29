<template>
  <v-list  select-strategy="classic" class="todo-list" ref="todoListElement">
    <v-fade-transition :group="true">
      <TodoItem v-for="item in todoList" :key="item.id" :todo="item" @toggle-is-done="toggleIsDone(item)"></TodoItem>
    </v-fade-transition>
  </v-list>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps(['todoList', 'tabHeight']);

const todoListElement = ref(null);
onMounted(() => {
  const maxHeight = inject('leftColHeightRef').value;
  todoListElement.value.$el.style.maxHeight = `${maxHeight - props.tabHeight}px`;
})

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
