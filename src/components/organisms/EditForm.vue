<template>
  <TodoForm class="todo-edit-board" v-model:todo-title="title" v-model:limited-at="limitedStr" v-model:memo="memo" form-title="編集" button-text="保存" @submit="editHandler">
    <template #buttons>
      <v-btn variant="outlined" @click="$emit('closeDialog')" text="閉じる"></v-btn>
    </template>
  </TodoForm>
</template>

<script setup>
import { ref } from 'vue';
import TodoForm from './TodoForm.vue';
import { useTodoList } from '@/stores/todoList';
import { format } from 'date-fns';

const props = defineProps(['todo']);
const emits = defineEmits(['closeDialog']);

const { editTodo } = useTodoList();

const title = ref(props.todo.title);
const limitedStr = ref('');
if (props.todo.limitedAt) {
  limitedStr.value = format(props.todo.limitedAt, 'yyyy-MM-dd');
}


const memo = ref(props.todo.memo);

const editHandler = () => {
  editTodo({ id: props.todo.id, title, limitedStr, memo });
  emits('closeDialog');
}

</script>

<style lang="scss" scoped>
</style>