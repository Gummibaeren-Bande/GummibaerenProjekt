<template>
  <div class="body">
    <TaskDescription />
    <TaskQuestion question="Wie viele Gummibärchen bekommt jeder?" />
  </div>
  <TaskNumericAnswerbar />
</template>

<script lang="ts" setup>
import TaskDescription from '../taskcomponents/TaskDescription.vue'
import TaskQuestion from '../taskcomponents/TaskQuestion.vue'
import TaskNumericAnswerbar from '../taskcomponents/TaskNumericAnswerbar.vue'
</script>

<style>
.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 0;
  flex: 1 1 auto;
  background-color: #ffffff66;
  color: black;
  text-align: center;
  padding: 10px;
}
</style>