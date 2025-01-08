<template>
  <div id="TaksContainer" class="textNormal textColor">
    <ScrollPanel class="taskDescriptionScrollpanel">
      <p>
        {{ description }}
      </p>
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import '../Task.css'
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

<style scope>
#TaksContainer {
  min-height: 0;
}
</style>
