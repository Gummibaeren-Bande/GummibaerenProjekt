<template>
  <TaskTitle />
  <TaskInfoBar />
  <TaskBody />
  <TaskNumericAnswerbar />
</template>

<script lang="ts" setup>
import TaskInfoBar from '../taskcomponents/TaskInfoBar.vue'
import TaskBody from '../taskcomponents/TaskBody.vue'
import TaskNumericAnswerbar from '../taskcomponents/TaskNumericAnswerbar.vue'
import TaskTitle from '../taskcomponents/TaskTitle.vue'
</script>
