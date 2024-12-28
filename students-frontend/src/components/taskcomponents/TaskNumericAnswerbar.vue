<template>
  <div class="answerBar">
    <TaskNumericInput />
    <TaskAnswerbutton v-on:tester="$emit('tester')" />
  </div>
</template>

<script lang="ts" setup>
import './Task.css'
import TaskAnswerbutton from './TaskAnswerbutton.vue'
import TaskNumericInput from './TaskNumericInput.vue'
</script>

<script lang="ts">
export default {
  emits: ['tester'],
}
</script>