<template>
  <div class="answerBar">
    <div class="mainComponentColor borderRadiusBottomLeft">
      <slot></slot>
    </div>
    <TaskAnswerbutton v-on:submit-answer="$emit('submitAnswer')" :disabled="disabled" />
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
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submitAnswer'],
})
</script>
