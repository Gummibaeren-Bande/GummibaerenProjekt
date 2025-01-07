<template>
  <div class="textNormall textColor textBold divPadding5">{{ question }}</div>
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
