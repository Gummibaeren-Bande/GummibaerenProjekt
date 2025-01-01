<template>
  <div id="AnswerButton" class="taskAnswerbar mainComponentColor borderRadiusBottomRight">
    <Button label="Abschicken" fluid v-on:click="submitAnswer" :disabled="disabled" />
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
#AnswerButton {
  margin-left: 2px;
}

#AnswerButton button {
  margin: 5px;
  color: black;
}
</style>
