<!-- Implements the data table that houses all the groups progress.
 The table contains a header which displays all the tasks names.
 Each column of the table represents a group and displays the different tasks.
 Also displays a timer for each task. -->

<template>
  <ScrollPanel class="outer-div">
    <div class="inner-div">
      <table class="exercise-display">
        <thead class="table-header">
          <tr>
            <th class="sticky-column sticky-header top-left-cell">Gruppenname</th>
            <th v-for="task in tasks" :key="task.name" class="task-header sticky-header">
              {{ task.displayName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group.groupName">
            <td class="sticky-column">
              <span :class="{ endTimer: isFinished(group.finishedAfterSeconds) }">
                {{ group.groupName }}
              </span>
              <div :class="{ endTimer: isFinished(group.finishedAfterSeconds) }">
                {{ displayEndTime(group.finishedAfterSeconds) }}
              </div>
            </td>
            <td v-for="task in tasks" :key="task.name" class="task-cell">
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
  </ScrollPanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ExerciseDisplay from './ExerciseDisplay.vue'
import ScrollPanel from 'primevue/scrollpanel'

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
  { name: 'task8', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task9', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task10', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task11', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task12', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task13', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task14', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task15', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task16', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task17', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
  { name: 'task18', displayName: 'Bärchen backen', numberOfAlternatives: 0 },
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
.outer-div {
  font-size: 20px;
  color: #ffffff66;
  max-width: 1190px;
  min-height: 650px;
  overflow: auto; /* Enable both vertical and horizontal scrolling */
}

.inner-div {
  max-height: 650px;
  overflow-y: auto; /* Enable vertical scrolling */
}

@media (min-width: 1600px) and (max-width: 2120px) {
  .outer-div {
    width: 90%;
    max-width: 1820px;
  }
  .inner-div {
    max-height: 800px;
  }
}

@media (orientation: portrait) {
  .outer-div {
    width: 90%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }
  .inner-div {
    max-height: 58rem;
  }
}

.exercise-display {
  text-align: center;
  width: 100%;
  padding: 0; /* Remove padding */
  border-collapse: collapse; /* Remove borders */
}

.exercise-display th,
.exercise-display td {
  border: none; /* Remove borders */
  padding: 0; /* Remove padding */
  padding-right: 10px; /* Add padding to the right */
}

.endTimer {
  font-weight: bold;
  color: rgb(140, 182, 60);
}

.sticky-column {
  position: sticky;
  left: 0;
  background-color: rgb(0, 150, 130);
  z-index: 2;
}

.sticky-header {
  position: sticky;
  top: 0;
  background-color: rgb(0, 150, 130);
  z-index: 1;
}

.top-left-cell {
  z-index: 3; /* Ensure it overlays both the sticky row and column */
}

.task-header,
.task-cell {
  max-width: 150px; /* Set your desired max width here */
  overflow-wrap: break-word;
  white-space: normal;
}
</style>
