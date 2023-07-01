<template>
  <v-btn color="grey-darken-1" flat type="submit">
    <slot>送信</slot>
  </v-btn>
</template>

<script setup>
defineProps(['text']);
</script>

<style lang="scss" scoped></style>
