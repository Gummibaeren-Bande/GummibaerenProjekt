<template>
  <div id="ChoiceContainer">
    <div v-for="option in options" :key="option.value" class="p-field-checkbox">
      <Checkbox v-model="selectedOptions" :inputId="option.value" :value="option.value" />
      <label :for="option.value" class="textNormall textColor">{{ option.label }}</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import './Task.css'
import { ref } from 'vue'
import Checkbox from 'primevue/checkbox'

const options = ref([
  { label: 'A) Erdbeere, Zitrone, Himbeere, Orange, Apfel und Ananas', value: 'option1' },
  { label: 'B) Banane, Kirsche, Mango, Pfirsich, Limette und Maracuja', value: 'option2' },
  { label: 'C) Vanille, Schokolade, Zimt, Kokos, Pfefferminze und Brombeere', value: 'option3' },
  {
    label: 'D) Wassermelone, Kiwi, Heidelbeere, Passionsfrucht, Pflaume und Grapefruit',
    value: 'option4',
  },
])

const selectedOptions = ref<string[]>([])
</script>

<style scoped>
.p-field-checkbox {
  width: fit-content;
  margin-bottom: 5px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  margin-left: 4px;
  text-align: left;
}

#ChoiceContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: fit-content;
}
</style>
