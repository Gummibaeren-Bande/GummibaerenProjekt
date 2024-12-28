<template>
    <div class="answerBar">
      <div class="mainComponentColor borderRadiusBottomLeft"> 
        <slot></slot>
      </div>
      <TaskAnswerbutton v-on:tester="$emit('tester')" />
    </div>
  </template>
  
  
  <script lang="ts" setup>
  import '../Task.css'
  import TaskAnswerbutton from './TaskAnswerbutton.vue'
  </script>
  
  <script lang="ts">
  export default {
    emits: ['tester'],
  }
  </script>