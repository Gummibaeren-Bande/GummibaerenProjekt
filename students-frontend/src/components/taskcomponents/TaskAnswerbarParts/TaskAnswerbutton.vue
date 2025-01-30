<template>
  <div class="taskAnswerbar mainComponentColor borderRadiusBottomRight answerButtonLeftFreeSpace">
    <Button
      icon="pi pi-send"
      class="margin5 answerButton"
      label="Abschicken"
      fluid
      @click="submitAnswer()"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import '../Task.css'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
  },
  emits: ['submitAnswer'],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitAnswer() {
      this.$emit('submitAnswer')
    },
  },
})
</script>
