<template>
  <div class="taskChoiceContainer">
    <div v-for="option in options" :key="option.value" class="divCheckbox">
      <Checkbox
        v-model="selectedOptions"
        :inputId="option.value"
        :value="option.value"
        :disabled="disabled"
      />
      <label :for="option.value">{{ option.label }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
import Checkbox from 'primevue/checkbox'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export interface Option {
  label: string
  value: string
}

export default defineComponent({
  components: {
    Checkbox,
  },
  props: {
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedOptions: [] as string[],
    }
  },
  methods: {
    getSelectedOptions(): string[] {
      return this.selectedOptions
    },

    resetSelectedOptions() {
      this.selectedOptions = []
    },
  },
})
</script>
