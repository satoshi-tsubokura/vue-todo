import { defineStore } from 'pinia';
import { ref, toValue } from 'vue';

export const useSearchStates = defineStore('searchStates', () => {
  const maxOnceFetchedNum = 15;
  const orderOptions = [
    {
      no: 0,
      text: '更新日新しい順',
      sortFn: (todoA, todoB) => todoB.updatedAt.getTime() - todoA.updatedAt.getTime()
    },
    {
      no: 1,
      text: '更新日古い順',
      sortFn: (todoA, todoB) => todoA.updatedAt.getTime() - todoB.updatedAt.getTime()
    },
    {
      no: 2,
      text: '期限日近い順',
      sortFn: (todoA, todoB) => todoA.limitedAt.getTime() - todoB.limitedAt.getTime()
    },
    {
      no: 3,
      text: '期限日遠い順',
      sortFn: (todoA, todoB) => todoB.limitedAt.getTime() - todoA.limitedAt.getTime()
    }
  ];

  const queryStates = ref({
    word: '',
    limitedStrFrom: '',
    limitedStrTo: '',
    order: orderOptions[0],
    page: 1
  });

  function changeQueryStates({ word, limitedStrFrom, limitedStrTo, order = {}, page = 1 }) {
    queryStates.value.word = toValue(word) ?? queryStates.value.word;
    queryStates.value.limitedStrFrom = toValue(limitedStrFrom) ?? queryStates.value.limitedStrFrom;
    queryStates.value.limitedStrTo = toValue(limitedStrTo) ?? queryStates.value.limitedStrTo;
    queryStates.value.order =
      orderOptions.find((option) => option.no === toValue(order).no) ?? queryStates.value.order;
    queryStates.value.page = toValue(page);
  }

  return { orderOptions, queryStates, maxOnceFetchedNum, changeQueryStates };
});
