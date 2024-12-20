<template>
  <div id="mainDiv">
    <TaskTitle />
    <NumericTask />
  </div>
</template>

<style>
#mainDiv {
  width: 80vw; /* Makes the Div 80% of the ViewPort. This width will be inheritet by all child Components. So it defines the Displayed width. */
}
</style>

<script setup lang="ts">
  import NumericTask from './taskviews/NumericTask.vue'
  import TaskTitle from './taskcomponents/TaskTitle.vue'
</script>
