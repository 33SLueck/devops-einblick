

# System Monitoring Dashboard

Dieses Projekt enthält ein Next.js-basiertes Dashboard zur Überwachung von Systemmetriken, Logs und einfachen Analytics.

## Features

- Live-Charts für CPU- und RAM-Auslastung
- Netzwerk-In/Out (KB/s)
- Festplattennutzung (Größe, genutzt, verfügbar, Prozent)
- Anzeige der aktuellen Logs aus `logs/app.log` (neueste Einträge oben, scrollbar)
- Automatisches Logging beim Laden des Dashboards inkl. IP-Adresse
- Analytics: Page Loads und IP-Statistik direkt im Dashboard
- Typisierung für alle Systemdaten
- Husky pre-commit Hook für automatisches Linting und Prettier
- ESLint und Prettier Konfiguration

## Technik

- **Frontend:** Next.js, React, Chart.js, react-chartjs-2
- **Backend:** Next.js API-Routen, systeminformation, Winston
- **Codequalität:** ESLint, Prettier, Husky
- **CI/CD:** GitHub Actions

## API-Routen

- `/api/sysinfo`: Liefert aktuelle Systemmetriken (CPU, RAM, Netzwerk, Festplatten)
- `/api/log`: Schreibt Logeinträge inkl. IP-Adresse in die Logdatei
- `/api/logs`: Liest die Logdatei und gibt die Einträge als JSON zurück

## Logging & Analytics

- Logeinträge werden mit Winston in die Datei `logs/app.log` geschrieben
- Die Logdatei wird im Dashboard angezeigt (neueste Einträge oben, Bereich scrollbar und kompakt)
- Logging kann über die API auch vom Client ausgelöst werden
- Analytics: Page Loads und IP-Adressen werden aus den Logs extrahiert und im Dashboard als Statistik angezeigt

## GitHub Actions

### Test & Lint Workflow

```yaml
name: Test & Lint
on:
	push:
		branches: [ main ]
	pull_request:
		branches: [ main ]
jobs:
	lint-and-test:
		runs-on: ubuntu-latest
		steps:
			- name: Checkout code
				uses: actions/checkout@v4
			- name: Set up Node.js
				uses: actions/setup-node@v4
				with:
					node-version: '20'
			- name: Install dependencies
				run: npm ci
			- name: Run ESLint
				run: npm run lint
			- name: Run Prettier check
				run: npx prettier --check .
```

### Build CI Workflow

```yaml
name: Build CI
on:
	push:
		branches: [ main ]
	pull_request:
		branches: [ main ]
jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- name: Checkout code
				uses: actions/checkout@v4
			- name: Set up Node.js
				uses: actions/setup-node@v4
				with:
					node-version: '20'
			- name: Install dependencies
				run: npm ci
			- name: Build project
				run: npm run build
```

## Husky

- Pre-commit Hook: Führt automatisch `lint:fix` und `prettier:fix` vor jedem Commit aus

## Hinweise

- Das Dashboard funktioniert nur lokal, da Systeminformationen und Dateizugriffe serverseitig erfolgen
- Für produktive Nutzung sollten API-Routen abgesichert und Logrotation eingerichtet werden
- Die GitHub Actions Workflows sorgen für automatische Codequalität und Build-Prüfung bei jedem Push/PR

## Beispiel für eigene Metriken

Du kannst die API-Routen erweitern, um weitere Systemwerte oder eigene Metriken zu erfassen und darzustellen.

---

**Letzte Änderung:** 29.09.2025
