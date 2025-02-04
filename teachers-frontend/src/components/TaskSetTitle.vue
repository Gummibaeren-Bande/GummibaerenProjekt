<!-- Displays the title of the data set. -->
<template>
  <div class="TaskSetTitle">
    <h1>Projekt der Gummibärenbande</h1>
    <Button class="buttonColor" icon="pi pi-qrcode" @click="showQrCode" rounded />
    <QrCodePopup :visible="qrCodeVisible" @hide="closeQrCode"></QrCodePopup>
  </div>
</template>

<script setup lang="ts">
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

<style>
.TaskSetTitle {
  font-size: x-large;
  width: 100%;
  background: white;
  color: black;
  display: flex;
  align-items: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  margin-bottom: 0.2%;
  position: relative;
}

.TaskSetTitle h1 {
  padding: 1%;
  flex: 1;
  text-align: center;
}

/* Style for the button */
.TaskSetTitle .p-button {
  margin-right: 0.75%;
}

.buttonColor {
  --p-button-primary-background: #009682;
  --p-button-primary-border-color: #009682;
  --p-button-primary-hover-background: #00baa1;
  --p-button-primary-hover-border-color: #00baa1;
}
</style>
