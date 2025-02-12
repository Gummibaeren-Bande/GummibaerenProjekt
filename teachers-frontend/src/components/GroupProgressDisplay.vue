<!-- Implements the data table that houses all the groups progress.
 The table contains a header which displays all the tasks names.
 Each column of the table represents a group and displays the different tasks.
 Also displays a timer for each task. -->

<template>
  <ScrollPanel class="dataTableContainer">
    <div class="dataTable">
      <table class="exerciseInDataTable">
        <thead>
          <tr>
            <th class="stickyColumn stickyHeader topLeftCell">Gruppenname</th>
            <th v-for="task in currentState.tasks" :key="task.id" class="stickyHeader">
              {{ task.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in currentState.groups" :key="group.name">
            <td class="stickyColumn">
              <span :class="{ endTimer: group.groupProgress.finishedWork }">
                {{ group.name }}
              </span>
              <div :class="{ endTimer: group.groupProgress.finishedWork }">
                {{ displayEndTime(group.groupProgress.finishedAfterSeconds) }}
              </div>
            </td>
            <td v-for="task in currentState.tasks" :key="task.id">
              <ExerciseDisplayNew
                :serverConnection="serverConnection"
                :trackableTask="
                  group.groupProgress.progress.find(
                    (trackableTask) => trackableTask.task.id === task.id,
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
import '@/assets/frontend.css'
import ExerciseDisplayNew from './ExerciseDisplay.vue'
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
