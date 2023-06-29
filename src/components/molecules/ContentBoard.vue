<template>
  <v-card class="content-board">
    <v-card-title :tag="titleTag" class="content-title">
      <slot name="title"></slot>
    </v-card-title>
    <slot name="contents"></slot>
  </v-card>
</template>

<script setup>
defineProps({
  titleTag: {
    type: String,
    default: 'h2',
    validator: (value) => {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value);
    }
  }
});
</script>

<style lang="scss" scoped>
.content-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.content-board {
  padding: 30px 45px 42px;
}
</style>
