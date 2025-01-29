<template>
  <div class="exercise">
    <!-- Button that both displays the amount of attempts and functions as the button to display the options Popover. -->
    <Button @click="showPopover($event)" class="exerciseDisplayButton">
      <div class="exerciseDisplay" :style="{ backgroundColor: exerciseColor }">
        <span>
          {{ trackableTask.tries }}
        </span>
      </div>
    </Button>
    <!-- If the exercise has alternatives, the current chosen alternative is displayed in a smaller circle to the top right. -->
    <div
      v-if="hasAlternatives()"
      class="alternativeDisplay"
      :style="{ backgroundColor: exerciseColor }"
    >
      <span>
        {{ getChoosenExcerciseEnumerator() }}
      </span>
    </div>
    <!-- Each exercise has a timer. The timer is hidden and only is displayed once the task is started. -->
    <div :class="{ hidden: isNotStartedYet() }">
      <Timer></Timer>
    </div>

    <!-- The options Popover with every option as a single button. -->
    <Popover ref="overlay" class="optionsOverlay">
      <span class="headerOverlay">Optionen</span>
      <div>
        <Button
          v-if="isTaskSkippable()"
          label="Aufgabe überspringen"
          @click="skipTask"
          class="optionsButton"
        />
      </div>
      <div v-for="exercise of trackableTask.task.exercises" :key="exercise.id">
        <Button
          v-if="isAlternativeChoosable(exercise)"
          :label="getExerciseLabel(exercise)"
          @click="changeExercise(exercise.id)"
          class="optionsButton"
        />
      </div>
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import Timer from '@/components/Timer.vue'
import Popover from 'primevue/popover'
import Button from 'primevue/button'
import ServerConnection from '@/ServerConnection'
import TrackableTaskDTO from '../../../shared-backend/src/dtos/TrackableTaskDTO'
import TrackableTaskState from '../../../shared-backend/src/enums/TrackableTaskState'
import ExerciseDTO from '../../../shared-backend/src/dtos/ExerciseDTO'
</script>

<script lang="ts">
enum Colors {
  SKIPPED_COLOR = 'rgb(162, 34, 35)',
  IN_PROGRESS_COLOR = 'rgb(35, 161, 224)',
  NOT_STARTED_COLOR = 'rgb(128, 128, 128)',
  FINISHED_COLOR = 'rgb(140, 182, 60)',
}

export default {
  props: {
    serverConnection: {
      type: ServerConnection,
      required: true,
    },
    trackableTask: {
      type: TrackableTaskDTO,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      exerciseColor: this.getColor(),
    }
  },
  updated() {
    this.exerciseColor = this.getColor()
  },
  methods: {
    /* Checks if the exercise has alternatives. Returns true if it has alternatives, false otherwise.*/
    hasAlternatives(): boolean {
      return this.trackableTask.task.numberOfAlternatives > 0
    },
    getExerciseLabel(exercise: ExerciseDTO): string {
      return `${exercise.enumerator}: ${exercise.title}`
    },
    getChoosenExcerciseEnumerator(): string {
      return this.trackableTask.task.exercises[this.trackableTask.chosenExerciseIndex].enumerator
    },
    isNotStartedYet(): boolean {
      return this.trackableTask.startedAt === null
    },
    isTaskSkippable(): boolean {
      return this.trackableTask.state === TrackableTaskState.NotStarted
    },
    isAlternativeChoosable(exercise: ExerciseDTO): boolean {
      const isNotAlreadyChoosen = !this.isChosenExercise(exercise)
      const isNotStartedYet = this.trackableTask.state === TrackableTaskState.NotStarted
      return isNotAlreadyChoosen && isNotStartedYet
    },
    isChosenExercise(exercise: ExerciseDTO): boolean {
      return (
        this.trackableTask.task.exercises[this.trackableTask.chosenExerciseIndex].id === exercise.id
      )
    },
    /* skippes the exercise by sending a request to the server. Then hides the Popover. */
    skipTask() {
      this.serverConnection.skipTask(this.trackableTask.task.id, this.groupName)
      this.hidePopover()
    },
    /* chooses a new exercise by sending a request to the server. Then hides the Popover. */
    changeExercise(newExerciseId: string) {
      this.serverConnection.chooseAlternativForTask(
        this.trackableTask.task.id,
        this.groupName,
        newExerciseId,
      )
      this.hidePopover()
    },
    /* Changes the Color of the displayed exercise to the given ColorPicker. */
    changeColor(color: Colors) {
      this.exerciseColor = color
    },

    getColor(): Colors {
      switch (this.trackableTask.state) {
        case TrackableTaskState.NotStarted:
          return Colors.NOT_STARTED_COLOR
        case TrackableTaskState.InProgress:
          return Colors.IN_PROGRESS_COLOR
        case TrackableTaskState.Skipped:
          return Colors.SKIPPED_COLOR
        case TrackableTaskState.Completed:
          return Colors.FINISHED_COLOR
      }
    },
    /* Opens a Popover showing the options for the exercise. Possible options are skip exercise and change alternative. */
    showPopover(event: Event) {
      // Access the overlay ref and show it
      if (this.hasOptions())
      (this.$refs.overlay as InstanceType<typeof Popover>).show(event)
    },
    /* Closes the Popover. */
    hidePopover() {
      // Access the overlay ref and hide it
      ;(this.$refs.overlay as InstanceType<typeof Popover>).hide()
    },
    hasOptions(): boolean {
      return this.isTaskSkippable() || this.hasAlternatives()
    },
    /* displays a timer if the group is finished. */
    displayEndTime(seconds: number | null): string {
      if (seconds === null) {
        return ''
      }
      if (seconds === 0) return ''
      const min = Math.floor(seconds / 60)
      const sec = seconds % 60
      if (min > 60) {
        const hours = Math.floor(min / 60)
        return `${String(hours).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
      }
      return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    },
  },
}
</script>

<style scoped>
.exercise {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.exerciseDisplay {
  height: 75px;
  width: 75px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 40px;
  text-align: center;
}

.alternativeDisplay {
  position: absolute;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  color: black;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 0px;
  right: 0px;
}

.exerciseDisplayButton {
  height: 78px;
  width: 78px;
  border-radius: 50%;
  border: none !important;
  background: none !important;
  padding: 0;
}

.exerciseDisplayButton:hover {
  background-color: #ffffff66 !important;
  border-radius: 50% !important;
}

.headerOverlay {
  font-size: 16px;
  color: black;
}

.optionsButton {
  background: none !important;
  border: 2px solid #ffffff66 !important;
  color: black !important;
  box-shadow: none !important;
  width: 100%;
}

.optionsButton:hover {
  background-color: #ffffff66 !important;
}

.hidden {
  visibility: hidden;
}
</style>
