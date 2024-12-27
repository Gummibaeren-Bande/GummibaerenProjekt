<template>
  <div class="mainComponent mainDivSize">
    <TaskTitle />
    <TaskInfoBar />
    <NumericTask v-if="isNummericTaks" v-on:tester="tester" />
    <MultipaleChoiceTask v-else v-on:tester="tester" />
  </div>
</template>

<script lang="ts" setup>
import './taskcomponents/Task.css'
import TaskInfoBar from './taskcomponents/TaskInfoBar.vue'
import TaskTitle from './taskcomponents/TaskTitle.vue'
import MultipaleChoiceTask from './taskviews/MultipaleChoiceTask.vue'
import NumericTask from './taskviews/NumericTask.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      isNummericTaks: false,
    }
  },
  methods: {
    tester() {
      console.log('Antwort abgeschickt im TaskDisplay')
      this.isNummericTaks = !this.isNummericTaks
    },
  },
}
</script>
