<!-- Adds a title to the grou progress table -->

<template>
  <div class="background-form">
    <div class="content-div">
      <TaskSetTitle></TaskSetTitle>
      <GroupProgressDisplay></GroupProgressDisplay>
    </div>
  </div>
</template>

<script setup lang="ts">
import GroupProgressDisplay from '@/components/GroupProgressDisplay.vue';
import TaskSetTitle from '@/components/TaskSetTitle.vue'
</script>

<style scoped>
.background-form {
  background-color: rgb(0, 150, 130);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 3%;
}

.content-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
