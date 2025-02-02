<template>
  <div class="taskQuestionStyle">{{ question }}</div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
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
