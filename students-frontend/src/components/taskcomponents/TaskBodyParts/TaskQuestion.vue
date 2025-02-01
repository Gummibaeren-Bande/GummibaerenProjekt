<template>
  <div class="taskQuestionStyle">{{ question }}</div>
</template>

<script lang="ts">
import '@/assets/Frontend.css'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    question: {
      type: String,
      required: true,
    },
  },
})
</script>
