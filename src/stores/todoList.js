import { defineStore } from 'pinia';
import { computed, ref, toValue, watch } from 'vue';
import { isAfter, isBefore, isSameDay, isValid, subMilliseconds } from 'date-fns';
import { TodoEntity } from '../entity/TodoEntity';
import { useSearchStates } from './searchStates';

export const useTodoList = defineStore('todoList', () => {
  const list = ref([]);
  const { orderOptions, queryStates } = useSearchStates();

  const searchedList = computed(() => searchTodo(queryStates));
  const isDoneList = computed(() => searchedList.value.filter((item) => item.isDone));
  const notDoneList = computed(() => searchedList.value.filter((item) => !item.isDone));

  let newestTodoId = 1;

  function createTodo({ title, limitedStr = '', memo = '' }) {
    const limitedAt =
      toValue(limitedStr) === '' ? null : subMilliseconds(new Date(toValue(limitedStr)), 1);

    newestTodoId++;

    const todo = new TodoEntity(newestTodoId, toValue(title), limitedAt, toValue(memo), false);
    list.value.push(todo);
  }

  function deleteTodo(id) {
    const index = list.value.findIndex((item) => item.id === id);

    if (index !== -1) {
      list.value.splice(index, 1);
    }
  }

  function editTodo({ id, title, limitedStr = '', memo = '' }) {
    const todo = list.value.find((item) => item.id === id);

    todo.title = toValue(title);
    todo.limitedAt =
      toValue(limitedStr) === '' ? null : subMilliseconds(new Date(toValue(limitedStr)), 1);
    todo.memo = memo;
    todo.updatedAt = new Date();
  }

  function isMatchedSearchStates(todo, { word = '', limitedStrFrom = '', limitedStrTo = '' }) {
    // 文字列マッチ判定
    const wordMatched = todo.title.indexOf(word) !== -1 || todo.memo.indexOf(word) !== -1;

    //期限日判定
    let dateMatched;

    if (limitedStrFrom === '' && limitedStrTo === '') {
      dateMatched = true;
    } else {
      if (todo.limitedAt === null || isValid(limitedStrFrom) || isValid(limitedStrTo)) {
        dateMatched = false;
      } else {
        const limitedFrom = new Date(limitedStrFrom);
        const limitedTo = new Date(limitedStrTo);

        const isAfterFrom =
          limitedStrFrom === '' ||
          isAfter(todo.limitedAt, limitedFrom) ||
          isSameDay(todo.limitedAt, limitedFrom);

        const isBeforeTo =
          limitedStrTo === '' ||
          isBefore(todo.limitedAt, limitedTo) ||
          isSameDay(todo.limitedAt, limitedTo);

        dateMatched = isAfterFrom && isBeforeTo;
      }
    }

    return wordMatched && dateMatched;
  }

  function sortSearchedList(todoList, orderNo = orderOptions[0].no) {
    const sortFunction = orderOptions.find((option) => option.no === orderNo)?.sortFn;

    if (!sortFunction) {
      return todoList;
    }

    if (orderNo === orderOptions[2].no || orderNo === orderOptions[3].no) {
      const hasLimitedAtTodo = toValue(todoList)
        .filter((todo) => todo.limitedAt !== null)
        .sort(sortFunction);
      const noLimitedAtTodo = toValue(todoList)
        .filter((todo) => todo.limitedAt === null)
        .sort(orderOptions[0].sortFn);

      return [...hasLimitedAtTodo, ...noLimitedAtTodo];
    } else {
      return toValue(todoList).sort(sortFunction);
    }
  }

  function searchTodo({
    word = '',
    limitedStrFrom = '',
    limitedStrTo = '',
    order = orderOptions[0]
  }) {
    let searchedResults = list.value.filter((todo) =>
      isMatchedSearchStates(todo, { word, limitedStrFrom, limitedStrTo })
    );

    searchedResults = sortSearchedList(searchedResults, order);

    return searchedResults;
  }

  return {
    searchedList,
    isDoneList,
    notDoneList,
    createTodo,
    deleteTodo,
    editTodo
  };
});
