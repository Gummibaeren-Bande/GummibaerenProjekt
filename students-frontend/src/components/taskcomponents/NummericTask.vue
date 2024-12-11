<template>
    <div class="TaksContainer">
        In einer gummibärchen Packung gibt es ingesamnnt 256 Gummibärchen.
        Diese sollen jetzt auf Tom, Alice, Jonas, Friedrich, Tabea, Michi,
        Lisa und Felix aufgeteilt werden.
        <p><b>Wie viele Gummibärchen bekommt jeder?</b></p>
    </div>
    <div id="Answerbar">
        <div class="solution">
            <label for="answer">Lösung:</label>
            <input type="text" id="answer" placeholder="z. B. 5">
            <button>Abschicken</button>
        </div>
    </div>
</template>

<style scoped>
        .TaksContainer {
            background-color: #66cdaa;
            width: 100%;
            padding: 20px;
            text-align: left;
            margin-top: 2px;
            margin-bottom: 2px;
        }
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
            background-color: #008080;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .solution button:hover {
            background-color: #005959;
        }

        #Answerbar {
            background-color: #66cdaa;
            padding: 10px;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
    </style>