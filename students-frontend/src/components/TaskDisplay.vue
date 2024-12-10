<template>
  <div>
    Hier ensteht die Anzeige der Aufgaben für die Schüler. Hier werden die Aufgaben der Gruppe "{{
      groupName
    }}" angezeigt
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      groupName: '',
      groupIsNotSpecified: false,
    }
  },
  mounted() {
    const groupInURL = new URL(window.location.href).searchParams.get('group')
    if (!groupInURL) {
      this.groupIsNotSpecified = true
      return
    }
    this.groupName = groupInURL
  },
  methods: {},
}
</script>
