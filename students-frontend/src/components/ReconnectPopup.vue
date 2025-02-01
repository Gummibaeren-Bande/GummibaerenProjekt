<template>
  <Dialog :visible="true" :closable="false" class="custom-dialog main-variabls" :draggable="false">
    <div class="header-container">
      <h2 class="dialog-header">Wiederverbinden:</h2>
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
import '@/assets/Frontend.css'
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
          this.diplayGroupCreationSuccess(response.message)
          this.pushGroupNameToURL()
          this.$emit('joined-group', this.groupName) // Emit the group name
          this.close()
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

<style>
.custom-dialog {
  position: relative;
  display: flex;
  width: 50%;
  min-width: 250px;
  flex-direction: column;
  padding: 1%;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 10px;
  left: 20px;
  right: 20px;
}

.dialog-header {
  margin: 0;
  font-size: 1.5rem;
}

.help-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.content-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px; /* Adjust spacing below the header */
}

.teamname-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
}

.footer-container {
  flex-grow: 1; /* Allow the footer to expand */
  display: flex;
  justify-content: center;
  align-items: center; /* Vertically center the button */
}

.start-button {
  margin-top: 50px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
