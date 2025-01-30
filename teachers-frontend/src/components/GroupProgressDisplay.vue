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
            <th
              v-for="task in currentState.tasks"
              :key="task.name"
              class="task-header sticky-header"
            >
              {{ task.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in currentState.groups" :key="group.name">
            <td class="sticky-column">
              <span :class="{ endTimer: group.groupProgress.finishedWork }">
                {{ group.name }}
              </span>
              <div :class="{ endTimer: group.groupProgress.finishedWork }">
                {{ displayEndTime(group.groupProgress.finishedAfterSeconds) }}
              </div>
            </td>
            <td v-for="task in currentState.tasks" :key="task.name" class="task-cell">
              <ExerciseDisplay
                :serverConnection="serverConnection"
                :trackableTask="
                  group.groupProgress.progress.find(
                    (trackableTask) => trackableTask.task.name === task.name,
                  )!
                "
                :groupName="group.name"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ScrollPanel>
</template>

<script lang="ts" setup>
import ExerciseDisplay from './ExerciseDisplay.vue'
import ScrollPanel from 'primevue/scrollpanel'
import ServerConnection from '@/ServerConnection'
import CurrentStateDTO from '../../../shared-backend/src/dtos/CurrentStateDTO'
import emptyCurrentStateDTO from '../../../shared-backend/src/dtos/emptyCurrentStateDTO'
</script>

<script lang="ts">
export default {
  props: {
    serverConnection: {
      type: ServerConnection,
      required: true,
    },
  },
  data() {
    return {
      currentState: emptyCurrentStateDTO,
    }
  },
  mounted() {
    this.setListener()
    this.serverConnection.requestCurrentState()
  },
  methods: {
    setListener() {
      this.serverConnection.onServerUpdateDo((groupSet: CurrentStateDTO) => {
        console.log('new group Set')
        this.currentState = groupSet
        console.log(this.currentState)
      })
    },
    /* displays a timer if the group is finished. */
    displayEndTime(seconds: number | null): string {
      if (seconds === null || seconds === 0) {
        return ''
      }
      const min = Math.floor(seconds / 60)
      const sec = Math.floor(seconds % 60)
      if (min > 60) {
        const hours = Math.floor(min / 60)
        return `${String(hours).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
      }
      return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    },
  },
}
</script>

<style>
.outer-div {
  background: white;
  font-size: 20px;
  color: black;
  width: 100%;
  overflow: auto;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 1%;
  box-sizing: border-box;
}

.inner-div {
  max-height: 75vh;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
}

.exercise-display {
  text-align: center;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  border-collapse: collapse;
}

.exercise-display th,
.exercise-display td {
  padding: 0;
  padding-right: 10px;
  box-sizing: border-box;
}

.endTimer {
  font-weight: bold;
  color: rgb(140, 182, 60);
}

.sticky-column {
  position: sticky;
  background: white;
  left: 0;
  z-index: 2;
  border-top: 2px solid #009682;
}

.sticky-header {
  position: sticky;
  background: white;
  top: 0;
  z-index: 1;
  border: none;
}

.top-left-cell {
  z-index: 3;
}

.task-header {
  max-width: 150px;
  overflow-wrap: break-word;
  white-space: normal;
  border-bottom: 2px solid #009682;
}

.task-cell {
  max-width: 150px;
  overflow-wrap: break-word;
  white-space: normal;
  border-top: 2px solid #009682;
}
</style>
