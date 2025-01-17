<template>
  <TaskHeader :title="task.title" :group="group" />
  <TaskBody :question="task.question" :description="task.description" />
  <TaskDefaultAnswerbar @submit-answer="submitAnswer()" :disabled="disableToAnswer">
    <InputNumber
      v-model="value"
      class="margin5"
      input-id="integeronly"
      placeholder="Antwort"
      fluid
      locale="de-DE"
      :disabled="disableToAnswer"
      @keydown.enter="submitAnswer()"
    />
  </TaskDefaultAnswerbar>
</template>

<script lang="ts">
import '../taskcomponents/Task.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import InputNumber from 'primevue/inputnumber'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import { defineComponent, type PropType } from 'vue'
import type { GroupInfo } from '../taskcomponents/TaskHeader/TaskInfoBar.vue'
import Exercise from '../../../../shared-backend/src/abstract-classes/Exercise'


export default defineComponent({
  components: {
    TaskDefaultAnswerbar,
    TaskHeader,
    TaskBody,
    InputNumber,
  },
  emits: ['submitAnswer'],
  props: {
    task: {
      type: Object as PropType<Exercise>,
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
  data() {
    return {
      value: undefined as number | undefined,
    }
  },
  methods: {
    // Submits answer to parent if a number was written into the input field.
    submitAnswer() {
      if (typeof this.value === 'number') {
        this.$emit('submitAnswer', [this.value.toString()])
      } else {
        console.log('Bitte gebe zuerst eine Antwort ein.')
      }
    },
  },
})
</script>
