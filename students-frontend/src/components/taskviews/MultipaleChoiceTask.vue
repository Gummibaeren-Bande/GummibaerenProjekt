<template>
  <div class="taskBody mainComponentColor">
    <TaskQuestion question="Welche der folgenden Geschmaksrichtungen gibt es bei Gummibärchen?" />
    <TaskMultipleChoice />
  </div>
  <TaskNumericAnswerbar v-on:tester="tester" />
</template>

<script lang="ts" setup>
import '../taskcomponents/Task.css'
import TaskQuestion from '../taskcomponents/TaskQuestion.vue'
import TaskMultipleChoice from '../taskcomponents/TaskMultipleChoiceSction.vue'
import TaskNumericAnswerbar from '../taskcomponents/TaskNumericAnswerbar.vue'
</script>

<script lang="ts">
export default {
  emits: ['tester'],
  methods: {
    tester() {
      console.log('Antwort abgeschickt im MultipaleChoiceTask')
      this.$emit('tester')
    },
  },
}
</script>
