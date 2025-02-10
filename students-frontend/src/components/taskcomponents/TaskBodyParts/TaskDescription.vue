<template>
  <div class="taskDescriptionStyle">
    <ScrollPanel class="taskDescriptionScrollpanel">
      <p v-html="markdown()"></p>
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
import ScrollPanel from 'primevue/scrollpanel'
import { defineComponent, ref } from 'vue'
import { Image } from 'primevue'
import mardownRenderer from '@/mardownRenderer'

export default defineComponent({
  components: {
    ScrollPanel,
    Image
  },
  props: {
    description: {
      type: String,
      required: true,
    },
  },
  methods: {
    /* This method parses the Description through a Markdown parser */
    markdown() {
      return mardownRenderer.bind(this.description)
    },
  },
})
</script>
