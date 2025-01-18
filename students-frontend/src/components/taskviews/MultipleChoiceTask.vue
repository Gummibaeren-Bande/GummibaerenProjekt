<!--rechtschreibfehler im name-->
<template>
  <TaskHeader :title="exercise.title" :group="group" />
  <TaskBody :question="exercise.question" :description="exercise.description">
    <TaskMultipleChoiceSection
      ref="choices"
      :options="options"
      :disabled="disableToAnswer"
    />
  </TaskBody>
  <TaskDefaultAnswerbar @submit-answer="submitAnswer()" :disabled="disableToAnswer" />
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
import { defineComponent, onBeforeUpdate } from 'vue'
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
      options: [] as Option[]
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
    /* Submits the answer with the selceted choices.
     *  $refs used to get the refernce set in the TaskMultiplechoicesSection with "ref".
     *  If nothing is selected the answer will still be sent.
     */
    submitAnswer() {
      const choices = this.$refs.choices as InstanceType<typeof TaskMultipleChoiceSection>
      let answer = new Array()
      const answerStrings = choices.getSelectedOptions()
      for(let i = 0; i < answerStrings.length; i++){
        answer.push(Number(answerStrings[i]))
      }
        this.$emit('submitAnswer', answer)
    },

    /**
     * Updates and Displays the Options to answer the MultipleChoice Question
     * Cant direcktly Pass the OptionsTrough. So thy need to be updatet here. (lifesycle hooks beforeUpdate and beforeMount)
     */
    updateOptions() {
      if (Array.isArray(this.exercise.options)) {
        this.options = new Array(this.exercise.options.length)
        for (var i = 0; i < this.exercise.options.length; i++) {
          this.options[i] = { label: this.exercise.options[i], value: String(i)}
        }
      }
    },

  },

  /**
   * Is Called when proporties Change befor the Display is rerenderd.
   */
  beforeUpdate() {
    this.updateOptions() // updates the answer options when a new Exercise is loaded.
    const choices = (this.$refs.choices as InstanceType<typeof TaskMultipleChoiceSection>)
      choices.resetSelectedOptions() //clears the MutlipleChoice slesction Input when new Exercise is loaded.
  },

  /**
   * makes sure to load the Answer Options befor the first render (displayed to User).
   */
  beforeMount() {
    this.updateOptions() 
  },

})
</script>
