<template class="appDisplay">
  <div>
    <TeacherView :server-connection="new ServerConnection()" />
  </div>
</template>

<script setup lang="ts">
import ServerConnection from './ServerConnection'
import TeacherView from './views/TeacherView.vue'
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
