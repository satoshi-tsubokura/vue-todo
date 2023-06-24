<template>
  <TodoForm
    v-model:title="title"
    v-model:limited-date="limitedDate"
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
const limitedDate = ref('');
const memo = ref('');

const { createTask } = useTodoList();
const onSubmit = () => {
  createTask(title, limitedDate, memo);
  title.value = '';
  limitedDate.value = '';
  memo.value = '';
};
</script>

<style lang="scss" scoped>
.v-row {
  margin: 0;
}
</style>
