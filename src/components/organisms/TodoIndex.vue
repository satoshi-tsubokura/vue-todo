<template>
  <ContentBoard class="todo-board">
    <template #title>Todo</template>
    <template #contents>
      <v-tabs class="todo-tabs" v-model="tab" grow hide-slider selected-class="v-tab-selected">
        <template v-for="({ tabText }, state) in todoStateGroups" :key="state">
          <v-tab :value="state" :border="true" rounded="0">{{ tabText }}</v-tab>
        </template>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item  v-for="({ todoList }, state) in todoStateGroups" :key="state" :value="state" reverse-transition="fade-transition" transition="fade-transition">
          <v-list :border="true" class="todo-list">
            <TodoItem v-for="item in todoList" :key="item.id" :todo="item" @toggle-is-done="toggleIsDone(item)"></TodoItem>
          </v-list>
        </v-window-item>
      </v-window>
    </template>
  </ContentBoard>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ContentBoard from '../molecules/ContentBoard.vue';
import { useTodoList } from '@/stores/todoList';
import TodoItem from './TodoItem.vue';
import { storeToRefs } from 'pinia';

const { list, isDoneList, notDoneList } = storeToRefs(useTodoList());

const todoStateGroups = reactive({
  all: {
    tabText: 'すべて',
    todoList: list,
  },
  notDone: {
    tabText: 'Todo',
    todoList: notDoneList,
  },
  isDone: {
    tabText: '完了',
    todoList: isDoneList,
  },
}) 

const tab = ref(null);

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

.todo-board {
  height: 100%;
}

.todo-list {
  border: variables.$default-border;
  border-top: none;
  padding: 10px;
  min-height: 100px;
}
</style>
