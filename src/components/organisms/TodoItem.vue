<template>
  <v-list-item :border="true" class="todo-item" density="comfortable" :class="{'is-done': todo.isDone}" @click="isOpenDialog = true">
    <span class="todo-item__title">
      {{ todo.title }}
    </span>
    <span class="todo-item__memo">
      {{ useStringSlice(todo.memo, 50) }}
    </span>
    <span class="todo-item__date" v-if="todo.limitedAt">期限: {{ format(todo.limitedAt, 'yyyy/MM/dd') }}</span>
    <template #append>
      <v-btn :icon="mdiCheckBold" :border="! todo.isDone" class="todo-item__icon todo-item__icon--check" size="x-small" @click.stop="checkBtnClickHandler" :color="todo.isDone ? 'light-blue-accent-3' : ''">
      </v-btn>
      <v-btn :icon="mdiTrashCanOutline" class="todo-item__icon" :elevation="3" color="red-accent-2" size="x-small" @click.stop="deleteTodo(todo.id)">
      </v-btn>
    </template>
    <v-dialog v-model="isOpenDialog" width="70%" max-width="800px" class="todo-edit">
      <EditForm :todo="todo" @close-dialog="isOpenDialog = false"></EditForm>
    </v-dialog>
  </v-list-item>
</template>

<script setup>
import { mdiCheckBold, mdiTrashCanOutline } from '@mdi/js';
import { format } from 'date-fns';
import { useTodoList } from '@/stores/todoList'
import EditForm from './EditForm.vue';
import { ref } from 'vue';
import { useStringSlice } from '../../composables/stringSlice';

defineProps(['todo']);
const emits = defineEmits(['toggleIsDone'])

const { deleteTodo } = useTodoList();

function checkBtnClickHandler() {
  emits('toggleIsDone');
}

const isOpenDialog = ref(false);
</script>

<style lang="scss" scoped>
@use '../../assets/variables';
@use "sass:map";
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
  
  &__memo {
    display: block;
    font-size: 14px;
    color: variables.$light-grey-text-color;
  }

  &.is-done {
    border-color: lighten(variables.$default-border-color, 50%);
    .todo-item__title {
      color: lighten(variables.$default-text-color, 50%);
      text-decoration: line-through
    }
    .todo-item__date, .todo-item__memo {
      color: lighten(variables.$light-grey-text-color, 20%);
    }
  }
}
</style>