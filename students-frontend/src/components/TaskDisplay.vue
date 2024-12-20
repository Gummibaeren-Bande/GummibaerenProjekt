<template>
  <div id="mainDiv">
    <NumericTask />
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
  import NumericTask from './taskviews/NumericTask.vue'
</script>
