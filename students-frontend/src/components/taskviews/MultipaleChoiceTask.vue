<template>
  <TaskHeader :title="task.title" :group="group" />
  <TaskBody :question="task.question" :description="task.description">
    <TaskMultipleChoiceSction
      ref="choices"
      :options="task.answerOptions"
      :disbale-selectabel="disableToAnswer"
    />
  </TaskBody>
  <TaskDefaultAnswerbar v-on:submit-answer="submitAnswer" :disabled="disableToAnswer" />
</template>

<script lang="ts">
import '../taskcomponents/Task.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import TaskMultipleChoiceSction, {
  type Option,
} from '../taskcomponents/TaskBodyParts/TaskMultipleChoiceSction.vue'
import type { GroupInfo } from '../taskcomponents/TaskHeader/TaskInfoBar.vue'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

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
      required: true,
    },
    disableToAnswer: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitAnswer() {
      const choices = this.$refs.choices as InstanceType<typeof TaskMultipleChoiceSction>
      this.$emit('submitAnswer', choices.getSelectedOptions())
    },
  },
})
</script>
