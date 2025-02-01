<template>
  <div class="mainComponent mainComponentColor borderRadiusTopRight borderRadiusTopLeft">
    <h1 class="textTitle textColor">{{ title }}</h1>
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
