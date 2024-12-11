<template>
    <div>
      <LoginPopup />
      <TaskDisplay />
    </div>
</template>
  
<script setup lang="ts">
    import LoginPopup from '../components/LoginPopup.vue'
    import TaskDisplay from '../components/TaskDisplay.vue'
</script>

<style>
  body {
    background-color: #009682;
  }
</style>
  