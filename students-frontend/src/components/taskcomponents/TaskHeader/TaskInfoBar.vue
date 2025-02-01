<template>
  <div class="InfoBar mainComponent mainComponentColor">
    <div class="textSmaller textColor InfoBarGroupname">Gruppenname: {{ group.groupName }}</div>
    <div class="textSmaller textColor InfoBarTaskCounter">
      Fertige Aufgaben: {{ group.finishedTasks }}
    </div>
  </div>
</template>

<script lang="ts">
import '@/assets/Frontend.css'
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
