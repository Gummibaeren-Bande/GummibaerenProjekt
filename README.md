#     GummibaerenProjekt
## Produktziel

Stand vom 17.12.24:
> Mit dem "Aufgaben Kontroll-System" wird Unterricht smarter: Aufgaben verteilen, Ergebnisse vergleichen und Fortschritte in Echtzeit verfolgen – für effektives Lernen und schnelles Handeln im Klassenzimmer. Die Lehrkraft kann ein Aufgabenset auf einem Server hochladen, auf das die Schüler:innen über eine Website zugreifen können um die Aufgaben zu bearbeiten. Nachdem sie eine Aufgabe bearbeitet haben, senden sie ihre Lösung ab und erhalten sofort Rückmeldung darüber, ob sie korrekt ist. Die Schüler:innen können entweder individuell auf ihren eigenen Geräten oder als Gruppe auf einem gemeinsamen Gerät arbeiten. Währenddessen hat die Lehrkraft die Möglichkeit, den Fortschritt der Nutzer:innen zu verfolgen. Über diese Ansicht kann sie auch Aufgaben entfernen, die noch nicht bearbeitet wurden, oder sie durch andere  Aufgaben zu ersetzen. So kann die Lehrkraft gezielt auf die Leistungen einzelner Schüler:innen reagieren.


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
In einer kleinen Lerneinheit möchte die Lehrkraft mit den drei Schüler:innen Franz, Niki und Luca Schaltkreise wiederholen. Dafür stellt sie den Schüler:innen die AKS-Website mit den Aufgaben zur Verfügung. Die Schüler:innen gehen auf die Website und geben sich ihren eigenen Namen als Gruppenname. Die Lehrkraft sieht auf ihrer Ansicht die Gruppen, die sich einen Namen gegeben haben.
Die ersten drei Aufgaben haben eine numerische Lösungseingabe, da hier die zu fließende Stromstärke berechnet werden muss. Die Schüler:innen geben ihr Ergebnis ein und schicken die Antwort ab. Die nächsten drei Aufgaben sind Multiplechoice Aufgaben. Hier kreuzen die Schüler:innen die ihrer Meinung nach richtigen Antworten an und schicken diese ab. Sie bekommen eine direkte Rückmeldung über ein Popup, ob ihre Antwort richtig oder falsch ist. Niki schaut sich ihr richtiges Ergebnis immer noch mal an und klickt das Popup zuerst weg, bevor sie auf "Weiter" klickt. 
Die ersten drei Aufgaben sind Niki sehr leicht gefallen. Die Lehrkraft sieht dies daran, dass Nikis Timer bei den Aufgaben besonders niedrig sind und aktiviert deshalb eine der schwierigeren Alternativen für die nächste Aufgabe. 
Die Lehrkraft kann ebenso die Anzahl der Fehlversuche sehen. So fällt ihr auf, dass Franz bereits 10-mal die Aufgabe 2 falsch beantwortet hat. Sie deaktiviert deshalb die dritte Aufgabe für ihn. 
Währenddessen ist der Akku von Lucas Gerät leer. Er holt sich ein neues iPad und verbindet sich wieder mit der Website. Dazu gibt er seinen Gruppennamen ein und bekommt wieder den aktuellen Stand seiner Aufgaben angezeigt. 
Am Ende der Stunden vergleichen Franz, Niki und Luca wie viele Fragen sie richtig beantwortet haben. Dabei hat Franz 4, Niki 5 und Luca 6 Fragen richtig beantwortet.



## wichtige Entscheidungen
* Die Ansicht für Lehrkräfte wird nur für den Browser optimiert.
* Die Systeme bleiben vorerst getrennt und werden erst am Ende eventuell zusammengefügt.


## Burn Up chart
![image](Burn-Up-Chart/Burnup-plot.png)

## Weitere Readme-Dateien
* [Backend](shared-backend/README.md)
* [Students-Frontend](students-frontend/README.md)
* [Teachers-Frontend](teachers-frontend/README.md)
