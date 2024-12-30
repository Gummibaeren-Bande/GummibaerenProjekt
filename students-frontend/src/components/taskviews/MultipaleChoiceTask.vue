<template>
  <TaskHeader :title="task.title" :group="group" />
  <TaskBody :question="task.question" :description="task.description">
    <TaskMultipleChoiceSction ref="tester" :options="task.answerOptions" />
  </TaskBody>
  <TaskDefaultAnswerbar v-on:submit-answer="submitAnswer" />
</template>

<script lang="ts">
import '../taskcomponents/Task.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import TaskMultipleChoiceSction, { type Option } from '../taskcomponents/TaskBodyParts/TaskMultipleChoiceSction.vue'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { GroupInfo } from '../taskcomponents/TaskHeader/TaskInfoBar.vue'


export interface Task {
  title: string
  description: string
  question: string
  answerOptions: Option[]
}

export default defineComponent({
  components: {
    TaskMultipleChoiceSction,
    TaskDefaultAnswerbar,
    TaskHeader,
    TaskBody,
  },
  emits: ['submitAnswer'],
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
    group: {
      type: Object as PropType<GroupInfo>,
      required: true
    }
  },
  methods: {
    submitAnswer() {
      const tester = this.$refs.tester as InstanceType<typeof TaskMultipleChoiceSction>
      this.$emit('submitAnswer', tester.getSelectedOptions())
    },
  },
})
</script>
