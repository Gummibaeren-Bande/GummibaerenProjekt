<template>
  <div class="taskTitleStyle">
    <h1 class="textTitle">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import '@/assets/Frontend.css'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
