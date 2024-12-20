<template>
  <div>
    <h1>Gummibärchen Verteilung</h1>
  </div>
</template>

<style scoped>
  div {
    background-color: #ffffff66;
    width: inherit;
    margin-bottom: 2px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
  div h1 {
    color: black;
    text-align: center;
    font-size: calc(
      28px + (28 - 16) * ((100vw - 320px) / (1600 - 320))
    ); /* Calculation for the dynamic fontsize */
    padding: 10px;
    font-weight: 500;
  }
</style>
