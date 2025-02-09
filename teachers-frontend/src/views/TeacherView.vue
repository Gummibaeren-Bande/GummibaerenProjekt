<template>
  <div class="contentDisplay">
    <div>
      <TaskSetTitle></TaskSetTitle>
      <GroupProgressDisplay :server-connection="serverConnection"></GroupProgressDisplay>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/frontend.css'
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
