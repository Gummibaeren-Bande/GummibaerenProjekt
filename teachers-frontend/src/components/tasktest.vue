<template>
  <div class="speed-dial-container">
    <SpeedDial :model="items" type="circle" :radius="50" class="custom-speed-dial">
      <template #button>
        <button class="main-circle">
          <span class="main-number">{{ number }}</span>
        </button>
      </template>
    </SpeedDial>
  </div>
</template>

<script>
import { ref } from 'vue'
import SpeedDial from 'primevue/speeddial'

export default {
  components: {
    SpeedDial,
  },
  setup() {
    const number = ref(0)

    const items = ref([
      {
        label: 'A',
        icon: 'pi pi-pencil',
        command: () => {
          number.value = 1
        },
      },
      {
        label: 'B',
        icon: 'pi pi-refresh',
        command: () => {
          number.value = 2
        },
      },
      {
        label: 'C',
        icon: 'pi pi-trash',
        command: () => {
          number.value = 3
        },
      },
    ])

    return {
      number,
      items,
    }
  },
}
</script>

<style scoped>
.speed-dial-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.custom-speed-dial {
  --button-size: 100px;
  --button-bg: #007bff;
  --button-color: #fff;
}

.main-circle {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--button-bg);
  color: var(--button-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border: none;
  cursor: pointer;
}

.main-number {
  font-size: 36px;
}
</style>
