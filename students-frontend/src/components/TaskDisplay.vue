<template>
  <RightWrongOverlay
    :is-Right="isCorrect"
    :visible="isRigthWrongOverlayVisible"
    @continueWithQuestion="continueWithQuestion()"
  />
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
import RightWrongOverlay from './taskcomponents/RightWrongOverlay.vue'
import NumericTask from './taskviews/NumericTask.vue'
import { defineComponent } from 'vue'
import ExerciseDTO from '../../../shared-backend/src/dtos/ExerciseDTO'
import ServerConnection from '@/ServerConnection'
import MultipleChoiceTask from './taskviews/MultipleChoiceTask.vue'
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
      isCorrect: false as boolean,
      isRigthWrongOverlayVisible: false as boolean,
      disableToAnswer: false as boolean,
      group: {
        groupName: 'Teddybären',
        finishedTasks: 1,
      },
    }
  },
  methods: {
    /**
     * Sends the given Answer to the server a updates the Interface according
     * to the result.
     * @param givenAnswer answer to check.
     */
    async submitAnswer(givenAnswer: Number[] | Number) {
      const response = await this.serverConnection.answerCurrentExcercise(
        this.groupName,
        this.currentExercise.id,
        givenAnswer,
      )
      this.isCorrect = response.success
      this.disableToAnswer = true
      this.isRigthWrongOverlayVisible = true
    },

    /**
     * This method is called to continue with the Question. It will close the
     * RightWrongOverlay and enable to answer the Question again. If the last
     * give answer was right it will load the Next exercise first.
     */
    continueWithQuestion() {
      this.isRigthWrongOverlayVisible = false
      this.disableToAnswer = false
      if (this.isCorrect) {
        this.loadNextExercise()
        this.loadNumberOfFinishedTasks()
      }
    },

    /**
     * Request the next Exercise from the server and sets it as the new curren Exercise.
     */
    async loadNextExercise() {
      const response = await this.serverConnection.getNextExerciceOfGroup(this.group.groupName)
      if (response.success) {
        this.currentExercise = response.exercise
      }
    },

    /**
     * Loads the Current Exercise frome Server.
     */
    async loadCurrentExcercise() {
      const response = await this.serverConnection.getCurrentExcerciceOfGroup(this.group.groupName)
      if (response.success) {
        this.currentExercise = response.exercise
      } else {
        console.log(response.message)
      }
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
  },

  /**
   * Loads and setups this Component whe it is first rendert.
   */
  beforeMount() {
    this.group.groupName = this.groupName
    this.loadCurrentExcercise()
    this.loadNumberOfFinishedTasks()
  },
})
</script>
