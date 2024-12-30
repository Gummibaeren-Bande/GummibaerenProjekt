<template>
  <div class="ChoiceContainer">
    <div v-for="option in options" :key="option.value" class="p-field-checkbox">
      <Checkbox v-model="selectedOptions" :inputId="option.value" :value="option.value" />
      <label :for="option.value" class="textNormall textColor textLeft">{{ option.label }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import '../Task.css'
import { defineComponent } from 'vue'
import type { Prop, PropType } from 'vue'
import Checkbox from 'primevue/checkbox'

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
  },
})
</script>