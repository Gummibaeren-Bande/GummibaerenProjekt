<template>
    <Dialog v-model:visible="visible" unstyled 
    class="RigthWrongOverlay borderRadiusTopLeft borderRadiusTopRight borderRadiusBottomRight borderRadiusBottomLeft" 
    :class="{ RigthColor: isRight, WrongColor: !isRight }">
        <template #container="{ closeCallback }">
            <div class="textColor textNormall textBold textMargin">
                {{ isRight ? 'Richtig' : 'Falsch' }}
            </div>
            <div class="textColor textNormall textMargin">
                {{ isRight ? "Drücke auf weiter wenn du zur nächsten Aufgabe möchtest.": "Leider falsche. Versuche es doch nochmal." }}
            </div>
            <div class="RigthWrongOverlayButton textColor">
                <Button id="tester" @click="weiter()" label="Weiter" />
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
#tester {
    color: black;
}
</style>

<script lang="ts">
import Button from 'primevue/button';
import './Task.css'
import Dialog from 'primevue/dialog'
import { defineComponent } from 'vue'

export default defineComponent ({
    components: {
        Dialog,
        Button
    },
    emits: ['weiter'],
    props: {
        isRight: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        weiter() {
            this.$emit('weiter')
        }
    }
})
</script>