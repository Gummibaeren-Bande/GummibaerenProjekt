<template>
  <div id="mainDiv">
    <TaskTitle />
    <TaskInfoBar />
    <NumericTask v-if="nummericTask"/>
    <MultipaleChoiceTask v-if="nummericTask"/>
  </div>
</template>

<style>
#mainDiv {
  display: flex;
  flex-direction: column;
  width: 80vw; /* Makes the Div 80% of the ViewPort. This width will be inheritet by all child Components. So it defines the Displayed width. */
  height: 90vh;
}
</style>

<script setup lang="ts">
import TaskInfoBar from './taskcomponents/TaskInfoBar.vue'
import TaskTitle from './taskcomponents/TaskTitle.vue'
import MultipaleChoiceTask from './taskviews/MultipaleChoiceTask.vue';
import NumericTask from './taskviews/NumericTask.vue'

const nummericTask = false
</script>
