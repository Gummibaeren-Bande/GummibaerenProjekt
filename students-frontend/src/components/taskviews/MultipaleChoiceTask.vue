<template>
  <TaskHeader />
  <TaskBody question="Wie viele Gummibärchen bekommt jeder?">
    <TaskMultipleChoiceSction />
  </TaskBody>
  <TaskDefaultAnswerbar v-on:tester="tester" />
</template>

<script lang="ts" setup>
import '../taskcomponents/Task.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import TaskMultipleChoiceSction from '../taskcomponents/TaskBodyParts/TaskMultipleChoiceSction.vue'
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
