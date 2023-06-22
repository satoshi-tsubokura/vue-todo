<template>
 <v-app-bar :color="'grey-darken-1'" height="80" tag="header" :flat="true" :absolute="false">
  <v-app-bar-title class="logo" text="TodoList" tag="h1"></v-app-bar-title>
 </v-app-bar>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.logo {
  font-family: 'Roboto Slab', serif;
  font-size: 32px;
  font-weight: 500;
  margin-left: 50px;
}
</style>