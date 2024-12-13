<template>
  <Dialog v-model:visible="visible" :style="{ width: '25rem' }">
    <template #container="{ closeCallback }">
      <div
        style="
          margin: 8%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 10%;
        "
      >
        <div>
          <label for="groupName"><h2>Wähle einen Teamnamen</h2></label>
        </div>
        <div>
          <InputText id="groupName" v-model="groupName"></InputText>
        </div>
        <div>
          <Button label="Starten" @click="handleSignIn(closeCallback)" text></Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { io } from 'socket.io-client'
</script>

<script lang="ts">
const TEAM_NAME_CONFIG = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20,
  VALID_CHARACTER_REGEX: /^[A-Za-zäöüÄÖÜ0-9\s]+$/,
}

// socket for backend communication
const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log(`connected to socket id ${socket.id}`)
})

export default {
  data() {
    return {
      visible: true,
      groupName: '',
    }
  },
  methods: {
    /**
     * Handles the sign-in process by validating the group name and authenticating the group.
     * @param {Function} closeCallback - Function to close the dialog.
     */
    async handleSignIn(closeCallback: () => void): Promise<void> {
      if (this.testGroupName(this.groupName) && (await this.authentificateGroup(this.groupName))) {
        this.pushGroupNameToURL()
        this.$emit('group-selected', this.groupName) // Emit the group name
        closeCallback() // Close the dialog
      } else {
        this.groupName = ''
      }
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
        this.diplayGroupCreationError('Der Teamname muss mit einem Buchstaben beginnen!')
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
