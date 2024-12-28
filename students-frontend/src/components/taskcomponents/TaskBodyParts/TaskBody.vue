<template>
    <div class="taskBody taskAnswerbar mainComponentColor">
        <TaskDescription v-if="description" :description="props.description"/>
        <TaskQuestion :question=question />
        <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import '../Task.css'
import TaskDescription from './TaskDescription.vue'
import TaskQuestion from './TaskQuestion.vue'

const props = defineProps({
  description: {
    type: String,
    default: ''
  },
  question: {
    type: String,
    required: true
  }
})
</script>