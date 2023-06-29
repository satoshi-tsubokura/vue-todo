import { defineStore } from 'pinia';
import { ref, toValue } from 'vue';

export const useSearchStates = defineStore('searchStates', () => {
  const orderOptions = [
    {
      no: 0,
      text: '更新日新しい順',
      sortFn: (todoA, todoB) => todoA.updatedAt.getTime() - todoB.updatedAt.getTime()
    },
    {
      no: 1,
      text: '更新日古い順',
      sortFn: (todoA, todoB) => todoB.updatedAt.getTime() - todoA.updatedAt.getTime()
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
    order: orderOptions[0]
  });

  function changeQueryStates({ word, limitedStrFrom, limitedStrTo, order }) {
    queryStates.value.word = toValue(word);
    queryStates.value.limitedStrFrom = toValue(limitedStrFrom);
    queryStates.value.limitedStrTo = toValue(limitedStrTo);
    queryStates.value.order =
      orderOptions.find((option) => option.no === order.no) ?? queryStates.value.order;
  }

  return { orderOptions, queryStates, changeQueryStates };
});
