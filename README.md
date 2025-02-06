# Aufgaben-Kontroll-System

Mit dem "Aufgaben Kontroll-System" wird Unterricht smarter: Aufgaben verteilen, Ergebnisse vergleichen und Fortschritte in Echtzeit verfolgen – für effektives Lernen und schnelles Handeln im Klassenzimmer. Die Lehrkraft kann ein Aufgabenset auf einem Server hochladen, auf welches die Schüler:innen über eine Website zugreifen können um die Aufgaben zu bearbeiten. Nachdem sie eine Aufgabe bearbeitet haben, senden sie ihre Lösung ab und erhalten sofort Rückmeldung darüber, ob sie korrekt ist. Die Schüler:innen können entweder individuell auf ihren eigenen Geräten oder als Gruppe auf einem gemeinsamen Gerät arbeiten. Währenddessen hat die Lehrkraft die Möglichkeit, den Fortschritt der Nutzer:innen zu verfolgen. Über diese Ansicht kann sie auch Aufgaben markieren, die noch nicht bearbeitet wurden, so dass die Schüler:innen diese überspringen oder sie durch alternative Aufgaben ersetzen. So kann die Lehrkraft gezielt auf die Leistungen einzelner Schüler:innen reagieren.

## Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Aufgabenerstellung](#aufgabenerstellung)
- [Nutzung des Systems](#nutzen-des-systems)

## Voraussetzungen

Um das Projekt auf dem eigenen Rechner kompilieren und auszuführen benötigt man

- [Node.js](https://nodejs.org/en/download) (version 22.12.1 oder höher)
- npm (version 10.9.0 oder höher)

## Aufgabenerstellung

Die Aufgabenliste findet sich aktuell [hier](/shared-backend/src/taskList.ts).<br>
Ein Task ist eine Ansammlung von Exercises. Die erste Exercise ist die Standardaufgabe, alle weiteren können während der Benutzung als Alternativen ausgewählt werden. Zur Zeit gibt es zwei Exercise-Typen, einerseits NumericalExercise die eine Ganzzahl als Lösung hat, andererseits MultipleChoiceExercise die ein Array an Lösungen hat.<br>
Um eine neue Task zu erstellen schreibt man:

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

MultipleChoiceExercise können eine beliebige Anzahl an Antwortmöglichkeiten und Lösungsindizes haben. Die Lösungsindizes geben dabei vor, welche der Antwortmöglichkeiten korrekt sind. Dabei ist der Lösungsindex von Antwortmöglichkeit1 0, von Antwortmöglichkeit2 1 usw.<br>
Mit dieser Syntax wurde nun eine Aufgabe mit einer Alternative erstellt. Mehrere solcher Tasks können in einem Array gespeichert werden, um ein Aufgabenset zu erstellen. Dieses Array liegt [hier](/shared-backend/src/taskList.ts) und wird in Zeile 8 geöffnet.<br>
Aktuell lässt sich, unabhängig davon, ob eine erstellt wurde, für die erste Aufgabe keine Alternative auswählen, da die Schüler:innen direkt mit der Bearbeitung der ersten Aufgabe starten sobald sie sich registriert haben.<br>
Das Aufgabenset, welches in der taskList.ts Datei gespeichert ist wird aktuell beim Starten des Servers automatisch geladen.

## Nutzen des Systems

Um das System nun selbst auszuführen, müssen folgende Befehle im Root-Ordner ausgeführt werden:

### Installation (muss nur beim ersten mal ausgeführt werden)

```sh
node ./setup.js
```

### Starten

```sh
node ./start.js
```

## Readme-Dateien der einzelnen Systemmodule

- [Backend](shared-backend/README.md)
- [Students-Frontend](students-frontend/README.md)
- [Teachers-Frontend](teachers-frontend/README.md)
