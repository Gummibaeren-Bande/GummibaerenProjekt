<template>
  <div class="taskDescriptionStyle">
    <ScrollPanel class="taskDescriptionScrollpanel">
      <p>
        {{ description }}
      </p>
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
import ScrollPanel from 'primevue/scrollpanel'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ScrollPanel,
  },
  props: {
    description: {
      type: String,
      required: true,
    },
  },
})
</script>
