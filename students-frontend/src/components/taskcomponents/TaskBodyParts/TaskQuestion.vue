<template>
  <div class="textNormall textColor textBold">{{ question }}</div>
</template>

<script lang="ts">
import '../Task.css'
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

<style scoped>
div {
  padding: 5px;
}
</style>