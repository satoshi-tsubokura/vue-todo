<template>
  <TodoForm
    v-model:todo-title="title"
    v-model:limited-at="limitedStr"
    v-model:memo="memo"
    form-title="タスク作成"
    button-text="作成"
    :is-auto-focus="true"
    @submit="onSubmit"
  >
  </TodoForm>
</template>

<script setup>
import { ref } from 'vue';
import TodoForm from './TodoForm.vue';
import { useTodoList } from '@/stores/todoList';

const title = ref('');
const limitedStr = ref('');
const memo = ref('');

const { createTodo } = useTodoList();
const onSubmit = () => {
  createTodo({ title, limitedStr, memo });
  title.value = '';
  limitedStr.value = '';
  memo.value = '';
};
</script>

<style lang="scss" scoped>
.v-row {
  margin: 0;
}
</style>
