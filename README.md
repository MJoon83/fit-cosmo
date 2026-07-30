# fit@cosmo — Trainings-Tracker

**Live: <https://mjoon83.github.io/fit-cosmo/>**

Kleine Web-App zum Tracken des 8-Wochen-Basisplans (Krafttraining an Geräten,
doppelte Progression, plus Warm-up- und Cardio-Block).

Läuft komplett im Browser, ohne Server und ohne Account. Die Trainingsdaten
liegen ausschließlich auf dem Gerät, mit dem du die App benutzt.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App (HTML, CSS, JavaScript in einer Datei) |
| `manifest.webmanifest` | Macht die App zur "PWA": Name und Icon für den Homescreen |
| `sw.js` | Service Worker — sorgt dafür, dass die App offline funktioniert |
| `icons/` | App-Icons für Homescreen und Browser-Tab |
| `archiv/tracker-alt.html` | Die ursprüngliche Einzeldatei, unverändert als Sicherung |
| `daten/` | Eigene Exporte und Backups — bleibt lokal, wird nie veröffentlicht |

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
JSON-Datei in iCloud Drive ablegen. Die App erinnert daran, wenn das letzte
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
