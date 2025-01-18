<template>
  <Dialog :visible="true" :closable="false" :modal="true" class="custom-dialog">
    <div class="header-container">
      <h2 class="dialog-header">Mit Teamname einloggen</h2>
      <Button @click="close()" class="p-button-rounded p-button-text help-icon">X</Button>
    </div>
    <div class="content-container">
      <InputText class="teamname-input" v-model="groupName" placeholder="Teamname eingeben" />
    </div>
    <div class="footer-container">
      <Button @click="handleSignIn()" class="start-button">Starten</Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ServerConnection from '@/ServerConnection'
</script>

<script lang="ts">
const TEAM_NAME_CONFIG = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20,
  VALID_CHARACTER_REGEX: /^[A-Za-zäöüÄÖÜ0-9\s]+$/,
}

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
    /**
     * Handles the sign-in process by validating the group name and authenticating the group.
     * @param {Function} closeCallback - Function to close the dialog.
     */
    async handleSignIn(): Promise<void> {
      if (this.testGroupName(this.groupName) && (await this.reconnectToGroup(this.groupName))) {
        this.pushGroupNameToURL()
        this.$emit('joined-group', this.groupName) // Emit the group name
        this.close()
      } else {
        this.groupName = ''
      }
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
              resolve(true)
            } else {
              this.diplayGroupCreationError(response.message)
              resolve(false)
            }
          },
        )
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
