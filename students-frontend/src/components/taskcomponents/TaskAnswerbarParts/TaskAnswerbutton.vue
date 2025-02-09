<template>
  <div class="taskAnswerbarButtonDiv" :class="{ zeroMargin: !showButton }">
    <Button
      v-show="showButton"
      icon="pi pi-send"
      label="Abschicken"
      fluid
      @click="submitAnswer()"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
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
    showButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    submitAnswer() {
      this.$emit('submitAnswer')
    },
  },
})
</script>
