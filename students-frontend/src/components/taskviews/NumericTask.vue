<template>
  <TaskHeader :title="exercise.title" :group="group" />
  <TaskBody :question="exercise.question" :description="exercise.description" />
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

<script setup lang="ts">
import '../taskcomponents/Task.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import InputNumber from 'primevue/inputnumber'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import { defineComponent, type PropType } from 'vue'
import type { GroupInfo } from '../taskcomponents/TaskHeader/TaskInfoBar.vue'
import type ExerciseDTO from '../../../../shared-backend/src/dtos/ExerciseDTO'
</script>

<script lang="ts">
export default defineComponent({
  components: {
    TaskDefaultAnswerbar,
    TaskHeader,
    TaskBody,
    InputNumber,
  },
  props: {
    exercise: {
      type: Object as PropType<ExerciseDTO>,
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
  data() {
    return {
      value: undefined as number | undefined,
    }
  },
  methods: {
    // Submits answer to parent if a number was written into the input field.
    submitAnswer() {
      if (typeof this.value === 'number') {
        this.$emit('submitAnswer', this.value)
      } else {
        console.log('Bitte gebe zuerst eine Antwort ein.')
      }
    },
  },

  /**
   * Is called when proporties change before the display is rerenderd.
   */
  beforeUpdate() {
    this.value = undefined //clears the numeric input when a new exercise is loaded.
  },
})
</script>
