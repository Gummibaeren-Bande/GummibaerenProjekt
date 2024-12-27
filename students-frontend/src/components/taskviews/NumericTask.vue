<template>
  <div class="taskBody mainComponentColor">
    <TaskDescription />
    <TaskQuestion question="Wie viele Gummibärchen bekommt jeder?" />
  </div>
  <TaskNumericAnswerbar v-on:tester="tester" />
</template>

<script lang="ts" setup>
import '../taskcomponents/Task.css'
import TaskDescription from '../taskcomponents/TaskDescription.vue'
import TaskQuestion from '../taskcomponents/TaskQuestion.vue'
import TaskNumericAnswerbar from '../taskcomponents/TaskNumericAnswerbar.vue'
</script>

<script lang="ts">
export default {
  emits: ['tester'],
  methods: {
    tester() {
      console.log('Antwort abgeschickt im NumericTask')
      this.$emit('tester')
    },
  },
}
</script>
