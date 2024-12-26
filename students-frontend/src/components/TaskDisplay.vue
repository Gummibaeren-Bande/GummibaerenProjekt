<template>
  <div id="mainDiv">
    <TaskTitle />
    <TaskInfoBar />
    <NumericTask v-if="isNummericTaks"/>
    <MultipaleChoiceTask v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TaskInfoBar from './taskcomponents/TaskInfoBar.vue'
import TaskTitle from './taskcomponents/TaskTitle.vue'
import MultipaleChoiceTask from './taskviews/MultipaleChoiceTask.vue';
import NumericTask from './taskviews/NumericTask.vue'

const isNummericTaks = ref(false)
</script>


<style>
#mainDiv {
  display: flex;
  flex-direction: column;
  width: 80vw; /* Makes the Div 80% of the ViewPort. This width will be inheritet by all child Components. So it defines the Displayed width. */
  height: 90vh;
}
</style>

