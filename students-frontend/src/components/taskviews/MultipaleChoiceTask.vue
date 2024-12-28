<template>
  <div class="taskBody mainComponentColor">
    <TaskQuestion question="Welche der folgenden Geschmaksrichtungen gibt es bei Gummibärchen?" />
    <TaskMultipleChoice />
  </div>
  <TaskDefaultAnswerbar v-on:tester="tester" />
</template>

<script lang="ts" setup>
import '../taskcomponents/Task.css'
import TaskQuestion from '../taskcomponents/TaskQuestion.vue'
import TaskMultipleChoice from '../taskcomponents/TaskMultipleChoiceSction.vue'
import TaskDefaultAnswerbar from '../taskcomponents/TaskDefaultAnswerbar.vue'
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
