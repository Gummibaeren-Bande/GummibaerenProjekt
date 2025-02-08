# students-frontend

## Inhaltsverzeichnis

- [Scripts](#scripts)
- [Login/Reconnect](#login-ansicht-und-reconnect)
- [Aufgaben](#aufgabenansicht)
- [Endansicht](#endansicht)

## Scripts

Mit `npm install` werden alle genutzten Packages dieses Frontends installiert.<br>
Mit `npm run build` beziehungsweise `npm run build-only` wird dieses Frontend kompiliert und im `dist` Ordner zur Verfügung gestellt und kann dann mit `npm run preview` live hosted werden. Der Unterschied zwischen den beiden Build-Befehlen beläuft sich auf einen Type-Check.

## Login-Ansicht (und Reconnect)

Wenn die Schüler:innen den QR-Code gescannt oder den Link eingegeben haben, öffnet sich eine Login Seite. Hier können die Schüler:innen einen Gruppennamen eingeben und dann über den `Starten`-Button mit der Bearbeitung beginnen.<br>
Sollte eine Gruppe währen der Bearbeitung das Gerät wechseln, so kann sie sich wieder einloggen und mit der Bearbeitung fortfahren. Das geht über den Reconnect-Button oben rechts im Login Fenster. Dort kann die Gruppe ihren Namen wieder eingeben und über den `Weiterarbeiten`-Button die Bearbeitung fortsetzen.<br>
![](./readme-img/student-login-view.png)<br>

## Aufgabenansicht

Jede Gruppe sieht oben im Fenster den Namen der aktuellen Aufgabe. Darunter steht links der Gruppenname, rechts wird angezeigt, wie viele Aufgaben die Gruppe bereits korrekt gelöst hat.

### Numerical Exercise

Aufgaben mit numerischer Antwort bieten ein Eingabefeld in dem `Antwort` steht. Sobald die Schüler:innen in dieses Feld ihre Antwort als Ganzzahl eingegeben haben, können sie durch Klicken des `Abschicken`-Buttons ihre Antwort überprüfen lassen. Bei einer falschen Antwort poppt eine Benachrichtigung darüber auf und die Gruppe kann eine weitere Antwort eingeben. Bei einer richtigen Antwort wird die Gruppe direkt zur nächsten Aufgabe weitergeleitet.
![](./readme-img/student-numerical-exercise-view.png)

### Multiple-Choice Exercise

Multiple-Choice Aufgaben zeigen die Antwortmöglichkeiten an. Diese können durch Klicken ausgewählt werden. Danach können die Schüler:innen wieder durch `Abschicken` ihre Lösung verifizieren lassen.
![](./readme-img/student-multiple-choice-exercise-view.png)

## Endansicht

Wenn eine Gruppe alle Aufgaben fertig bearbeitet hat wird ihr eine abschließende Anzeige präsentiert.
![](./readme-img/student-finish-view.png)
