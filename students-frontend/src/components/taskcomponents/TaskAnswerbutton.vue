<template>
  <div id="AnswerButton" class="taskAnswerbar mainComponentColor">
    <Button label="Abschicken" fluid />
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
