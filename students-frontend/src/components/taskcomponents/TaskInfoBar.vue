<template>
    <div id="InfoBar">
        <div id="name">
            Gruppenname: Teddybären
        </div>
        <div id="zähler">
            Fertige Aufgaben: 3
        </div>
    </div>
</template>

<style scoped>

    #InfoBar {
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: #ffffff66;
        color: black;
        width: inherit;
        height: auto;
        padding: 4px;
        margin-bottom: 2px;
    }

    #name {
        text-align: left;
        font-size: smaller;
        padding-left: 20px;
    }

    #zähler {
        text-align: right;
        font-size: smaller;
        padding-right: 20px;
    }

</style>