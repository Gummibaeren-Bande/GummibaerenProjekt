<!--rechtschreibfehler im name-->
<template>
  <TaskHeader :title="exercise.title" :group="group" />
  <TaskBody :question="exercise.question" :description="exercise.description">
    <TaskMultipleChoiceSection ref="choices" :options="options" :disabled="disableToAnswer" />
  </TaskBody>
  <TaskDefaultAnswerbar @submit-answer="submitAnswer()" :disabled="disableToAnswer" />
</template>

<script lang="ts">
import '@/assets/Frontend.css'
import TaskDefaultAnswerbar from '../taskcomponents/TaskAnswerbarParts/TaskDefaultAnswerbar.vue'
import TaskHeader from '../taskcomponents/TaskHeader/TaskHeader.vue'
import TaskBody from '../taskcomponents/TaskBodyParts/TaskBody.vue'
import TaskMultipleChoiceSection, {
  type Option,
} from '../taskcomponents/TaskBodyParts/TaskMultipleChoiceSection.vue'
import type { GroupInfo } from '../taskcomponents/TaskHeader/TaskInfoBar.vue'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type ExerciseDTO from '../../../../shared-backend/src/dtos/ExerciseDTO'

export default defineComponent({
  components: {
    TaskMultipleChoiceSection,
    TaskDefaultAnswerbar,
    TaskHeader,
    TaskBody,
  },
  emits: ['submitAnswer'],
  data() {
    return {
      options: [] as Option[],
    }
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
  methods: {
    /* Submits the answer with the selected choices.
     *  $refs used to get the reference set in the TaskMultiplechoicesSection with "ref".
     *  If nothing is selected the answer will still be sent.
     */
    submitAnswer() {
      const choices = this.$refs.choices as InstanceType<typeof TaskMultipleChoiceSection>
      const answer = []
      const answerStrings = choices.getSelectedOptions()
      for (let i = 0; i < answerStrings.length; i++) {
        answer.push(Number(answerStrings[i]))
      }
      this.$emit('submitAnswer', answer)
    },

    /**
     * Updates and displays the oOptions to answer the multiple choice question
     * Cant directly pass the options through. So they need to be updated here.
     */
    updateOptions() {
      if (Array.isArray(this.exercise.options)) {
        this.options = new Array(this.exercise.options.length)
        for (let i = 0; i < this.exercise.options.length; i++) {
          this.options[i] = { label: this.exercise.options[i], value: String(i) }
        }
      }
    },
  },

  /**
   * Is called when proporties change before the display is rerenderd.
   */
  beforeUpdate() {
    this.updateOptions() // updates the answer options when a new exercise is loaded.
    const choices = this.$refs.choices as InstanceType<typeof TaskMultipleChoiceSection>
    choices.resetSelectedOptions() //clears the MutlipleChoice selection input when new exercise is loaded.
  },

  /**
   * makes sure to load the answer options before the first render.
   */
  beforeMount() {
    this.updateOptions()
  },
})
</script>
