<template>
  <v-main class="bg">
    <v-container>
      <v-row justify="space-around">
        <v-col align-self="stretch" cols="0" sm="6" md="6" lg="6" xl="6">
          <v-row>
            <v-col align-self="stretch">
              <CreateForm></CreateForm>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self="stretch">
              <SearchForm></SearchForm>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <TodoIndex></TodoIndex>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import CreateForm from '../organisms/CreateForm.vue';
import SearchForm from '../organisms/SearchForm.vue';
import TodoIndex from '../organisms/TodoIndex.vue';
</script>

<style lang="scss" scoped>
.bg {
  background: url('../../assets/backgroundimg_pc.png') no-repeat top left;
  background-size: cover;
}
</style>
