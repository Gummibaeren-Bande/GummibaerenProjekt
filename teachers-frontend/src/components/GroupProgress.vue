<!-- Implements the data table that houses all the groups progress.
 The table contains a header which displays all the tasks names.
 Each column of the table represents a group and displays the different tasks.
 Also displays a timer for each task. -->

<template>
  <div class="table-div">
    <table class="exercise-display">
      <thead>
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
            {{ group.groupName }}
            <Timer></Timer>
          </td>
          <td v-for="task in tasks" :key="task.name">
            <ExerciseDisplay
              :task="group[task.name]"
              :numberOfAlternatives="task.numberOfAlternatives"
            >
            </ExerciseDisplay>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import ExerciseDisplay from './ExerciseDisplay.vue'
import Timer from './Timer.vue'

export default {
  components: {
    ExerciseDisplay,
    Timer,
  },
  setup() {
    const groups = ref([
      { groupName: 'beige Braunbären' },
      { groupName: 'erbsengrüne Eisbären' },
      { groupName: 'goldgelbe Gummibären' },
      { groupName: 'türkisgrünbläuliche Terrabären' },
      { groupName: 'kastaniengraue Kragenbären' },
      { groupName: 'pinke Pandabären' },
      { groupName: 'limettengrüne Lippenbären' },
    ])

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

    return {
      groups,
      tasks,
    }
  },
}
</script>

<style scoped>
.table-div {
  overflow-x: auto;
  padding: 10px;
}

.exercise-display {
  text-align: center;
  width: 100%;
  padding: 10px;
}
</style>
