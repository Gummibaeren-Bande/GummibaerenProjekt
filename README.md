# Aufgaben-Kontroll-System

Mit dem "Aufgaben Kontroll-System" wird Unterricht smarter: Aufgaben verteilen, Ergebnisse vergleichen und Fortschritte in Echtzeit verfolgen – für effektives Lernen und schnelles Handeln im Klassenzimmer. Die Lehrkraft kann ein Aufgabenset auf einem Server hochladen, auf welches die Schüler:innen über eine Website zugreifen können um die Aufgaben zu bearbeiten. Nachdem sie eine Aufgabe bearbeitet haben, senden sie ihre Lösung ab und erhalten sofort Rückmeldung darüber, ob sie korrekt ist. Die Schüler:innen können entweder individuell auf ihren eigenen Geräten oder als Gruppe auf einem gemeinsamen Gerät arbeiten. Währenddessen hat die Lehrkraft die Möglichkeit, den Fortschritt der Nutzer:innen zu verfolgen. Über diese Ansicht kann sie auch Aufgaben markieren, die noch nicht bearbeitet wurden, so dass die Schüler:innen diese überspringen oder sie durch alternative Aufgaben ersetzen. So kann die Lehrkraft gezielt auf die Leistungen einzelner Schüler:innen reagieren.

## Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Aufgabenerstellung](#aufgabenerstellung)
- [Nutzung des Systems](#nutzen-des-systems)

## Voraussetzungen

Um das Projekt auf dem eigenen Rechner kompilieren und auszuführen benötigt man

- [Node.js](https://nodejs.org/en/download) (version 22.12.1 oder höher)
- NPM (version 10.9.0 oder höher)

## Aufgabenerstellung

Es befindet sich aktuell [hier](/shared-backend/src/taskList.ts) die Aufgabenliste.<br>
Ein Task ist eine Ansammlung an Exercises, wobei die erste Exercise die Standardaufgabe ist und alle weiteren die einstellbaren Alternativen sind. Aktuell gibt es zwei Exercise-Typen, einerseits NumericalExercise und MultipleChoiceExercise, wobei eine NumericalExercise eine Aufgabe ist welche eine Ganzzahl als Antwortmöglichkeit nimmt und eine MultipleChoiceExercise eine Liste an Antwortmöglichkeiten anbietet, in welcher eine oder mehrere richtig sind.<br>
Um somit eine neue Task zu erstellen schreibt man:

```TypeScript
new Task("Aufgabenname in der Lehreransicht",
    [
        new NumericalExercise("Aufgabentitel für Schüler", "Aufgabenbeschreibung", "Frage", Antwortzahl),
        new MultipleChoiceExercise("Aufgabentitel für Schüler", "Aufgabenbeschreibung", "Frage",
            ["Antwortmöglichkeit1", "Antwortmöglichkeit2", "Antwortmöglichkeit3"], [Antwortindex1, Antwortindex2]
            )
    ]
 )
```

Die Antwortmöglichkeiten für die MultipleChoiceExercise können um beliebig viele erweitert werden, selbes gilt für die Antwortindizes. Die Antwortindizes bilden dar welche der Antwortmöglichkeiten richtig sind, dabei wäre der korrekte Index von Antwortmöglichkeit1 = 0 und der korrekte Index von Antwortmöglichkeit3 = 2.<br>
Somit haben wir nun eine Aufgabe mit einer Alternative erstellt. Um nun zu einem Aufgabenset zu kommen kann man nun mehrere solcher Tasks in einem Array speichern dieses wird aktuell auf Zeile 8 geöffnet und in Zeile 55 geschlossen.<br>
Da die Schüler direkt die erste Aufgabe laden wenn sie sich verbinden, lässt sich für diese keine Alternative einstellen, selbst wenn sie existiert.<br>
Das Aufgabenset, welches in der taskList.ts Datei gespeichert ist wird aktuell beim Starten des Servers automatisch geladen.

## Nutzen des Systems

Um das System nun selbst auszuführen, muss man folgende Befehle im Root-Ordner ausführen:

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
