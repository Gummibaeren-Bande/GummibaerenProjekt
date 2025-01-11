<template class="appDisplay">
  <div>
    <TeacherView></TeacherView>
  </div>
</template>

<script setup lang="ts">
import TeacherView from './views/TeacherView.vue'
</script>

<style scoped>
  .appDisplay {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }
</style>
