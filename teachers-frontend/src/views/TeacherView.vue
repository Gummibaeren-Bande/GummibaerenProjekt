<template>
  <div class="background-form">
    <div>
      <TaskSetTitle></TaskSetTitle>
      <GroupProgressDisplay :server-connection="serverConnection"></GroupProgressDisplay>
    </div>
  </div>
</template>

<script setup lang="ts">
import GroupProgressDisplay from '@/components/GroupProgressDisplay.vue'
import TaskSetTitle from '@/components/TaskSetTitle.vue'
import ServerConnection from '@/ServerConnection'
</script>

<script lang="ts">
export default {
  props: {
    serverConnection: {
      type: ServerConnection,
      required: true,
    },
  },
}
</script>

<style>
.background-form {
  width: 100vw;
  padding: 3%;
}
body {
  background-color: rgb(0, 150, 130);
}
</style>
