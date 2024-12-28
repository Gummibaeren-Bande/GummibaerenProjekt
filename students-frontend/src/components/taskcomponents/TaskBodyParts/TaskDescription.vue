<template>
  <div id="TaksContainer" class="textNormall textColor">
    <ScrollPanel class="taskDescriptionScrollpanel">
      <p>
        {{ props.description }}
      </p>
    </ScrollPanel>
  </div>
</template>

<script lang="ts" setup>
import '../Task.css'
import ScrollPanel from 'primevue/scrollpanel'

let props = defineProps({
  description: {
    type: String,
    required: true
  }
})

</script>


<style scope>
#TaksContainer {
  min-height: 0;
}
</style>