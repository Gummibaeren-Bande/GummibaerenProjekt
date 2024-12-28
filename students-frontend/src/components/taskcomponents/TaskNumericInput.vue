<template>
  <div class="taskAnswerbar mainComponentColor borderRadiusBottomLeft">
    <InputNumber id="answer" input-id="integeronly" placeholder="Antwort" fluid locale="de-DE" />
  </div>
</template>

<style scoped>

#answer {
  margin: 5px;
}
</style>

<script lang="ts" setup>
import './Task.css'
import InputNumber from 'primevue/inputnumber'
</script>
