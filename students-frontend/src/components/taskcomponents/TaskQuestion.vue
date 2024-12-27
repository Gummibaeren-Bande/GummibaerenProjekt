<template>
  <div class="textNormall textColor textBold">{{ question }}</div>
</template>

<style scoped>
div {
  padding: 0px;
  padding-bottom: 5px;
}
</style>

<script lang="ts" setup>
import './Task.css'

  defineProps({
    question : String
  })
</script>
