# Aufgaben-Kontroll-System

Mit dem "Aufgaben Kontroll-System" wird Unterricht smarter: Aufgaben verteilen, Ergebnisse vergleichen und Fortschritte in Echtzeit verfolgen – für effektives Lernen und schnelles Handeln im Klassenzimmer. Die Lehrkraft kann ein Aufgabenset vorbereiten, auf welches die Schüler:innen über eine Website zugreifen können um die Aufgaben zu bearbeiten. Nachdem sie eine Aufgabe bearbeitet haben, senden sie ihre Lösung ab und erhalten sofort eine automatische Rückmeldung darüber, ob sie korrekt ist. Die Schüler:innen können entweder individuell auf ihren eigenen Geräten oder als Gruppe auf einem gemeinsamen Gerät arbeiten. Währenddessen hat die Lehrkraft die Möglichkeit, den Fortschritt der Nutzer:innen zu verfolgen. Über diese Ansicht kann sie auch Aufgaben markieren, die noch nicht bearbeitet wurden, so dass die Schüler:innen diese überspringen oder sie durch alternative Aufgaben ersetzen. So kann die Lehrkraft gezielt auf die Leistungen einzelner Schüler:innen reagieren.

## Inhaltsverzeichnis

- [Technische Voraussetzungen](#technische-voraussetzungen)
- [Aufgabenerstellung](#aufgabenerstellung)
- [Nutzung des Systems](#nutzen-des-systems)
- [Verlinkungen zu weiteren ReadMe](#readme-dateien-der-einzelnen-systemmodule)

## Technische Voraussetzungen

Um das Projekt auf dem eigenen Rechner kompilieren und auszuführen benötigt man

- [Node.js](https://nodejs.org/en/download) (Version 22.12.1 oder höher)
- npm (Version 10.9.0 oder höher)

## Aufgabenerstellung

Einen Guide zur Aufgabenerstellung findet sich im [ReadMe des Backends](/shared-backend/README.md).

## Nutzen des Systems

Um das System selbst auszuführen, müssen folgende Befehle im Root-Ordner ausgeführt werden:

### Installation (muss nur beim ersten Mal ausgeführt werden)

```sh
node ./setup.js
```

### Starten

```sh
node ./start.js
```

### Fortgeschrittene Nutzung

Das Installationsskript bewegt sich in die einzelnen Modulordner und führt dort `npm install` aus.<br>
Das Startskript öffnet zuerst ein Konsolenfenster, welches im `shared-backend` den Befehl `npm run start` ausführt, welches den Backendserver auf Port 3000 startet und öffnet dann zwei weitere Konsolenfenster welche im `teachers-frontend` & `students-frontend` die Befehle `npm run build-only` und `npm run preview` ausführen, diese kompilieren die Websites und versuchen diese über die Ports 8080 für das Students-Frontend und 8081 für das Teachers-Frontend zu starten.

## Readme-Dateien der einzelnen Systemmodule

- [Backend](shared-backend/README.md)
- [Students-Frontend](students-frontend/README.md)
- [Teachers-Frontend](teachers-frontend/README.md)
