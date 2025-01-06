<template>
  <div class="exercise">
    <Button @click="showOptions" class="exerciseDisplayButton">
      <div class="exerciseDisplay" :style="{ backgroundColor: exerciseColor }">
        <span>
          {{ attempts }}
        </span>
      </div>
    </Button>
    <div
      v-if="hasAlternatives(props.numberOfAlternatives)"
      class="alternativeDisplay"
      :style="{ backgroundColor: exerciseColor }"
    >
      <span>
        {{ exerciseAlternative }}
      </span>
    </div>
    <div>
      <Timer></Timer>
    </div>
    <Popover ref="overlay" class="optionsOverlay">
      <span class="headerOverlay">Optionen</span>
      <div>
        <Button
          label="Aufgabe überspringen"
          severity="secondary"
          @click="skipExercise"
          class="optionsButton"
        />
      </div>
      <div v-for="index in props.numberOfAlternatives" :key="index">
        <Button
          :label="`Alternative ${String.fromCharCode(65 + index)}`"
          severity="secondary"
          @click="changeAlternative(String.fromCharCode(65 + index))"
          class="optionsButton"
        />
      </div>
      <div>
        <Button
          label="Versuch hinzufügen"
          severity="secondary"
          @click="incrementAttempts"
          class="optionsButton"
        />
      </div>
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import Timer from '@/components/Timer.vue'
import Popover from 'primevue/overlaypanel'
import Button from 'primevue/button'

const props = defineProps({
  numberOfAlternatives: {
    type: Number,
    default: 0,
  },
})

const exerciseColor = ref('rgb(64, 64, 64)')
const attempts = ref(0)
const overlay = ref()
const exerciseAlternative = ref('A')

const incrementAttempts = () => {
  attempts.value += 1
  hidePopover()
}

const showOptions = (event: Event) => {
  overlay.value.toggle(event)
}

const skipExercise = () => {
  changeColor('rgb(162,34,35)')
  hidePopover()
}

const changeAlternative = (alternative: string) => {
  exerciseAlternative.value = alternative
  hidePopover()
}

const hidePopover = () => {
  overlay.value.hide()
}

const changeColor = (color: string) => {
  exerciseColor.value = color
}

const hasAlternatives = (numberOfAlternatives: number) => {
  return numberOfAlternatives > 0
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
  box-shadow: 0 0 7px black;
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

</style>
