<template>
  <div id="solution" class="taskAnswerbar mainComponentColor">
    <InputNumber id="answer" input-id="integeronly" placeholder="Antwort" fluid locale="de-DE" />
  </div>
</template>

<style scoped>
#solution {
  border-bottom-left-radius: 12px;
}

#answer {
  margin: 5px;
}
</style>

<script lang="ts" setup>
import './Task.css'
import InputNumber from 'primevue/inputnumber'
</script>
