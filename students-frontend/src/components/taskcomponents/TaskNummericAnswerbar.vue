<template>
    <div id="Answerbar">
        <div class="solution">
            <label for="answer">Lösung:</label>
            <input type="text" id="answer" placeholder="z. B. 5">
            <button>Abschicken</button>
        </div>
    </div>
</template>

<style scoped>

    .solution {
        margin-top: 15px;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .solution input {
        font-size: 1em;
        padding: 5px;
        margin-right: 3%;
        margin-left: 2%;
        width: 60%;
        text-align: center;
    }

    .solution button {
        font-size: 1em;
        padding: 5px 10px;
        background-color: #ffffff66;
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .solution button:hover {
        background-color: #005959;
    }

    #Answerbar {
        background-color: #ffffff66;
        padding: 5px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
</style>