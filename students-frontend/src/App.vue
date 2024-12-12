<template>
  <div>
    <Toast />
    <StudentsView />
  </div>
</template>

<script setup lang="ts">
import StudentsView from './views/StudentsView.vue'
import Toast from 'primevue/toast'
</script>

<script lang="ts">
export default {
  components: {
    Toast,
  },
}
</script>
