<template>
  <div class="taskBody taskAnswerbar mainComponentColor">
    <TaskDescription v-if="description" :description="description" />
    <TaskQuestion :question="question" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import '../Task.css'
import TaskDescription from './TaskDescription.vue'
import TaskQuestion from './TaskQuestion.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TaskDescription,
    TaskQuestion,
  },
  props: {
    description: {
      type: String,
      default: '',
    },
    question: {
      type: String,
      required: true,
    },
  },
})
</script>
