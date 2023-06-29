<template>
  <ContentBoard>
    <template #title>{{ formTitle }}</template>
    <template #contents>
      <v-form ref="formElement" @submit.prevent="onSubmit" class="todo-form">
        <v-row>
          <v-text-field
            variant="underlined"
            :label="titleLabel"
            @input="$emit('update:todoTitle', $event.target.value)"
            :model-value="todoTitle"
            :rules="titleRules"
            ref="titleElement"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            variant="underlined"
            :label="limitedAtLabel"
            type="date"
            class="date-text-field"
            @input="$emit('update:limitedAt', $event.target.value)"
            :model-value="limitedAt"
            :rules="limitedAtRules"
            ref="limitedAtElement"
          />
        </v-row>
        <v-row>
          <v-textarea
            variant="outlined"
            :label="memoLabel"
            name="memo"
            @input="$emit('update:memo', $event.target.value)"
            :model-value="memo"
            :rules="memoRules"
          />
        </v-row>
        <v-row justify="center" class="btn-wrapper">
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
import { useValidation } from '../../composables/validation';

const props = defineProps({
  todoTitle: {
    type: String,
    required: true
  },
  limitedAt: {
    type: String,
    required: true
  },
  memo: {
    type: String,
    required: true
  },
  formTitle: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  isAutoFocus: Boolean
});
const emits = defineEmits(['update:todoTitle', 'update:limitedAt', 'update:memo', 'submit']);

const titleLabel = 'タイトル';
const limitedAtLabel = '期限';
const memoLabel = 'メモ';

// バリデーションルール設定
const { generateStringRules, generateDateRules, generateMemoRules, isFormValid } = useValidation();
const titleMaxChars = 20;
const titleRules = generateStringRules(titleLabel, titleMaxChars, true);

const limitedAtElement = ref(null)
const limitedAtRules = generateDateRules(limitedAtElement);

const memoMaxChars = 500;
const memoRules = generateMemoRules(memoMaxChars);

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
  if (! await isFormValid(formElement)) {
    return;
  }
  
  emits('submit');
  await autoFocus;
};

//ライフサイクルフック
onMounted(() => autoFocus);
</script>

<style lang="scss" scoped>
.btn-wrapper {
  .v-btn {
    margin-right: 16px;
  }
}

.date-text-field {
  max-width: 200px;
}

.todo-form {
  .v-row {
    margin-bottom: -4px;
  }
}
</style>
