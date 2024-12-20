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
  justify-content: end;
  align-items: center;
  min-height: 0;
  flex: 1 1 auto;
  background-color: #ffffff66;
  height: auto;
  width: inherit;
  color: black;
  text-align: left;
  font-size: large;
  padding: 10px;
}
</style>

<script setup lang="ts">
import TaskDescription from './TaskDescription.vue'
import TaskQuestion from './TaskQuestion.vue'
</script>
