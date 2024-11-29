<template>
    <Dialog v-model:visible="visible" :style="{ width: '25rem' }">
        <template #container="{ closeCallback }">
            <div style="margin: 8%; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 10%;">
                <div>
                    <label for="teamName"><h2>Wähle einen Teamnamen</h2></label>
                </div>
                <div>
                    <InputText id="teamName" v-model="teamName"></InputText>
                </div>
                <div>
                    <Button label="Starten" @click="handleSignIn(closeCallback)" text></Button>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { io } from "socket.io-client";
</script>

<script lang="ts">

const TEAM_NAME_CONFIG = {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    VALID_CHARACTER_REGEX: /^[A-Za-zäöüÄÖÜ0-9\s]+$/,
};

const socket = io('http://localhost:3000');

socket.on("connect", () => {
    console.log(`connected to socket id ${socket.id}` );
});

export default {
    data() {
        return {
            visible: true,
            teamName: '',
        };
    },
    methods: {
        handleSignIn(closeCallback: () => void) {
            if (this.testTeamName(this.teamName)) {
                console.log(`Signing in with teamname: ${this.teamName}`);
                this.authentificateTeam(this.teamName)
                // TODO: handle authentification error
                closeCallback(); // Close the dialog
            } else {
                this.teamName = '';
            }
        },
        authentificateTeam(name: string) {
            socket.emit('add-team', name);
        },
        testTeamName(name: string) {
            if (this.isEmpty(name)) {
                alert('Bitte gebe einen Teamnamen ein!');
                return false;
            }
            else if (this.isNotRequiredLength(name)) {
                alert(`Der Teamname muss zwischen ${TEAM_NAME_CONFIG.MIN_LENGTH} und ${TEAM_NAME_CONFIG.MAX_LENGTH} Zeichen lang sein!`);
                return false;
            }
            else if (this.startsWithSpace(name)) {
                alert('Der Teamname muss mit einem Buchstaben beginnen!');
                return false;
            }
            else if (this.endsWithSpace(name)) {
                alert('Der Teamname darf nicht mit einem Leerzeichen enden!');
                return false;
            }
            else if (this.hasIllegalCharacters(name)) {
                alert('Der Teamname darf nur aus Buchstaben, Leerzeichen und Zahlen bestehen!');
                return false;
            }
            return true;
        },
        isEmpty(text: string) {
            return text.length === 0;
        },
        isNotRequiredLength(text: string) {
            const length = text.length
            return length <= TEAM_NAME_CONFIG.MIN_LENGTH || length >= TEAM_NAME_CONFIG.MAX_LENGTH;
        },
        startsWithSpace(text: string) {
            return text.startsWith(' ')
        },
        endsWithSpace(text: string) {
            return text.endsWith(' ')
        },
        hasIllegalCharacters(text: string) {
            const validCharacterRegex = TEAM_NAME_CONFIG.VALID_CHARACTER_REGEX;
            return !validCharacterRegex.test(text)
        } 
    },
};
</script>
