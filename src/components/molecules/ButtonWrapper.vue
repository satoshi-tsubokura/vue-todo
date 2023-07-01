<template>
  <div class="btn-wrapper">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.btn-wrapper{
  width: 50%;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
}
</style>