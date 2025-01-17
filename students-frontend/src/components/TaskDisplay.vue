<template>
  <RightWrongOverlay
    :is-right="isCorrect"
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
    <!--<MultipaleChoiceTask
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
import Exercise from '../../../shared-backend/src/abstract-classes/Exercise'
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
      currentExercise: {} as Exercise,
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
    submitAnswer(givenAnswer: string[]) {
      console.log('Gegeben Antwor ist: ' + givenAnswer[0])
      this.socket.emit('answerCurrentExcercise', this.groupName, this.currentExercise.id, Number(givenAnswer[0]), (message: { //TODO: Change 'beta' to currentExercise.id (Causes Crash)
        isCorrect: boolean;
        message: string;
      }) => {
        console.log(message.message)
        this.isCorrect = message.isCorrect
        this.disableToAnswer = true
        this.isRigthWrongOverlayVisible = true
      })  
    },
    //Handels the "weiter" button from the RightWrongOverlay.
    // TODO: This is a temp function and has to be updatet later on.
    continueWithQuestion() {
      this.isRigthWrongOverlayVisible = false
      this.disableToAnswer = false
    },
    //Loads next Task.
    // TODO: This is a temp function and has to be updatet later on.
    nextTask() {

    },

    loadCurrentExcercise() {
      this.socket.emit('getCurrentExcerciceOfGroup', this.groupName, (message: {
        isFinished: boolean;
        currentExcercise: Exercise;
      }) => {
        this.currentExercise = message.currentExcercise;
      })
    },

    loadNumberOfFinishedTasks() {
      this.socket.emit('getNumberOfFinishedTasks', this.group.groupName, (message: {
        number: number 
      }) => {
        this.group.finishedTasks = message.number;
      })
    }
  },
  beforeMount() {
    this.loadCurrentExcercise()
    this.group.groupName = this.groupName
    this.loadNumberOfFinishedTasks()
  },
})
</script>
