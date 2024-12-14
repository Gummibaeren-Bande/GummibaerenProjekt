<template>
    <div id="solution">
        <label for="answer">Antwort:</label>
        <input type="text" id="answer" placeholder="z. B. 5">
    </div>
</template>

<style scoped>
    
    #solution {
        display: flex;
        justify-content: left;
        align-items: center;
        background-color: #ffffff66;
        height: inherit;
        border-bottom-left-radius: 15px;
    }

    #solution input {
        font-size: 1em;
        padding: 5px;
        margin-right: 7px;
        width: 100%;
        text-align: center;
    }

    #solution label{
        color: black;
        font-size: 1em;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>