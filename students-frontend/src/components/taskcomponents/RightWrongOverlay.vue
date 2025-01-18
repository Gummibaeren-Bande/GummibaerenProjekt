<template>
  <Dialog
    v-model:visible="visible"
    unstyled
    class="RigthWrongOverlay borderRadiusTopLeft borderRadiusTopRight borderRadiusBottomRight borderRadiusBottomLeft"
    :class="{ RigthColor: isRight, WrongColor: !isRight }"
  >
    <template #container="{ closeCallback }">
      <div class="marginOverlay">
        <div class="textColor textNormal textBold textMargin">
          {{ isRight ? 'Richtig' : 'Falsch' }}
        </div>
        <div class="textColor textNormal textMargin">
          {{ isRight ? rightText : wrongText }}
        </div>
        <div class="RigthWrongOverlayButton textColor">
          <Button @click="continueWithQuestion()" label="Weiter" id="textColor" />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import './Task.css'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Dialog,
    Button,
  },
  emits: ['continueWithQuestion'],
  props: {
    isRight: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    rightText: {
      type: String,
      default: 'Drücke auf weiter wenn du zur nächsten Aufgabe möchtest',
    },
    wrongText: {
      type: String,
      default: 'Leider falsch. Versuche es doch nochmal.',
    },
  },
  methods: {
    continueWithQuestion() {
      this.$emit('continueWithQuestion')
    },
  },
})
</script>

<style scoped>
#textColor {
  color: black;
}
</style>
