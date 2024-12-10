#     GummibaerenProjekt
## Produktziel

Stand vom 25.11.24:
> Mit dem "Aufgaben Kontroll-System" wird Unterricht smarter: Aufgaben verteilen, Ergebnisse vergleichen und Fortschritte in Echtzeit verfolgen – für effektives Lernen und schnelles Handeln im Klassenzimmer. Die Lehrkraft kann ein Aufgabenset auf einem Server hochladen, auf das die Schüler:innen über eine Website zugreifen können um die Aufgaben zu bearbeiten. Nachdem sie eine Aufgabe bearbeitet haben, senden sie ihre Lösung ab und erhalten sofort Rückmeldung darüber, ob es korrekt ist. Die Schüler:innen können entweder individuell auf ihren eigenen Geräten oder als Gruppe auf einem gemeinsamen Gerät arbeiten. Währenddessen hat die Lehrkraft die Möglichkeit, den Fortschritt der Nutzer:innen zu verfolgen. Über diese Ansicht kann sie auch Aufgaben entfernen, die noch nicht bearbeitet wurden, oder sie durch andere  Aufgaben zu ersetzen. So kann die Lehrkraft gezielt auf die Leistungen einzelner Schüler:innen reagieren.


## Definition of Done
- [ ] Diese Checkliste wird pro Increment von zwei Personen durchlaufen. Mir selbst und einer weiteren Person, die ich gezielt angesprochen habe.
- [ ] Das Projekt buildet mit meinem Increment ohne Errors und Warnings. [vor allem ohne type errors, Im Backend gibt es noch keinen build befehl, ansonsten npm run build]
- [ ] Der Code besteht alle Testfälle. [im backend gibt es noch keine teststrategie, ansonsten npm run test:unit]
- [ ] Jede Methode mit Rückgabewert hat mindestens einen von mir selbst erstellten Testfall (Ausnahmen: getter/setter).
- [ ] Jede neue Methode hat einen Kommentar, was sie tut. In diesem Kommentar steht auch etwas zum eventuellen return-wert (Ausnahmen: getter/setter).
- [ ] Das System kann auf dem Handy, iPad und im Browser genutzt werden, alles ist sichtbar. [muss nur überprüft werden, wenn es Änderungen an der UI gab]
- [ ] Ich habe mich an unsere Checkstyle Guidelines gehalten. [dafür muss npm run format überall, wo Dinge geändert wurden, ausgeführt werden. Die in frage kommenden locations sind dabei "shared-backend", "students-frontend" und "teachers-frontend"]


## Definition of Fun
* Jede Aufgabe hat eine eindeutige Deadline, damit der Scrum-Master den Überblick darüber behält, wer an welcher Aufgabe arbeitet und ob der Zeitplan eingehalten wird. Wir halten uns an diese Deadlines.
* Der Scrum-Master verteilt anstehende Aufgaben, falls niemand sie freiwillig übernimmt. Mit Begründung können so zugeteilte Aufgaben abgelehnt werden. Dabei bleiben alle Beteiligten stets freundlich und verständnisvoll.
* Jeder bearbeitet seine Aufgaben gewissenhaft, und im Sinne des Teams und Projektes. Wer nicht weiterkommt bittet die anderen um Hilfe.
* Wie unterstützen uns gegenseitig bei Problemen jeglicher Art. Wir wollen als Team erfolgreich sein und arbeiten dahingegend zusammen.
* Wir kommunizieren stets offen und ehrlich miteinander. Wir haben stets ein offenes Ohr für die projektbezogenen Probleme der anderen.
* Dienstags wird sich um 11:30 in der Mensa getroffen.


## Epic
Die Lehrkraft möchte numerische und MultipleChoice Aufgaben als Teil eines Aufgabensets zur Verfügung stellen, um diese ihren Schüler:innen in einer klaren und übersichtlichen Struktur zur Verfügung zu stellen. Dabei wird eine URL generiert, die den Schüler:innen Zugriff auf dieses Aufgabenset ermöglicht. Die Schüler:innen geben diese URL an ihren Geräten ein, wählen einen Gruppennamen und erstellen damit ihre Gruppe in welcher sie gemeinsam die Aufgaben bearbeiten.
Während die Schüler:innen die Aufgaben bearbeiten sieht die Lehrkraft den Bearbeitungsprozess der einzelnen Gruppen in Echtzeit. Dabei bekommt sie angezeigt, welche Aufgaben von Gruppen bereits gelöst wurden, wie lange sie für die einzelnen Aufgaben gebraucht haben und wie viele Versuche sie benötigt haben, um die Aufgaben zu lösen. Um die Schwierigkeit individuell an die Gruppen anzupassen hat die Lehrkraft die Möglichkeit, Aufgaben zu entfernen oder Alternativaufgaben zu aktivieren.
Das iPad einer Gruppe hat keinen Akku mehr. Sie können sich an einem anderen Gerät mit dem Gruppennamen anmelden und dort weiterarbeiten, wo sie aufgehört haben.
Die Schüler:innen bearbeiten eine Aufgabe nach der anderen. Wenn sie die Lösung zu einer Aufgabe abschicken bekommen sie direkt eine automatische Rückmeldung und werden gegebenefalls zur nächsten Aufgabe weitergeleitet. Jede Gruppe sieht, wie viele Aufgaben sie bereits gelöst hat.


## Burn Up chart
![image](Burn-Up-Chart/Burnup-plot.png)
