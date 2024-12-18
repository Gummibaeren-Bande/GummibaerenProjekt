<template>
  <div id="body">
    <TaskDescription />
    <TaskQuestion />
  </div>
</template>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff66;
  height: 60vh;
  width: inherit;
  color: black;
  text-align: left;
  font-size: large;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}
</style>

<script setup lang="ts">
import TaskDescription from './TaskDescription.vue'
import TaskQuestion from './TaskQuestion.vue'
</script>
