<template>
  <ContentBoard class="search-todo">
    <template #title>検索</template>
    <template #contents>
      <v-form @submit.prevent="onSubmit" ref="formElement">
        <v-row>
          <v-text-field variant="underlined" :label="searchWordLabel" :rules="searchWordRules" v-model.trim="searchWord"></v-text-field>
        </v-row>
        <v-row align="center">
          <v-label class="search-todo__label">期限: </v-label>
          <v-text-field
            variant="underlined"
            label="From"
            type="date"
            class="search-todo__date-field"
            ref="limitedAtFromElement"
            :rules="limitedAtFromRules"
            :max="limitedStrTo"
            v-model.trim="limitedStrFrom"
          />
          <span class="search-todo__between-text">~</span>
          <v-text-field
            variant="underlined"
            label="To"
            type="date"
            class="search-todo__date-field"
            ref="limitedAtToElement"
            :rules="limitedAtToRules"
            :min="limitedStrFrom"
            v-model.trim="limitedStrTo"
          />
          <v-messages class="error--text"></v-messages>
        </v-row>
        <v-row class="search-todo__order-wrapper">
          <v-select 
            variant="underlined"
            label="並び替え"
            class="search-todo__order-select"
            :items="orderOptions"
            item-title="text"
            item-value="no"
            return-object
            v-model="order"
            />
        </v-row>
        <ButtonWrapper>
          <SubmitButton>検索</SubmitButton>
          <CloseButton @click="onClose" v-if="isDialog"></CloseButton>
        </ButtonWrapper>
      </v-form>
    </template>
  </ContentBoard>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchStates } from '../../stores/searchStates';
import ContentBoard from '../molecules/ContentBoard.vue';
import SubmitButton from '../molecules/SubmitButton.vue';
import ButtonWrapper from '../molecules/ButtonWrapper.vue';
import { useValidation } from '../../composables/validation';
import CloseButton from '../molecules/CloseButton.vue';

const props = defineProps({ 'isDialog': Boolean })
const emits = defineEmits(['close']);

const onClose = () => {
  if (props.isDialog) {
    emits('close');
  }
}

const { orderOptions, changeQueryStates } = useSearchStates();

const searchWord = ref('');
const limitedStrFrom = ref('');
const limitedStrTo = ref('');
const order = ref(orderOptions[0]);

//バリデーション設定
const { generateStringRules,generateDateRules, isFormValid } = useValidation();

const limitedAtFromElement = ref(null);
const limitedAtFromRules = generateDateRules(limitedAtFromElement);

const limitedAtToElement = ref(null);
const limitedAtToRules = generateDateRules(limitedAtToElement);

const searchWordLabel = '検索ワード'
const searchWordMaxChars = 32;
const searchWordRules = generateStringRules(searchWordLabel, searchWordMaxChars)

// submit時にバリデーションをかける
const formElement = ref(null);
const onSubmit = async () => {
  if (! await isFormValid(formElement)) {
    return;
  }

  changeQueryStates({
    word: searchWord,
    limitedStrFrom,
    limitedStrTo,
    order,
    page: 1
  });
}
</script>

<style lang="scss" scoped>
@use '../../assets/scss/variables' as *;

.search-todo {
  &__between-text {
    font-size: 20px;
    display: inline-block;
    margin: 0 10px;
  }

  &__order-wrapper {
    width: 250px;
  }

  &__label {
    width: 100%;
    font-size: 14px;
    color: $default-text-color;
    opacity: 1;
  }

  &__date-field {
    width: 40%;
    min-width: 120px;
  }
}
</style>
