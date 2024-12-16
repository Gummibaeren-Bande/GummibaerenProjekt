<!-- Implements a timer that shows the time in minutes and seconds starting by 00:00.
 Has methods to start and stop the timer. The timer ist displayed in a component. -->

<template>
    <div class="timer">
        <span>{{ formattedTime }}</span>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'Timer',
    setup() {
      const time = ref(0);
      let interval = null;
  
      const startTimer = () => {
        interval = setInterval(() => {
          time.value++;
        }, 1000);
      };
  
      const stopTimer = () => {
        clearInterval(interval);
      };
  
      const formattedTime = computed(() => {
        const minutes = Math.floor(time.value / 60).toString().padStart(2, '0');
        const seconds = (time.value % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      });
  
      return {
        formattedTime,
        startTimer,
        stopTimer
      };
    }
  };
  </script>
  
  <style scoped>
  .timer {
    font-size: 26px;
    font-weight: bold;
    color:#ffffff66;

  }

  </style>