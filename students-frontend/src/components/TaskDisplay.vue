<template>
  <div class="mainComponent mainDivSize">
    <NumericTask
      v-if="currentExercise.type === 'numerical'"
      @submit-answer="submitAnswer"
      :exercise="currentExercise"
      :group="group"
      :disable-to-answer="disableToAnswer"
    />
    <MultipleChoiceTask
      v-if="currentExercise.type === 'multiple-choice'"
      @submit-answer="submitAnswer"
      :exercise="currentExercise"
      :group="group"
      :disable-to-answer="disableToAnswer"
    />
  </div>
</template>

<script lang="ts" setup>
import './taskcomponents/Task.css'
import NumericTask from './taskviews/NumericTask.vue'
import { defineComponent } from 'vue'
import ExerciseDTO from '../../../shared-backend/src/dtos/ExerciseDTO'
import ServerConnection from '@/ServerConnection'
import MultipleChoiceTask from './taskviews/MultipleChoiceTask.vue'
import Answer from '../../../shared-backend/src/types/Answer'
import NumericalExercise from '../../../shared-backend/src/entities/NumericalExercise'
</script>

<script lang="ts">
export default defineComponent({
  props: {
    groupName: {
      type: String,
      required: true,
    },
    serverConnection: {
      type: ServerConnection,
      required: true,
    },
  },
  data() {
    return {
      currentExercise: {} as ExerciseDTO,
      disableToAnswer: false as boolean,
      group: {
        groupName: '',
        finishedTasks: 0,
      },
    }
  },
  methods: {
    /**
     * Sends the given Answer to the server a updates the Interface according
     * to the result.
     * @param givenAnswer answer to check.
     */
    async submitAnswer(givenAnswer: Answer) {
      const response = await this.serverConnection.answerCurrentExercise(
        this.groupName,
        this.currentExercise.id,
        givenAnswer as Answer,
      )
      this.continueWithQuestion(response.success)
    },

    /**
     * This method is called to continue with the Question. It will close the
     * RightWrongOverlay and enable to answer the Question again. If the last
     * give answer was right it will load the Next exercise first.
     */
    continueWithQuestion(wasAnswerCorrect: boolean) {
      if (wasAnswerCorrect) {
        this.$toast.removeAllGroups()
        this.$toast.add({
          severity: 'success',
          summary: 'Richtig',
          detail: 'Deine Antwort war Richtig.',
          life: 3000,
        })
        this.loadNextExercise()
        this.loadNumberOfFinishedTasks()
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Falsch',
          detail: 'Deine Antwort war leider nicht Richtig.',
        })
      }
    },

    /**
     * Request the next Exercise from the server and sets it as the new curren Exercise.
     */
    async loadNextExercise() {
      const response = await this.serverConnection.getNextExerciseOfGroup(this.group.groupName)
      if (response.success && response.exercise) {
        this.currentExercise = response.exercise
      } else if (response.isFinished) {
        const response = await this.serverConnection.finishWork(this.group.groupName)
        if (response.success) {
          this.showFinishedWork()
        }
        console.log(response.message)
      }
      console.log(response.message)
    },

    /**
     * Loads the Current Exercise frome Server.
     */
    async loadCurrentExercise() {
      const response = await this.serverConnection.getCurrentExerciseOfGroup(this.group.groupName)
      if (response.success && response.exercise) {
        this.currentExercise = response.exercise
      } else if (response.isFinished) {
        //CurrentExercise gibt immer isFinished = false zurück.
        const response = await this.serverConnection.finishWork(this.group.groupName)
        this.showFinishedWork()
        console.log(response.message)
      }
      console.log(response.message)
    },

    /**
     * Loads the number of Finished Exercises from the Server.
     */
    async loadNumberOfFinishedTasks() {
      const response = await this.serverConnection.getNumberOfFinishedTasks(this.group.groupName)
      if (response.success) {
        this.group.finishedTasks = response.number
      }
    },

    /**
     * Loads a new Display to show the user that he has solved all Exercises.
     */
    showFinishedWork() {
      this.currentExercise = new ExerciseDTO(
        new NumericalExercise('Fertig', '', 'Du hast alle Aufgaben gelöst. Toll gemacht.', -1),
      )
      this.disableToAnswer = true
    },
  },

  /**
   * Loads and setups this Component whe it is first rendert.
   */
  beforeMount() {
    this.disableToAnswer = false
    this.group.groupName = this.groupName
    this.loadCurrentExercise()
    this.loadNumberOfFinishedTasks()
  },
})
</script>
