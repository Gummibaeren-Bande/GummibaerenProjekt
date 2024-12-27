<template>
  <div id="AnswerBar">
    <TaskNumericInput />
    <TaskAnswerbutton />
  </div>
</template>

<style scoped>
#AnswerBar {
  display: grid;
  grid-template-columns: 4fr 1fr;
  width: inherit;
  margin-top: 2px;
  border-bottom-left-radius: 12px;
}
</style>

<script lang="ts" setup>
import TaskAnswerbutton from './TaskAnswerbutton.vue'
import TaskNumericInput from './TaskNumericInput.vue'
</script>
