<template>
  <slot>
    <TaskTitle :title="title" />
    <TaskInfoBar :group="group" />
  </slot>
</template>

<script lang="ts">
import TaskInfoBar from './TaskInfoBar.vue'
import TaskTitle from './TaskTitle.vue'
import { defineComponent } from 'vue'
import type { GroupInfo } from './TaskInfoBar.vue'

export default defineComponent({
  components: {
    TaskInfoBar,
    TaskTitle,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    group: {
      type: Object as () => GroupInfo,
      required: true,
    },
  },
})
</script>
