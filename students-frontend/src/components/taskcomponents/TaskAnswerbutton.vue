<template>
  <div id="AnswerButton" class="taskAnswerbar mainComponentColor">
    <Button label="Abschicken" fluid v-on:click="submitAnswer" />
  </div>
</template>

<style scoped>
#AnswerButton {
  margin-left: 2px;
  border-bottom-right-radius: 12px;
}

#AnswerButton button {
  margin: 5px;
  color: black;
}
</style>

<script lang="ts" setup>
import './Task.css'
import Button from 'primevue/button'
</script>

<script lang="ts">
export default {
  emits: ['tester'],
  methods: {
    submitAnswer() {
      console.log('Antwort abgeschickt')
      this.$emit('tester')
    },
  },
}
</script>
