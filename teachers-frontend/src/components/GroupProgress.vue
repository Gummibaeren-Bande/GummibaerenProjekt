<!-- Implements the data table that houses all the groups progress.
 The table contains a header which displays all the tasks names.
 Each column of the table represents a group and displays the different tasks.
 Also displays a timer for each task. -->

<template>
  <div class="table-div">
    <table class="exercise-display">
      <thead class="table-header">
        <tr>
          <th>Gruppenname</th>
          <th v-for="task in tasks" :key="task.name">
            {{ task.displayName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.groupName">
          <td>
            <span :class="{ endTimer: isFinished(group.finishedAfterSeconds) }">
              {{ group.groupName }}
            </span>
            <div :class="{ endTimer: isFinished(group.finishedAfterSeconds) }">
              {{ displayEndTime(group.finishedAfterSeconds) }}
            </div>
          </td>
          <td v-for="task in tasks" :key="task.name">
            <ExerciseDisplay
              :task="group.tasks.find((t) => t.name === task.name)"
              :numberOfAlternatives="task.numberOfAlternatives"
            >
            </ExerciseDisplay>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ExerciseDisplay from './ExerciseDisplay.vue'

/* Dummy Werte */
const tasks = ref([
  { name: 'task1', displayName: 'Schnecken snacken', numberOfAlternatives: 3 },
  { name: 'task2', displayName: 'Kekse knuspern', numberOfAlternatives: 0 },
  {
    name: 'task3',
    displayName: 'Supercalifragilisticexpialigetisch süffeln',
    numberOfAlternatives: 0,
  },
  { name: 'task4', displayName: 'Maulwürfe mampfen', numberOfAlternatives: 2 },
  { name: 'task5', displayName: 'Eichhörnchen essen', numberOfAlternatives: 0 },
  {
    name: 'task6',
    displayName: 'fürchterlich furchtsame Füchse fliegend fressen',
    numberOfAlternatives: 4,
  },
  { name: 'task7', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
])

/* Dummy Werte */
const groups = ref([
  { groupName: 'beige Braunbären', tasks: tasks, finishedAfterSeconds: 123 },
  { groupName: 'erbsengrüne Eisbären', tasks: tasks, finishedAfterSeconds: 2345 },
  { groupName: 'goldgelbe Gummibären', tasks: tasks, finishedAfterSeconds: 4343 },
  { groupName: 'türkisgrünbläuliche Terrabären', tasks: tasks, finishedAfterSeconds: 0 },
  { groupName: 'kastaniengraue Kragenbären', tasks: tasks, finishedAfterSeconds: 6456 },
  { groupName: 'pinke Pandabären', tasks: tasks, finishedAfterSeconds: 21352 },
  { groupName: 'limettengrüne Lippenbären', tasks: tasks, finishedAfterSeconds: 0 },
])

/* displays a timer if the group is finished. */
const displayEndTime = (seconds: number): string => {
  if (seconds === 0) return ''
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  if (min > 60) {
    const hours = Math.floor(min / 60)
    return `${String(hours).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

/* Checks whether a group is finished. */
const isFinished = (seconds: number): boolean => {
  return seconds !== 0
}
</script>

<style scoped>
.table-div {
  overflow-x: auto;
  font-size: 20px;
  color: #ffffff66;
  padding: 10px;
}

.exercise-display {
  text-align: center;
  width: 100%;
  padding: 10px;
}

.endTimer {
  font-weight: bold;
  color: rgb(140, 182, 60);
}
</style>
