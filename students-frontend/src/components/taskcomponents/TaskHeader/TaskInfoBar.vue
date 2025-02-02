<template>
  <div class="InfoBarStyle">
    <div class="InfoBarGroupnameStyle">Gruppenname: {{ group.groupName }}</div>
    <div class="InfoBarTaskCounterStyle">Fertige Aufgaben: {{ group.finishedTasks }}</div>
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export interface GroupInfo {
  groupName: string
  finishedTasks: number
}

export default defineComponent({
  name: 'TaskInfoBar',
  props: {
    group: {
      type: Object as PropType<GroupInfo>,
      required: true,
    },
  },
})
</script>
