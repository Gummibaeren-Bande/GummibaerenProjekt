<template>
  <Dialog :visible="true" :closable="false" class="custom-dialog main-variables" :draggable="false">
    <div class="header-container">
      <h2 class="dialog-header">Wiederverbinden</h2>
      <Button @click="close()" icon="pi pi-times" rounded variant="text" aria-label="Cancel" />
    </div>
    <div class="content-container">
      <InputText
        class="teamname-input"
        @keydown.enter="reconnectToGroup(groupName)"
        v-model="groupName"
        placeholder="Teamname eingeben"
      />
    </div>
    <div class="footer-container">
      <Button @click="reconnectToGroup(groupName)" class="start-button">Weiterarbeiten</Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import '@/assets/frontend.css'
import 'primeicons/primeicons.css'
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
      groupName: '',
    }
  },
  methods: {
    close(): void {
      this.$emit('close')
    },

    async openReconnect(): Promise<void> {
      console.log('trying to reconnect')
    },

    /**
     * Authenticates the group by sending the group name to the server.
     * @param {string} name - The name of the group to authenticate.
     * @returns {Promise<boolean>} - Returns `true` if the group is authenticated successfully, otherwise `false`.
     */
    async reconnectToGroup(name: string): Promise<boolean> {
      const response = await this.serverConnection.reconnectToGroup(name)
      return new Promise((resolve) => {
        if (response.success) {
          this.displayGroupCreationSuccess(response.message)
          this.pushGroupNameToURL()
          this.$emit('joined-group', this.groupName) // Emit the group name
          this.close()
          resolve(true)
        } else {
          this.displayGroupCreationError(response.message)
          this.groupName = ''
          resolve(false)
        }
      })
    },

    /**
     * pushes the groupName to the URL as a parameter without reloading the page
     */
    pushGroupNameToURL() {
      // Get the current URL
      const currentUrl = new URL(window.location.href)
      // Set the "group" query parameter
      currentUrl.searchParams.set('group', this.groupName)
      // Update the browser's URL without reloading the page
      window.history.pushState({}, '', currentUrl)
    },

    /**
     * Displays a group creation error
     * @param error the error message to display
     */
    displayGroupCreationError(error: string) {
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
    displayGroupCreationSuccess(message: string) {
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
