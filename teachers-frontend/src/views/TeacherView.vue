<!-- Adds a title to the grou progress table -->

<template>
  <div class="background-form">
    <div class="content-div">
      <TaskSetTitle></TaskSetTitle>
      <GroupProgress></GroupProgress>
    </div>
  </div>
</template>

<script setup lang="ts">
import GroupProgress from '@/components/GroupProgress.vue'
import TaskSetTitle from '@/components/TaskSetTitle.vue'
</script>

<style scoped>
.background-form {
  background-color: rgb(0, 150, 130);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.content-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
</style>
