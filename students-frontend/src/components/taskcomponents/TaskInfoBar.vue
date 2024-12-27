<template>
  <div id="InfoBar" class="mainComponent mainComponentColor">
    <div id="name" class="textSmaller textColor">Gruppenname: Teddybären</div>
    <div id="zähler" class="textSmaller textColor">Fertige Aufgaben: 3</div>
  </div>
</template>

<script lang="ts" setup>
import './Task.css'
</script>

<style scoped>
#InfoBar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: inherit;
  padding: 4px;
  margin-bottom: 2px;
}

#name {
  text-align: left;
  padding-left: 20px;
}

#zähler {
  text-align: right;
  padding-right: 20px;
}
</style>
