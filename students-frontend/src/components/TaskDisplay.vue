<template>
  <div class="mainComponent mainDivSize">
    <TaskTitle />
    <TaskInfoBar />
    <NumericTask v-if="isNummericTaks"/>
    <MultipaleChoiceTask v-else />
  </div>
</template>

<script lang="ts" setup>
import './taskcomponents/Task.css'
import { ref } from 'vue';
import TaskInfoBar from './taskcomponents/TaskInfoBar.vue'
import TaskTitle from './taskcomponents/TaskTitle.vue'
import MultipaleChoiceTask from './taskviews/MultipaleChoiceTask.vue';
import NumericTask from './taskviews/NumericTask.vue'

const isNummericTaks = ref(false)
</script>