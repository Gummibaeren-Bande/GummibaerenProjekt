<template>
  <Dialog v-model:visible="visible" :closable="false" :modal="true" class="custom-dialog">
    <div class="header-container">
      <h2 class="dialog-header">Wähle einen Teamnamen</h2>
      <Button @click="openReconnect()" rounded variant="text"  icon="pi pi-sign-in" />
    </div>
    <div class="content-container">
      <InputText
        class="teamname-input"
        @keydown.enter="authentificateGroup(groupName)"
        v-model="groupName"
        placeholder="Teamname eingeben"
      />
    </div>
    <div class="footer-container">
      <Button class="start-button" @click="authentificateGroup(groupName)">Starten</Button>
    </div>
  </Dialog>
  <ReconnectPopup
    v-if="reconnectGroupVisible"
    :server-connection="serverConnection"
    @close="reconnectPopupOnClose()"
    @joined-group="validGroupSelected"
  ></ReconnectPopup>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import ReconnectPopup from './ReconnectPopup.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ServerConnection from '@/ServerConnection'
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
      visible: true,
      groupName: '',
      reconnectGroupVisible: false,
    }
  },
  methods: {
    /**
     * signals to the mother component that a valid group was selected
     *
     * @param groupName the selected group
     */
    validGroupSelected(groupName: string) {
      this.pushGroupNameToURL(groupName)
      this.$emit('group-selected', groupName) // Emit the group name
      this.visible = false
    },

    /**
     * opens the reconnection popup
     */
    async openReconnect(): Promise<void> {
      this.reconnectGroupVisible = true
    },

    /**
     * hides the reconnection popup
     */
    reconnectPopupOnClose(): void {
      this.reconnectGroupVisible = false
    },

    /**
     * Authenticates the group by sending the group name to the server.
     * @param {string} name - The name of the group to authenticate.
     * @returns {Promise<boolean>} - Returns `true` if the group is authenticated successfully, otherwise `false`.
     */
    async authentificateGroup(name: string): Promise<boolean> {
      const response = await this.serverConnection.authentificateGroup(name)
      return new Promise((resolve) => {
        if (response.success) {
          this.diplayGroupCreationSuccess(response.message)
          this.validGroupSelected(name)
          resolve(true)
        } else {
          this.diplayGroupCreationError(response.message)
          this.groupName = ''
          resolve(false)
        }
      })
    },

    /**
     * pushes the groupName to the URL as a parameter without reloading the page
     */
    pushGroupNameToURL(groupName: string) {
      // Get the current URL
      const currentUrl = new URL(window.location.href)
      // Set the "group" query parameter
      currentUrl.searchParams.set('group', groupName)
      // Update the browser's URL without reloading the page
      window.history.pushState({}, '', currentUrl)
    },

    /**
     * Displays a group creation error
     * @param error the error message to display
     */
    diplayGroupCreationError(error: string) {
      this.$toast.add({
        severity: 'error',
        summary: 'Fehler beim Erstellen der Gruppe',
        detail: error,
        life: 4000,
      })
    },

    /**
     * Displays a group creation success
     * @param message the success message to display
     */
    diplayGroupCreationSuccess(message: string) {
      this.$toast.add({
        severity: 'success',
        summary: 'Gruppenerstellung erfolgreich',
        detail: message,
        life: 4000,
      })
    },
  },
}
</script>
