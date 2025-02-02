<template>
  <div class="answerBarStyle">
    <div class="taskAnswerbarSlot">
      <slot></slot>
    </div>
    <TaskAnswerbutton @submit-answer="submitAnswer()" :disabled="disabled" :show-button="showButton" />
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
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
    showButton: {
      type: Boolean,
      default: true,
    }
  },
  emits: ['submitAnswer'],
  methods: {
    submitAnswer() {
      this.$emit('submitAnswer')
    },
  },
})
</script>
