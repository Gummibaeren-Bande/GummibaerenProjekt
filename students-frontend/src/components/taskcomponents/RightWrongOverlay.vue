<template>
    <Dialog v-model:visible="visible" unstyled 
    class="RigthWrongOverlay borderRadiusTopLeft borderRadiusTopRight borderRadiusBottomRight borderRadiusBottomLeft" 
    :class="{ RigthColor: isRight, WrongColor: !isRight }">
        <template #container="{ closeCallback }">
            <div class="marginOverlay">
                <div class="textColor textNormall textBold textMargin">
                    {{ isRight ? 'Richtig' : 'Falsch' }}
                </div>
                <div class="textColor textNormall textMargin">
                    {{ isRight ? "Drücke auf weiter wenn du zur nächsten Aufgabe möchtest.": "Leider falsche. Versuche es doch nochmal." }}
                </div>
                <div class="RigthWrongOverlayButton textColor">
                    <Button @click="weiter()" label="Weiter" id="textColor" />
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts">
import './Task.css'
import Button from 'primevue/button';
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

<style scoped>
#textColor {
    color: black;
}
</style>