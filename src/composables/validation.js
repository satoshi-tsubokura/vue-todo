import { ref, toValue } from 'vue';

export function useValidation() {
  const generateStringRules = (name, isRequired = false, maxChars) => {
    return [
      (val) => !isRequired || !!val || `${name}は入力必須です。`,
      (val) => val.length <= maxChars || `${maxChars}文字以内で入力してください。`
    ];
  };

  const generateDateRules = (targetElement) => {
    // HTML5標準のバリデーション機能を利用するため、DOMを参照する。
    return [
      async () =>
        (await !toValue(targetElement).validity.badInput) || '正しい年月日を入力してください。'
    ];
  };

  const generateMemoRules = (maxChars) => {
    return [(val) => val.length <= maxChars || `${maxChars}文字以内で入力してください。`];
  };

  const isFormValid = async (formElement) => {
    const { valid } = await formElement.value.validate();
    return valid;
  };

  return { generateStringRules, generateDateRules, generateMemoRules, isFormValid };
}
