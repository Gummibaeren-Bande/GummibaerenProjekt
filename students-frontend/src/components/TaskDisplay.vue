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
      :task="currentExercise"
      :group="group"
      :disable-to-answer="disableToAnswer"
    />
    <!--<MultipleChoiceTask
      v-if="currentTask.getType() === 'multiple-choice'"
      @submit-answer="submitAnswer"
      :task="currentTask"
      :group="group"
      :disable-to-answer="disableToAnswer"
    />-->
  </div>
</template>

<script lang="ts" setup>
import './taskcomponents/Task.css'
import RightWrongOverlay from './taskcomponents/RightWrongOverlay.vue'
import NumericTask from './taskviews/NumericTask.vue'
import { defineComponent } from 'vue'
import { Socket } from 'socket.io-client'
import CallbackSuccessDTO from '../../../shared-backend/src/dtos/CallbackDTOs/CallbackSuccessDTO'
import type CallbackExerciseDTO from '../../../shared-backend/src/dtos/CallbackDTOs/CallbackExerciseDTO'
import type ExerciseDTO from '../../../shared-backend/src/dtos/ExerciseDTO'
import type CallbackNumberDTO from '../../../shared-backend/src/dtos/CallbackDTOs/CallbackNumberDTO'
</script>

<script lang="ts">
export enum TaskType {
  NUMERIC,
  MULTIPLE_CHOICE,
}

export interface Task {
  title: string
  description: string
  question: string
  lsg: number | string
  taskType: TaskType
  isCorrectd(givenAnswer: string): boolean
}

export default defineComponent({
  props: {
    groupName: {
      type: String,
      required: true,
    },
    socket: {
      type: Socket,
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
    // Submits the Answer
    // TODO: This is a temp function and has to be updatet later on.
    async submitAnswer(givenAnswer: string[]) {
      console.log('Gegebene Antwort ist: ' + givenAnswer[0])
      await this.socket.emit(
        'answerCurrentExcercise',
        this.groupName,
        this.currentExercise.id,
        Number(givenAnswer[0]),
        (response: CallbackSuccessDTO) => {
          console.log(response.message)
          this.isCorrect = response.success
          this.disableToAnswer = true
          this.isRigthWrongOverlayVisible = true
        },
      )
    },
    //Handels the "weiter" button from the RightWrongOverlay.
    // TODO: This is a temp function and has to be updatet later on.
    continueWithQuestion() {
      this.isRigthWrongOverlayVisible = false
      this.disableToAnswer = false
    },
    //Loads next Task.
    // TODO: This is a temp function and has to be updatet later on.
    nextTask() {},

    loadCurrentExcercise() {
      this.socket.emit(
        'getCurrentExcerciceOfGroup',
        this.groupName,
        (response: CallbackExerciseDTO) => {
          if (response.success) {
            this.currentExercise = response.exercise
          } else {
            console.log(response.message)
          }
        },
      )
    },

    loadNumberOfFinishedTasks() {
      this.socket.emit(
        'getNumberOfFinishedTasks',
        this.group.groupName,
        (response: CallbackNumberDTO) => {
          if (response.success) {
            this.group.finishedTasks = response.number
          } else {
            console.log(response.message)
          }
        },
      )
    },
  },
  beforeMount() {
    this.loadCurrentExcercise()
    this.group.groupName = this.groupName
    this.loadNumberOfFinishedTasks()
  },
})
</script>
