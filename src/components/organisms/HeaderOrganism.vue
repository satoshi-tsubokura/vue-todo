<template>
  <v-app-bar color="grey-darken-1" tag="header" height="80" :flat="true" :absolute="false" class="app-header">
    <v-app-bar-title class="logo" text="TodoList" tag="h1"></v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '../../assets/scss/variables';
.logo {
  font-family: 'Roboto Slab', serif;
  font-size: 32px;
  font-weight: 500;
  margin-left: 50px;
}
</style>
