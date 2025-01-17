<template>
  <Dialog v-model:visible="visible" :closable="false" :modal="true" class="custom-dialog">
    <div class="header-container">
      <h2 class="dialog-header">Wähle einen Teamnamen</h2>
      <Button @click="openReconnect()" class="p-button-rounded p-button-text help-icon">?</Button>
    </div>
    <div class="content-container">
      <InputText class="teamname-input" v-model="groupName" placeholder="Teamname eingeben" />
    </div>
    <div class="footer-container">
      <Button class="start-button" @click="handleSignOn()">Starten</Button>
    </div>
  </Dialog>
  <ReconnectPopup
    v-if="reconnectGroupVisible"
    :socket="socket"
    @close="reconnectPopupOnClose()"
    @joined-group="validGroupSelected"
  ></ReconnectPopup>
</template>

<script setup lang="ts">
import ReconnectPopup from './ReconnectPopup.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { io, Socket } from 'socket.io-client'
</script>

<script lang="ts">
const TEAM_NAME_CONFIG = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20,
  VALID_CHARACTER_REGEX: /^[A-Za-zäöüÄÖÜß0-9\s]+$/,
}

// socket for backend communication
const socket = io('http://localhost:3000/students')

socket.on('connect', () => {
  console.log(`connected to socket id ${socket.id}`)
})

export default {
  props: {
    socket: {
      type: Socket,
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
     * Handles the sign-on process by validating the group name and authenticating the group.
     * @param {Function} closeCallback - Function to close the dialog.
     */
    async handleSignOn(): Promise<void> {
      if (this.testGroupName(this.groupName) && (await this.authentificateGroup(this.groupName))) {
        this.validGroupSelected(this.groupName)
      } else {
        this.groupName = ''
      }
    },

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
      return new Promise((resolve) => {
        socket.emit('addGroup', name, (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.diplayGroupCreationSuccess(response.message)
            resolve(true)
          } else {
            this.diplayGroupCreationError(response.message)
            resolve(false)
          }
        })
      })
    },

    /**
     * Validates the provided group name based on several rules.
     * @param {string} name - The group name to validate.
     * @returns {boolean} - Returns `true` if the name is valid, otherwise `false`.
     */
    testGroupName(name: string): boolean {
      if (this.isEmpty(name)) {
        this.diplayGroupCreationError('Bitte gebe einen Teamnamen ein!')
        return false
      } else if (this.isNotRequiredLength(name)) {
        this.diplayGroupCreationError(
          `Der Teamname muss zwischen ${TEAM_NAME_CONFIG.MIN_LENGTH} und ${TEAM_NAME_CONFIG.MAX_LENGTH} Zeichen lang sein!`,
        )
        return false
      } else if (this.startsWithSpace(name)) {
        this.diplayGroupCreationError('Der Teamname darf nicht mit einem Leerzeichen beginnen!')
        return false
      } else if (this.endsWithSpace(name)) {
        this.diplayGroupCreationError('Der Teamname darf nicht mit einem Leerzeichen enden!')
        return false
      } else if (this.hasIllegalCharacters(name)) {
        this.diplayGroupCreationError(
          'Der Teamname darf nur aus Buchstaben, Leerzeichen und Zahlen bestehen!',
        )
        return false
      }
      return true
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

    /**
     * Checks if the provided text is empty.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text is empty, otherwise `false`.
     */
    isEmpty(text: string): boolean {
      return text.length === 0
    },

    /**
     * Checks if the provided text is not within the required length range.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text is too short or too long, otherwise `false`.
     */
    isNotRequiredLength(text: string): boolean {
      const length = text.length
      return length < TEAM_NAME_CONFIG.MIN_LENGTH || length > TEAM_NAME_CONFIG.MAX_LENGTH
    },

    /**
     * Checks if the provided text starts with a space.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text starts with a space, otherwise `false`.
     */
    startsWithSpace(text: string): boolean {
      return text.startsWith(' ')
    },

    /**
     * Checks if the provided text ends with a space.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text ends with a space, otherwise `false`.
     */
    endsWithSpace(text: string): boolean {
      return text.endsWith(' ')
    },

    /**
     * Checks if the provided text contains illegal characters.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text contains illegal characters, otherwise `false`.
     */
    hasIllegalCharacters(text: string): boolean {
      const validCharacterRegex = TEAM_NAME_CONFIG.VALID_CHARACTER_REGEX
      return !validCharacterRegex.test(text)
    },
  },
}
</script>
