<template>
  <div>Wie viele Gummibärchen bekommt jeder?</div>
</template>

<style scoped>
  div {
    width: auto;
    height: auto;
    font-size: calc(
      16px + (28 - 16) * ((100vw - 320px) / (1600 - 320))
    ); /* Calculation for the dynamic fontsize */
    text-align: center;
    font-weight: bold;
    padding: 0px;
  }
</style>
