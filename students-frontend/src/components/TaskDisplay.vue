<template>
  <div>
    Hier ensteht die Anzeige der Aufgaben für die Schüler. Hier werden die Aufgaben der Gruppe "{{
      groupName
    }}" angezeigt
  </div>
</template>

<script lang="ts">
export default {
  props: {
    groupName: String,
  },
  methods: {},
}
</script>
