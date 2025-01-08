<template>
  <TaskHeader :title="task.title" :group="group" />
  <TaskBody :question="task.question" :description="task.description">
    <TaskMultipleChoiceSection
      ref="choices"
      :options="task.answerOptions"
      :disbale-selectabel="disableToAnswer"
    />
  </TaskBody>
  <TaskDefaultAnswerbar v-on:submit-answer="submitAnswer()" :disabled="disableToAnswer" />
</template>

<script lang="ts">
import '../taskcomponents/Task.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import TaskMultipleChoiceSection, {
  type Option,
} from '../taskcomponents/TaskBodyParts/TaskMultipleChoiceSection.vue'
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
    TaskMultipleChoiceSection,
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
    /* Submits the Answere withe the selceted Choices.
     *  $refs used to get the refernce set in the TaskMultiplechoicesSection with "ref".
     *  If nothing is selceted the Answer will still be sent.
     */
    submitAnswer() {
      const choices = this.$refs.choices as InstanceType<typeof TaskMultipleChoiceSection>
      this.$emit('submitAnswer', choices.getSelectedOptions())
    },
  },
})
</script>
