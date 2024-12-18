<template>
  <div id="mainDiv">
    <TaskTitle />
    <TaskInfoBar />
    <TaskBody />
    <TaskNumericAnswerbar />
  </div>
</template>

<style>
#mainDiv {
  width: 80vw; /* Makes the Div 80% of the ViewPort. This width will be inheritet by all child Components. So it defines the Displayed width. */
}
</style>

<script setup lang="ts">
import TaskTitle from './taskcomponents/TaskTitle.vue'
import TaskInfoBar from './taskcomponents/TaskInfoBar.vue'
import TaskBody from './taskcomponents/TaskBody.vue'
import TaskNumericAnswerbar from './taskcomponents/TaskNumericAnswerbar.vue'
</script>
