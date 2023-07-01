<template>
  <v-main class="bg">
    <v-container>
      <v-row justify="space-around" align="start">
        <v-col cols="12" md="6" lg="6" xl="5" ref="leftCol" class="d-none d-md-block">
          <v-row>
            <v-col>
              <CreateForm></CreateForm>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <SearchForm></SearchForm>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="5">
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
  background: url('../../assets/imgs/backgroundimg_pc.png') no-repeat top left;
  background-size: cover;
}
</style>
