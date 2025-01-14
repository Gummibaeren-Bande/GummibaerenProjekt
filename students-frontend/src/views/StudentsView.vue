<template>
  <div>
    <TaskDisplay :socket="socket" :group-name="groupName" v-if="groupIsSpecified" />
    <LoginPopup v-else @group-selected="onGroupSelected" :socket="socket" />
  </div>
</template>

<script setup lang="ts">
import { Socket } from 'socket.io-client'
import LoginPopup from '../components/LoginPopup.vue'
import TaskDisplay from '../components/TaskDisplay.vue'
</script>

<style>
body {
  background-color: #009682;
}
</style>

<script lang="ts">
export default {
  props: {
    socket: {
      type: Socket,
      required: true,
    },
  },
  data() {
    return {
      groupName: '',
      groupIsSpecified: false,
    }
  },
  mounted() {
    this.parseURLparams()
  },
  methods: {
    /**
     * parse the groupName specified in the URL to make reloads possible
     */
    parseURLparams() {
      const groupInURL = new URL(window.location.href).searchParams.get('group')
      if (!groupInURL) {
        this.groupIsSpecified = false
        return
      }
      this.groupIsSpecified = true
      this.groupName = groupInURL
    },

    /**
     * Handles the event emitted by the LoginPopup when a group is selected.
     * @param {string} groupName - The selected group name.
     */
    onGroupSelected(groupName: string) {
      this.groupName = groupName
      this.groupIsSpecified = true
    },
  },
}
</script>
