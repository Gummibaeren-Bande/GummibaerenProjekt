# Shared Backend

## scripts

`npm install` installiert alle genutzten Packages des Backends
`npm run start` startet das Backend

## Aufbau der Aufgaben

Eine Aufgabe ([Task](./src/entities/Task.ts)) die Schüler:innen bearbeiten können, besteht aus einer oder mehreren Übungen ([Exercise](./src/abstract-classes/Exercise.ts)). Exercises bestehen immer aus einer selbst generierten ID sowie bei der Erstellung angegebenen Titel (blauer Kasten), Beschreibung (gelber Kasten) und Frage (schwarzer Kasten). Die Kästen sind nachträglich eingefügt.<br>
![](./readme-img/Aufgabe-im-SF.png)<br>
Je nach Übungstyp haben sie noch eigene Attribute die bei der Erstellung angegeben werden müssen. Diese befinden sich in der Tabelle weiter unten.<br>
Wenn man nun einige Übungen hat und diese zu einer Aufgabe zusammenfügen möchte muss man neben dem Array an Übungen noch einen Aufgabentitel (gelber Kasten) angeben, dieser ist nur im Teachers-Frontend zusehen. Der rote Kasten ist eine Aufgabe welche mehrere Übungen besitzt, wobei die erste Übung standardmäßig ausgewählt ist und die weiteren Übungen Alternativen darstellen.<br>
![](./readme-img/Ansicht-TF.png)<br>

## Übungstypen

| Klassenname            | Eigenwerte                                                         |
| ---------------------- | ------------------------------------------------------------------ |
| NumericalExercise      | Antwort: Ganzzahl                                                  |
| MultipleChoiceExercise | Antwortmöglichkeiten: String Array; Antwortindizes: Ganzzahl Array |

## Aufgabenerstellung

Die Aufgabenliste findet sich aktuell [hier](/shared-backend/src/taskList.ts).<br>
Um eine neue Task zu erstellen verwendet man folgenden Code:

```TypeScript
new Task("Aufgabenname in der Lehrkraftansicht",
    [
        new NumericalExercise("Aufgabentitel für Schüler:innen", "Aufgabenbeschreibung", "Frage", Lösungszahl),
        new MultipleChoiceExercise("Aufgabentitel für Schüler:innen", "Aufgabenbeschreibung", "Frage",
            ["Antwortmöglichkeit1", "Antwortmöglichkeit2", "Antwortmöglichkeit3"], [Lösungsindex1, Lösungsindex2]
            )
    ]
 )
```

MultipleChoiceExercises können eine beliebige Anzahl an Antwortmöglichkeiten und Lösungsindizes haben. Die Lösungsindizes geben dabei vor, welche der Antwortmöglichkeiten korrekt sind. Dabei ist der Lösungsindex von Antwortmöglichkeit1 0, von Antwortmöglichkeit2 1 usw.<br>
Mit dieser Syntax wurde nun eine Aufgabe mit einer Alternative erstellt. Mehrere solcher Tasks können in einem Array gespeichert werden, um ein Aufgabenset zu erstellen. Dieses Array liegt [hier](/shared-backend/src/taskList.ts) und wird in Zeile 8 geöffnet.<br>
Aktuell lässt sich, unabhängig davon, ob eine erstellt wurde, für die erste Aufgabe keine Alternative auswählen, da die Schüler:innen direkt mit der Bearbeitung der ersten Aufgabe starten sobald sie sich registriert haben.<br>
Das Aufgabenset, welches in der `taskList.ts` Datei gespeichert ist wird aktuell beim Starten des Servers automatisch geladen.
