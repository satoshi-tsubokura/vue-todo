import { defineStore } from 'pinia';
import { ref, toRaw, toValue } from 'vue';
import { subMilliseconds } from 'date-fns';
import { TodoEntity } from '../entity/TodoEntity';

export const useTodoList = defineStore('todoList', () => {
  const list = ref([]);

  let newestId = 1;

  function createTask(title, limitedStr = '', memo = '') {
    const limitedAt = limitedStr === '' ? null : subMilliseconds(new Date(toValue(limitedStr)), 1);
    const now = new Date();
    newestId++;

    const todo = new TodoEntity(
      newestId,
      toValue(title),
      limitedAt,
      toValue(memo),
      false,
      now,
      now
    );
    list.value.push(todo);
  }

  return { list, createTask };
});
