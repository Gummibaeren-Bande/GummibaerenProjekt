<template>
  <div>
    <Toast />
    <StudentsView :socket="socket" />
  </div>
</template>

<script setup lang="ts">
import StudentsView from './views/StudentsView.vue'
import { io, Socket } from 'socket.io-client'
</script>

<script lang="ts">
// socket for backend communication
const socket: Socket = io('http://localhost:3000/students')

socket.on('connect', () => {
  console.log(`connected to socket id ${socket.id}`)
})
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
}
</style>
