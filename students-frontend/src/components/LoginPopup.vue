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
    handleSignIn(closeCallback: () => void) {
      if (this.testGroupName(this.groupName)) {
        console.log(`Signing in with groupname: ${this.groupName}`)
        this.authentificateGroup(this.groupName)
        // TODO: handle authentification error
        closeCallback() // Close the dialog
      } else {
        this.groupName = ''
      }
    },

    /**
     * Authenticates the group by sending the group name to the server.
     * @param {string} name - The name of the group to authenticate.
     */
    authentificateGroup(name: string) {
      socket.emit('addGroup', name, (response: { success: boolean; message: string }) => {
        if (response.success) {
            console.log("Team added successfully:", response.message);
            // Handle successful addition (e.g., update UI, notify user)
        } else {
            console.error("Failed to add group:", response.message);
            // Handle failure (e.g., show error message to the user)
        }
    });
    },

    /**
     * Validates the provided group name based on several rules.
     * @param {string} name - The group name to validate.
     * @returns {boolean} - Returns `true` if the name is valid, otherwise `false`.
     */
    testGroupName(name: string) {
      if (this.isEmpty(name)) {
        alert('Bitte gebe einen Teamnamen ein!')
        return false
      } else if (this.isNotRequiredLength(name)) {
        alert(
          `Der Teamname muss zwischen ${TEAM_NAME_CONFIG.MIN_LENGTH} und ${TEAM_NAME_CONFIG.MAX_LENGTH} Zeichen lang sein!`,
        )
        return false
      } else if (this.startsWithSpace(name)) {
        alert('Der Teamname muss mit einem Buchstaben beginnen!')
        return false
      } else if (this.endsWithSpace(name)) {
        alert('Der Teamname darf nicht mit einem Leerzeichen enden!')
        return false
      } else if (this.hasIllegalCharacters(name)) {
        alert('Der Teamname darf nur aus Buchstaben, Leerzeichen und Zahlen bestehen!')
        return false
      }
      return true
    },

    /**
     * Checks if the provided text is empty.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text is empty, otherwise `false`.
     */
    isEmpty(text: string) {
      return text.length === 0
    },

    /**
     * Checks if the provided text is not within the required length range.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text is too short or too long, otherwise `false`.
     */
    isNotRequiredLength(text: string) {
      const length = text.length
      return length < TEAM_NAME_CONFIG.MIN_LENGTH || length > TEAM_NAME_CONFIG.MAX_LENGTH
    },

    /**
     * Checks if the provided text starts with a space.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text starts with a space, otherwise `false`.
     */
    startsWithSpace(text: string) {
      return text.startsWith(' ')
    },

    /**
     * Checks if the provided text ends with a space.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text ends with a space, otherwise `false`.
     */
    endsWithSpace(text: string) {
      return text.endsWith(' ')
    },

    /**
     * Checks if the provided text contains illegal characters.
     * @param {string} text - The text to check.
     * @returns {boolean} - Returns `true` if the text contains illegal characters, otherwise `false`.
     */
    hasIllegalCharacters(text: string) {
      const validCharacterRegex = TEAM_NAME_CONFIG.VALID_CHARACTER_REGEX
      return !validCharacterRegex.test(text)
    },
  },
}
</script>
