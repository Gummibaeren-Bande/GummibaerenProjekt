<template>
  <RightWrongOverlay
    :is-right="isCorrect"
    :visible="isRigthWrongOverlayVisible"
    v-on:weiter="weiter"
  />
  <div class="mainComponent mainDivSize">
    <NumericTask
      v-if="currentTask.getType() === 'numerical'"
      @submit-answer="submitAnswer"
      :task="currentTask"
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
import MultipaleChoiceTask from './taskviews/MultipaleChoiceTask.vue'
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
      currentTask: {} as Exercise,
      isCorrect: false as boolean,
      isRigthWrongOverlayVisible: false as boolean,
      disableToAnswer: false as boolean,
      group: {
        groupName: 'Teddybären',
        finishedTasks: 1,
        increaseFinishedTasks() {
          this.finishedTasks++
        },
      },
    }
  },
  methods: {
    // Submits the Answer
    // TODO: This is a temp function and has to be updatet later on.
    submitAnswer(givenAnswer: string[]) {
      console.log('Gegeben Antwor ist: ' + givenAnswer[0])
    },
    //Handels the "weiter" button from the RightWrongOverlay.
    // TODO: This is a temp function and has to be updatet later on.
    weiter() {

      },
    //Loads next Task.
    // TODO: This is a temp function and has to be updatet later on.
    nextTask() {

    },

    loadCurrentExcercise() {
      console.log("Loading current Excercise")
      this.socket.emit('getCurrentExcerciceOfGroup', this.groupName, (message: {
        isFinished: boolean;
        currentExcercise: Exercise;
      }) => {
        this.currentTask = message.currentExcercise;
        console.log("Loading current Excercise")
      })
    }
  },
  mounted() {
    this.loadCurrentExcercise()
  },
})
</script>
