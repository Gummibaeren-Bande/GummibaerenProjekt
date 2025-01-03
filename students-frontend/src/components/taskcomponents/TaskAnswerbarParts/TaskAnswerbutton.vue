<template>
  <div class="taskAnswerbar mainComponentColor borderRadiusBottomRight answerButtonLeftFreeSpace">
    <Button class="margin5" label="Abschicken" fluid v-on:click="submitAnswer" :disabled="disabled" />
  </div>
</template>

<script lang="ts">
import '../Task.css'
import Button from 'primevue/button'
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

<style scoped>
button {
  color: black;
}
</style>
