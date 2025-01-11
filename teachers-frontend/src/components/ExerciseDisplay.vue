<template>
  <div class="exercise">
    <!-- Button that both displays the amount of attempts and functions as the button to display the options Popover. -->
    <Button @click="showOptions" class="exerciseDisplayButton">
      <div class="exerciseDisplay" :style="{ backgroundColor: exerciseColor }">
        <span>
          {{ attempts }}
        </span>
      </div>
    </Button>
    <!-- If the exercise has alternatives, the current chosen alternative is displayed in a smaller circle to the top right. -->
    <div
      v-if="hasAlternatives(props.numberOfAlternatives)"
      class="alternativeDisplay"
      :style="{ backgroundColor: exerciseColor }"
    >
      <span>
        {{ exerciseAlternative }}
      </span>
    </div>
    <!-- Each exercise has a timer. The timer is hidden and only is displayed once the task is started. -->
    <div :class="{ hidden: hideTimer }">
      <Timer></Timer>
    </div>

    <!-- The options Popover with every option as a single button. -->
    <Popover ref="overlay" class="optionsOverlay">
      <span class="headerOverlay">Optionen</span>
      <!-- Dummy Buttons to show the functions incrementAttempts and toggleTimerDisplay. -->
      <div>
        <Button label="showTimer" @click="toggleTimerDisplay" class="optionsButton" />
        <Button label="incrementAttempts" @click="incrementAttempts" class="optionsButton" />
      </div>
      <div>
        <Button label="Aufgabe überspringen" @click="skipExercise" class="optionsButton" />
      </div>
      <div v-for="index in props.numberOfAlternatives" :key="index">
        <Button
          :label="`Alternative ${String.fromCharCode(65 + index)}`"
          @click="changeAlternative(String.fromCharCode(65 + index))"
          class="optionsButton"
        />
      </div>
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Timer from '@/components/Timer.vue'
import Popover from 'primevue/overlaypanel'
import Button from 'primevue/button'

const props = defineProps({
  numberOfAlternatives: {
    type: Number,
    default: 0,
  },
})

/* Initializes the exercise. Base color is gray (rgb(64,64,64)), base attempts are 0, base alternative is A (if the exercise has alternatives), task is not started. Popover is initialized.*/
const exerciseColor = ref('rgb(64, 64, 64)')
const attempts = ref(0)
const overlay = ref()
const exerciseAlternative = ref('A')
const hideTimer = ref(true)

/* Adds one to the counter of attempts. */
const incrementAttempts = () => {
  attempts.value += 1
  hidePopover() /* Can be removed once this is no longer an option button. */
}

/* Opens a Popover showing the options for the exercise. Possible options are skip exercise and change alternative. */
const showOptions = (event: Event) => {
  overlay.value.toggle(event)
}

/* Changes the color of the exercise to red to indicate it is being skipped. Then hides the Popover. */
const skipExercise = () => {
  changeColor('rgb(162,34,35)')
  hidePopover()
}

/* Changes the letter displayed to given String. Then hides the Popover. */
const changeAlternative = (alternative: string) => {
  exerciseAlternative.value = alternative
  hidePopover()
}

/* Closes the Popover. */
const hidePopover = () => {
  overlay.value.hide()
}

/* Changes the Color of the displayed exercise to the given ColorPicker. */
const changeColor = (color: string) => {
  exerciseColor.value = color
}

/* Checks if the exercise has alternatives. Returns true if it has alternatives, false otherwise.*/
const hasAlternatives = (numberOfAlternatives: number) => {
  return numberOfAlternatives > 0
}

/* Changes whether the timer is displayed for the task. */
const toggleTimerDisplay = () => {
  hideTimer.value = !hideTimer.value
  hidePopover() /* Can be removed once this is no longer an option button. */
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
  color: #ffffff66;
}

.optionsButton {
  background: none !important;
  border: 2px solid #ffffff66 !important;
  color: #ffffff66 !important;
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
