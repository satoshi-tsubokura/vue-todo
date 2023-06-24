<template>
  <ContentBoard>
    <template #title>タスク作成</template>
    <template #contents>
      <v-form ref="formElement" @submit.prevent="onSubmit">
        <v-row>
          <v-text-field
            variant="underlined"
            label="タイトル"
            @input="$emit('update:title', $event.target.value)"
            :model-value="title"
            :rules="titleRules"
            ref="titleElement"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            variant="underlined"
            label="期限"
            type="date"
            class="date-text-field"
            @input="$emit('update:limitedDate', $event.target.value)"
            :model-value="limitedDate"
            :rules="limitedDateRules"
            ref="limitedDateElement"
          />
        </v-row>
        <v-row>
          <v-textarea
            variant="outlined"
            label="メモ"
            name="memo"
            @input="$emit('update:memo', $event.target.value)"
            :model-value="memo"
            :rules="memoRules"
          />
        </v-row>
        <v-row justify="center">
          <SubmitButton :text="buttonText"></SubmitButton>
          <slot name="buttons"></slot>
        </v-row>
      </v-form>
    </template>
  </ContentBoard>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ContentBoard from '../molecules/ContentBoard.vue';
import SubmitButton from '../molecules/SubmitButton.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  limitedDate: {
    type: String,
    required: true
  },
  memo: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  isAutoFocus: Boolean
});
const emits = defineEmits(['update:title', 'update:limitedDate', 'update:memo', 'submit']);

// バリデーションルール設定
const titleMaxChars = 20;
const titleRules = [
  (val) => !!val || 'タイトルは入力必須です。',
  (val) => val.length <= titleMaxChars || `${titleMaxChars}文字以内で入力してください。`
];

  // HTML5標準のバリデーション機能を利用するため、DOMを参照する。
const limitedDateElement = ref(null);
const limitedDateRules = [
  async () =>
    (await !limitedDateElement.value.validity.badInput) || '正しい年月日を入力してください。'
];

const memoMaxChars = 500;
const memoRules = [
  (val) => val.length <= memoMaxChars || `${memoMaxChars}文字以内で入力してください。`
];

// オートフォーカス処理
const titleElement = ref(null);
const autoFocus = async () => {
  if (props.isAutoFocus) {
    await titleElement.value.focus();
  }
};

// submit処理
const formElement = ref(null);
const onSubmit = async () => {
  const { valid } = await formElement.value.validate();
  if (!valid) {
    return;
  }
  
  emits('submit');
  await autoFocus;
};

//ライフサイクルフック
onMounted(() => autoFocus);
</script>

<style lang="scss" scoped>
.v-row {
  margin: 0;
  margin-bottom: 10px;
}

.date-text-field {
  max-width: 300px;
}
</style>
