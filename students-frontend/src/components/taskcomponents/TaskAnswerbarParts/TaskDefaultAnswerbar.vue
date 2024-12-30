<template>
  <div class="answerBar">
    <div class="mainComponentColor borderRadiusBottomLeft">
      <slot></slot>
    </div>
    <TaskAnswerbutton v-on:submit-answer="$emit('submitAnswer')" />
  </div>
</template>

<script lang="ts">
import '../Task.css'
import TaskAnswerbutton from './TaskAnswerbutton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TaskAnswerbutton,
  },
  emits: ['submitAnswer'],
})
</script>
