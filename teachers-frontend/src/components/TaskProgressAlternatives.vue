<!-- Implements a component that displays a task with alternative tasks.
 On press opens an overlay with options to skip the task or select the alternatives.
 Has methods to increment the attempts, change the display color and change the alternative.  -->

<template>
  <div id="task">
    <Button @click="showOptions" class="taskAlternativeDisplayButton">
      <div id="taskAlternativeDisplay" :style="{ backgroundColor: taskColor }">
        <span>
          {{ attempts }}
        </span>
      </div>
    </Button>
    <div id="alternativeDisplay" :style="{ backgroundColor: taskColor }">
      <span>
        {{ taskAlternative }}
      </span>
    </div>
    <Popover ref="overlay">
      <span> Optionen </span>
      <div>
        <Button label="text" @click="skipTask" />
      </div>
      <div>
        <Button label="attempted" @click="incrementAttempts" />
      </div>
      <div>
        <Button label="Alternative B" @click="changeAlternative('B')" />
      </div>
      <div>
        <Button label="Alternative C" @click="changeAlternative('C')" />
      </div>
      <div>
        <Button label="Alternative D" @click="changeAlternative('D')" />
      </div>
    </Popover>
    <div>
      <Timer></Timer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Timer from '@/components/Timer.vue'
import Popover from 'primevue/popover'

const taskColor = ref('rgb(64, 64, 64)')
const attempts = ref(0)
const taskAlternative = ref('A')
const overlay = ref()

const changeColor = (color: string) => {
  taskColor.value = color
}

const incrementAttempts = () => {
  attempts.value += 1
}

const changeAlternative = (alternative: string) => {
  taskAlternative.value = alternative
}

const showOptions = (event: Event) => {
  overlay.value.toggle(event)
}

const skipTask = () => {
  changeColor('rgb(162, 34, 35)')
}
</script>

<style scoped>
#task {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#taskAlternativeDisplay {
  height: 75px;
  width: 75px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: black;
  border: none;
}

#alternativeDisplay {
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
  top: -10px;
  right: -10px;
  box-shadow: 0 0 7px black;
}

.taskAlternativeDisplayButton {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
</style>
