<template>
  <v-main class="bg">
    <v-container>
      <v-row>
        <v-col cols="0" sm="6" md="6" lg="6" xl="6">
          <v-row>
            <CreateForm></CreateForm>
          </v-row>
          <v-row>
            <SearchForm></SearchForm>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <TodoList></TodoList>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>  

<script setup>
import CreateForm from '../organisms/CreateForm.vue';
import SearchForm from '../organisms/SearchForm.vue';
import TodoList from '../organisms/TodoList.vue';
</script>

<style lang="scss" scoped>
  .bg{
    background: url('../../assets/backgroundimg_pc.png') no-repeat top left;
    background-size: cover;
  }

</style>