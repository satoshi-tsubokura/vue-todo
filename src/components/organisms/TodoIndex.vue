<template>
    <v-card ref="todoIndex" class="index">

      <v-tabs class="todo-tabs" v-model="tab" grow hide-slider selected-class="v-tab-selected" bg-color="#fff">
        <template v-for="({ tabText }, state) in todoStateGroups" :key="state">
          <v-tab :value="state" rounded="0" class="todo-tabs__item">{{ tabText }}</v-tab>
        </template>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item  v-for="({ list }, state) in todoStateGroups" :key="state" :value="state" reverse-transition="fade-transition" transition="fade-transition">
          <TodoList :todo-list="list"></TodoList>
        </v-window-item>
      </v-window>
    </v-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useTodoList } from '@/stores/todoList';
import TodoList from './TodoList.vue';
import { storeToRefs } from 'pinia';

const { searchedList, isDoneList, notDoneList } = storeToRefs(useTodoList());

const todoStateGroups = reactive({
  all: {
    tabText: 'すべて',
    list: searchedList,
  },
  notDone: {
    tabText: 'Todo',
    list: notDoneList,
  },
  isDone: {
    tabText: '完了',
    list: isDoneList,
  },
}) 

const tab = ref(null);
</script>

<style lang="scss" scoped>
@use '../../assets/scss/variables' as *;

.v-tab-selected {
  color: #ffffff;
  background-color: #757575;
}

.v-btn--border {
  border: $default-border;
  border-left: none;
  border-bottom: none;
  
  &:first-child {
    border-left: $default-border;
  }
}

.todo-tabs {
  &__item {
    height: $todolist-tab-height;
  }
}
</style>
