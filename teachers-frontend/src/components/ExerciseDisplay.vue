<!-- Implements the dispaly circle for a single exercise. If Alternatives exist, they are displayed in a smaller circle to the top right.-->

<template>
  <div class="exercise">
    <Button
      @click="showPopover($event)"
      :class="['exerciseButtonDisplay', getColor()]"
      :disabled="!hasOptions()"
    >
      <div>
        <span>
          {{ trackableTask.tries }}
        </span>
        <div v-if="hasAlternatives()" :class="['alternativeDisplay', getColor()]">
          <span>
            {{ getChoosenExcerciseEnumerator() }}
          </span>
        </div>
      </div>
    </Button>
    <div class="timer">
      <TimerComponent
        v-if="!isNotStartedYet()"
        :startTime="trackableTask.startedAt?.toString()"
        :finishedAfterSeconds="trackableTask.finishedAfterSeconds"
      />
    </div>

    <!-- The options menu with every option as a single button. -->
    <Popover ref="popover" class="optionsPopover">
      <span>Optionen</span>
      <div>
        <Button
          v-if="isTaskSkippable()"
          label="Aufgabe überspringen"
          @click="skipTask"
          class="popoverOptionsButton"
        />
        <Button
          v-if="isTaskSkipRevertable()"
          label="Aufgabe reaktivieren"
          @click="revertTaskSkip"
          class="popoverOptionsButton"
        />
      </div>
      <div v-for="exercise of trackableTask.task.exercises" :key="exercise.id">
        <Button
          v-if="isAlternativeChoosable(exercise)"
          :label="getExerciseLabel(exercise)"
          @click="changeExercise(exercise.id)"
          class="popoverOptionsButton"
        />
      </div>
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/frontend.css'
import TimerComponent from '@/components/Timer.vue'
import Popover from 'primevue/popover'
import Button from 'primevue/button'
import ServerConnection from '@/ServerConnection'
import TrackableTaskDTO from '../../../shared-backend/src/dtos/TrackableTaskDTO'
import TrackableTaskState from '../../../shared-backend/src/enums/TrackableTaskState'
import ExerciseDTO from '../../../shared-backend/src/dtos/ExerciseDTO'
</script>

<script lang="ts">
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

  methods: {
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
    isTaskSkipRevertable(): boolean {
      return this.trackableTask.isSkipRevertable
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
    skipTask() {
      this.serverConnection.skipTask(this.trackableTask.task.id, this.groupName)
      this.hidePopover()
    },
    revertTaskSkip() {
      this.serverConnection.revertTaskSkip(this.trackableTask.task.id, this.groupName)
      this.hidePopover()
    },
    changeExercise(newExerciseId: string) {
      this.serverConnection.chooseAlternativForTask(
        this.trackableTask.task.id,
        this.groupName,
        newExerciseId,
      )
      this.hidePopover()
    },
    getColor(): string {
      switch (this.trackableTask.state) {
        case TrackableTaskState.NotStarted:
          return 'notStartedColor'
        case TrackableTaskState.InProgress:
          return 'inProgressColor'
        case TrackableTaskState.Skipped:
          return 'skippedColor'
        case TrackableTaskState.Completed:
          return 'finishedColor'
      }
    },
    showPopover(event: Event) {
      if (this.hasOptions()) (this.$refs.popover as InstanceType<typeof Popover>).show(event)
    },
    hidePopover() {
      ;(this.$refs.popover as InstanceType<typeof Popover>).hide()
    },
    hasOptions(): boolean {
      return (
        this.isTaskSkippable() ||
        (this.hasAlternatives() && this.isTaskSkippable()) ||
        this.isTaskSkipRevertable()
      )
    },
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
