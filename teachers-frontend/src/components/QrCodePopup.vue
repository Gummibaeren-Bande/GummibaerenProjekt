<template>
  <div>
    <Dialog
      v-model:visible="isVisible"
      @hide="$emit('hide')"
      maximizable
      header="Als Gruppe beitreten"
      pt:mask:class="backdrop-blur-sm"
      :dismissableMask="true"
      :draggable="false"
      :modal="true"
    >
      <div>
        <canvas class="qrCode" id="qrCodeCanvas" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import '@/assets/frontend.css'
import QRCode from 'qrcode'
import Dialog from 'primevue/dialog'
import { nextTick } from 'vue'
</script>

<script lang="ts">
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
    }
  },
  watch: {
    async visible(current) {
      this.isVisible = current
      if (current) {
        await nextTick()
        this.drawQrCode()
      }
    },
  },
  methods: {
    drawQrCode() {
      const url = (import.meta.env.VITE_SERVER_URL as string).replace(
        ':3000/teachers',
        ':8080/aks/',
      )
      QRCode.toCanvas(document.getElementById('qrCodeCanvas'), url, { scale: 50 })
    },
  },
}
</script>
