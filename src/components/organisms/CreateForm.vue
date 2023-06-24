<template>
  <TodoForm
    v-model:title="title"
    v-model:limited-at="limitedAt"
    v-model:memo="memo"
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
const limitedAt = ref('');
const memo = ref('');

const { createTodo } = useTodoList();
const onSubmit = () => {
  createTodo({ title, limitedAt, memo });
  title.value = '';
  limitedAt.value = '';
  memo.value = '';
};
</script>

<style lang="scss" scoped>
.v-row {
  margin: 0;
}
</style>
