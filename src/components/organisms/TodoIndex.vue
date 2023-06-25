<template>
  <ContentBoard>
    <template #title>Todo</template>
    <template #contents>
      <v-card>
        <v-tabs class="todo-tabs" v-model="tab" grow hide-slider selected-class="v-tab-selected">
          <v-tab value="all" :border="true" rounded="0">すべて</v-tab>
          <v-tab value="todo" :border="true" rounded="0">作業中</v-tab>
          <v-tab value="isDone" :border="true" rounded="0">完了</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-list :border="true" class="todo-list">
            <TodoItem v-for="item in list" :key="item.id" :todo="item" @toggle-is-done="toggleIsDone(item)"></TodoItem>
          </v-list>
        </v-window>
      </v-card>
    </template>
  </ContentBoard>
</template>

<script setup>
import { ref } from 'vue';
import ContentBoard from '../molecules/ContentBoard.vue';
import { useTodoList } from '@/stores/todoList';
import TodoItem from '../molecules/TodoItem.vue';

const tab = ref('all');

const { list } = useTodoList();

function toggleIsDone(todo) {
  todo.isDone = !todo.isDone;
}
</script>

<style lang="scss" scoped>
@use '../../assets/variables';

.v-tab-selected {
  color: #ffffff;
  background-color: #757575;
}

.v-btn--border {
  border: variables.$default-border;
  border-left: none;
  border-bottom: none;
  
  &:first-child {
    border-left: variables.$default-border;
  }
}

.todo-list {
  border: variables.$default-border;
  border-top: none;
  padding: 10px;
}
</style>
