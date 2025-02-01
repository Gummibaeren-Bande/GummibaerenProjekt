<template>
  <div class="answerBar">
    <div class="mainComponentColor borderRadiusBottomLeft">
      <div class="taskAnswerbar">
        <slot></slot>
      </div>
    </div>
    <TaskAnswerbutton @submit-answer="submitAnswer()" :disabled="disabled" />
  </div>
</template>

<script lang="ts">
import '@/assets/Frontend.css'
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
  methods: {
    submitAnswer() {
      this.$emit('submitAnswer')
    },
  },
})
</script>
