<template>
  <TaskHeader :title="infoContent.title" :group="group" />
  <TaskBody :question="infoContent.question" :description="infoContent.description" />
  <TaskDefaultAnswerbar @submit-answer="submitAnswer()" :disabled="disableToAnswer" />
</template>

<script setup lang="ts">
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import InputNumber from 'primevue/inputnumber'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import { defineComponent, type PropType } from 'vue'
import type { GroupInfo } from '../taskcomponents/TaskHeader/TaskInfoBar.vue'
</script>

<script lang="ts">
export class InfoContent {
  title: string
  question: string
  description: string

  constructor(title: string, question: string, description: string) {
    this.title = title
    this.question = question
    this.description = description
  }
}

export default defineComponent({
  components: {
    TaskDefaultAnswerbar,
    TaskHeader,
    TaskBody,
    InputNumber,
  },
  props: {
    infoContent: {
      type: Object as PropType<InfoContent>,
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
  emits: ['submitAnswer'],
  methods: {
    // Submits answer to parent if a answerbuttin was pressed.
    submitAnswer() {
      this.$emit('submitAnswer')
    },
  },
})
</script>
