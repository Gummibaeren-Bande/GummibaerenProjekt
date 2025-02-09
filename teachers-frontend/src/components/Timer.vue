<!-- Implements a timer that shows the time in minutes and seconds starting by 00:00.
 Has methods to start and stop the timer. The timer ist displayed in a component. -->
<template>
  <div :class="textColorClass" class="timer">
    {{ displayTime }}
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'TimerComponent',
  props: {
    startTime: {
      type: String as PropType<string | null>,
      default: null,
    },
    finishedAfterSeconds: {
      type: Number as PropType<number | null>,
      default: null,
    },
  },
  data() {
    return {
      currentTime: new Date(),
      intervalId: null as null | NodeJS.Timeout,
    }
  },
  computed: {
    displayTime(): string {
      if (this.finishedAfterSeconds !== null) {
        return this.formatTime(this.finishedAfterSeconds)
      }

      if (this.startTime !== null) {
        const diffSeconds = Math.floor(
          (this.currentTime.getTime() - new Date(this.startTime).getTime()) / 1000,
        )
        return this.formatTime(diffSeconds)
      }

      return this.formatTime(0)
    },
    textColorClass(): Record<string, boolean> {
      return {
        'text-green-500': this.finishedAfterSeconds !== null,
      }
    },
  },
  beforeUnmount() {
    this.stopTimer()
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    formatTime(totalSeconds: number): string {
      if (totalSeconds < 0) {
        totalSeconds = 0
      }
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = Math.floor(totalSeconds % 60)
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    startTimer() {
      if (this.intervalId !== null) return

      this.intervalId = setInterval(() => {
        this.currentTime = new Date()
      }, 1000)
    },
    stopTimer() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
  },
})
</script>
