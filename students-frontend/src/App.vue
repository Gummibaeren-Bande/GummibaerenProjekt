<template>
  <div>
    <Toast />
    <StudentsView :server-connection="new ServerConnection()" />
  </div>
</template>

<script setup lang="ts">
import ServerConnection from './ServerConnection'
import StudentsView from './views/StudentsView.vue'
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
}
</style>
