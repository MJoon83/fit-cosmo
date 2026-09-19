# fit@cosmo — Trainings-Tracker

**Live: <https://mjoon83.github.io/fit-cosmo/>**

Kleine Web-App zum Tracken des 8-Wochen-Basisplans (Krafttraining an Geräten,
doppelte Progression, plus Warm-up- und Cardio-Block).

Läuft komplett im Browser, ohne Server und ohne Account. Die Trainingsdaten
liegen ausschließlich auf dem Gerät, mit dem du die App benutzt.

## Ansichten

Oben umschaltbar:

- **Training** — Warm-up als Häkchen, neun Kraftübungen, Mobility-Block,
  darunter die Karte *Daten & Sicherung*. Jede Übung wird einzeln gespeichert;
  oben zählt ein Balken mit. Am Ende „Training abschließen“.
- **Körper** — Gewicht, Körperfett, Muskelmasse, Viszeralfett und die vier
  Umfänge (Brust, Hüfte, Oberarm, Oberschenkel). Leere Felder werden
  übersprungen, mehrere Eingaben am selben Tag werden zusammengeführt.
- **Auswertung** — Kennzahlen, Monatskalender mit den Trainingstagen,
  je Übung Gewichtskurve und Wiederholungs-Balken.

Die Notiz einer Übung ist die Merkhilfe für die Progression: sie erscheint beim
nächsten Mal oben in der Übung. Steht dort eine Zahl („27,5“), gibt es einen
Knopf, der das Gewicht direkt übernimmt.

Die Reihenfolge der Übungen lässt sich über „Reihenfolge ändern“ anpassen und
wird gespeichert.

## Farben

Angelehnt an die Studio-Website: Rot `#e83a34`, Dunkelblau `#263978`,
Petrol `#236978`, Türkis `#32dad4`. Hell- und Dunkelmodus folgen automatisch der
iPhone-Einstellung. Bewusst **ohne** Logo, Wortmarke oder Bilder des Studios —
Farbwerte sind frei verwendbar, die Marke nicht.

## Datenschutz

Persönliche Daten liegen **außerhalb dieses Projekts**, im Nachbarordner
`~/Desktop/projekte/fit@cosmo-daten/` (über iCloud auch am iPhone erreichbar).
So können sie gar nicht erst versehentlich veröffentlicht werden.

Die `.gitignore` schließt zusätzlich alle Backup- und Exportdateien aus,
unabhängig vom Ordner — als zweite Sicherung, nicht als erste.
**Vor jedem Push prüfen:** `git status --untracked-files=all` zeigt, was
tatsächlich mitgeht.

## Offene Punkte

- [ ] Auf dem iPhone prüfen, ob die Statusleiste in beiden Modi lesbar ist
- [ ] In der App einmal „Trainings am selben Tag zusammenführen“ antippen
      (19.08. und 04.09. bestehen aus je zwei Teil-Einträgen)

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App (HTML, CSS, JavaScript in einer Datei) |
| `manifest.webmanifest` | Macht die App zur "PWA": Name und Icon für den Homescreen |
| `sw.js` | Service Worker — sorgt dafür, dass die App offline funktioniert |
| `icons/` | App-Icons für Homescreen und Browser-Tab |
| `archiv/tracker-alt.html` | Die ursprüngliche Einzeldatei, unverändert als Sicherung |
| `../fit@cosmo-daten/` | Deine Sicherungen und Exporte — bewusst außerhalb des Projekts |

## Lokal starten

```bash
npm start
```

Das startet einen kleinen Webserver auf <http://localhost:8080>. Wichtig: die App
immer über `http://localhost` öffnen, nicht per Doppelklick auf die Datei
(`file://`) — im `file://`-Modus ist der Browser-Speicher unzuverlässig.

Beenden mit `Ctrl+C`.

## Auf dem iPhone installieren

1. Die veröffentlichte URL in **Safari** öffnen (nicht Chrome — nur Safari kann
   auf iOS richtige Homescreen-Apps anlegen).
2. Teilen-Symbol (Quadrat mit Pfeil nach oben) antippen.
3. "Zum Home-Bildschirm" wählen.

Danach startet die App wie eine normale App, ohne Adressleiste, und funktioniert
auch ohne Internet.

## Datensicherung

Die App speichert doppelt (localStorage **und** IndexedDB) und legt bei jedem
gespeicherten Training automatisch einen internen Schnappschuss an.

Trotzdem gilt: iOS kann Browser-Speicher löschen, wenn eine Website lange nicht
benutzt wird oder der Safari-Cache geleert wird. **Deshalb regelmäßig
"Backup speichern"** in der Karte *Daten & Sicherung* antippen und die
JSON-Datei in `fit@cosmo-daten` ablegen (iCloud Drive → Schreibtisch →
projekte → fit@cosmo-daten). Die App erinnert daran, wenn das letzte
Backup älter als 14 Tage ist.

Ein Backup lässt sich jederzeit über "Backup laden" wieder einlesen.

## Nach Änderungen am Code

Wenn `index.html` geändert wird, in `sw.js` die Zeile

```js
const CACHE = 'fitcosmo-v1';
```

hochzählen (`v2`, `v3`, …). Sonst zeigt die installierte App auf dem iPhone
noch die alte, zwischengespeicherte Version an.

Danach:

```bash
git add -A && git commit -m "Beschreibung der Änderung" && git push
```

GitHub Pages veröffentlicht die neue Version automatisch in ein bis zwei Minuten.
