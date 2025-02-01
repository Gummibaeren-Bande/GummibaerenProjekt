<template>
  <div class="taskDiscribtionStyle">
    <ScrollPanel class="taskDescriptionScrollpanel">
      <p>
        {{ description }}
      </p>
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import '@/assets/Frontend.css'
import ScrollPanel from 'primevue/scrollpanel'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ScrollPanel,
  },
  props: {
    description: {
      type: String,
      requiered: true,
    },
  },
})
</script>
