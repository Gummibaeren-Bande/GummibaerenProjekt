<template>
  <div class="taskDescriptionStyle">
    <ScrollPanel class="taskDescriptionScrollpanel">
      <img src="https://platform.physik.kit.edu/hedgedoc/uploads/299d27bd-f820-4233-9b44-d57920bf31f3.jpg" alt="Image" class = "Image" />
      <p ref="test">
        {{ description }}
      </p>
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import '@/assets/frontend.css'
import ScrollPanel from 'primevue/scrollpanel'
import { defineComponent, ref } from 'vue'
import { marked } from 'marked'
import { Image } from 'primevue'

export default defineComponent({
  components: {
    ScrollPanel,
    Image
  },
  props: {
    description: {
      type: String,
      requiered: true,
    },
  },
  // All Methods are Temporary at the moment and will maybe be removed.
  methods: {
    markdown() {
      return marked.parse(this.description || '')
    },
    picturewidth() {
      const test = ref<HTMLElement | null>(null)
      if (test.value) {
        console.log(test.value.clientWidth)
        return test.value.clientWidth
      }
    }
  },
})
</script>
