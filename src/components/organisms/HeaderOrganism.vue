<template>
  <v-app-bar color="grey-darken-1" tag="header" :height="smAndDown ? 64 : 80" flat class="app-header" prominent>
    <v-app-bar-title class="logo" text="TodoList" tag="h1"></v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn :icon="mdiPlus" v-show="smAndDown" @click="createFormDrawer = !createFormDrawer">
    </v-btn>
    <v-btn :icon="mdiMagnify" v-show="smAndDown" @click="searchFormDrawer = !searchFormDrawer">
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer location="top" v-model="createFormDrawer" :width="createTodoFormHeight" v-show="smAndDown">
    <CreateForm is-dialog @close="createFormDrawer = false" ref="createTodoForm"></CreateForm>
  </v-navigation-drawer>
  <v-navigation-drawer location="top" v-model="searchFormDrawer" :width="searchTodoFormHeight" v-show="smAndDown">
    <SearchForm is-dialog @close="searchFormDrawer = false" ref="searchTodoForm"></SearchForm>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { mdiPlus } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import CreateForm from './CreateForm.vue';
import SearchForm from './SearchForm.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { watch} from 'vue';

const { smAndDown } = useDisplay();

const createFormDrawer = ref(false);
const searchFormDrawer = ref(false);

// drawerが片方しか開かないように制御
watch(createFormDrawer, () => {
  if (createFormDrawer.value) {
    searchFormDrawer.value = false;
  }
});

watch(searchFormDrawer, () => {
  if (searchFormDrawer.value) {
    createFormDrawer.value = false;
  }
});

//drawerの高さの計算
const createTodoForm = ref(null);
const createTodoFormHeight = ref(0);
const searchTodoForm = ref(null);
const searchTodoFormHeight = ref(0);
onMounted(() => {
  createTodoFormHeight.value = createTodoForm.value.$el.getBoundingClientRect().height
  searchTodoFormHeight.value = searchTodoForm.value.$el.getBoundingClientRect().height
})
</script>

<style lang="scss" scoped>
@use '../../assets/scss/variables' as *;
.logo {
  font-family: 'Roboto Slab', serif;
  font-size: 32px;
  font-weight: 500;
  margin-left: 50px;

  @media all and (max-width: $sm-bp) {
    font-size: 24px;  
    margin-left: 20px;  
  }
}
</style>
