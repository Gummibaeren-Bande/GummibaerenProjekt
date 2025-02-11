<!-- Displays the title of the data set. -->
 
<template>
  <div class="TaskSetTitle">
    <h1>Projekt der Gummibärenbande</h1>
    <Button class="qrCodeButton" icon="pi pi-qrcode" @click="showQrCode" rounded />
    <QrCodePopup :visible="qrCodeVisible" @hide="closeQrCode"></QrCodePopup>
  </div>
</template>

<script setup lang="ts">
import '@/assets/frontend.css'
import QrCodePopup from './QrCodePopup.vue'
import Button from 'primevue/button'
</script>

<script lang="ts">
export default {
  data() {
    return {
      qrCodeVisible: false,
    }
  },
  methods: {
    showQrCode() {
      this.qrCodeVisible = true
    },
    closeQrCode() {
      this.qrCodeVisible = false
    },
  },
}
</script>
