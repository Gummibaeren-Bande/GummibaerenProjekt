<template>
  <div class="InfoBar mainComponent mainComponentColor">
    <div class="textSmaller textColor InfoBarGroupname">Gruppenname: {{ group.groupname }}</div>
    <div class="textSmaller textColor InfoBarCounter">Fertige Aufgaben: {{ group.finishedTasks }}</div>
  </div>
</template>

<script lang="ts">
import '../Task.css'
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export interface GroupInfo {
  groupname: string;
  finishedTasks: number;
}

export default defineComponent({
  name: 'TaskInfoBar',
  props: {
    group: {
      type: Object as PropType<GroupInfo>,
      required: true
    }
  }
})

</script>