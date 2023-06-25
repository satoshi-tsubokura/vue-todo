<template>
  <v-list-item :border="true" class="todo-item" density="comfortable">
    <span class="todo-item__title">
      {{ todo.title }}
    </span>
    <span class="todo-item__date" v-if="todo.limitedAt">期限: {{ format(todo.limitedAt, 'yyyy/MM/dd') }}</span>
    <template #append>
      <v-btn :icon="mdiCheckBold" :border="! todo.isDone" class="todo-item__icon todo-item__icon--check" size="x-small" @click="checkBtnClickHandler" :color="todo.isDone ? 'light-blue-accent-3' : ''">
      </v-btn>
      <v-btn :icon="mdiTrashCanOutline" class="todo-item__icon" :elevation="3" color="red-accent-2" size="x-small" @click="deleteTodo(todo.id)">
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup>
import { mdiCheckBold, mdiTrashCanOutline } from '@mdi/js';
import { format } from 'date-fns';
import {useTodoList} from '@/stores/todoList'

const props = defineProps(['todo']);
const emits = defineEmits(['toggleIsDone'])

const { deleteTodo } = useTodoList();

function checkBtnClickHandler() {
  emits('toggleIsDone');
}
</script>

<style lang="scss" scoped>
@use '../../assets/variables';
.todo-item {
  margin: 10px auto;
  border: variables.$default-border;
  padding: 10px 20px 15px;
  position: relative;

  &__icon {
    margin-left: 8px;

    &--check {
      color: #bdbdbd;
    }
  }

  &__title {
    display: block;
  }

  &__date {
    display: block;
    text-align: right;
    font-size: 12px;
    color: variables.$light-grey-text-color;
  }
}
</style>