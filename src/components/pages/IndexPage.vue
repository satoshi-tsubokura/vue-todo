<template>
  <v-main class="bg">
    <v-container>
      <v-row justify="space-around" align="start">
        <v-col cols="0" sm="6" md="6" lg="6" xl="5" ref="leftCol">
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
        <v-col cols="12" sm="6" md="6" lg="6" xl="5">
          <TodoIndex></TodoIndex>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { provide, ref } from 'vue';
import CreateForm from '../organisms/CreateForm.vue';
import SearchForm from '../organisms/SearchForm.vue';
import TodoIndex from '../organisms/TodoIndex.vue';
import { onMounted } from 'vue';

const leftCol = ref(null);
const leftColHeight = ref(0);
onMounted(() => {
  leftColHeight.value = leftCol.value.$el.getBoundingClientRect().height;
})

provide('leftColHeightRef', leftColHeight);
</script>

<style lang="scss" scoped>
.bg {
  background: url('../../assets/backgroundimg_pc.png') no-repeat top left;
  background-size: cover;
}
</style>
