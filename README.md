## DevOps Dashboard

<<<<<<< Updated upstream
![CI](https://img.shields.io/github/workflow/status/<USER>/<REPO>/CI)
![Lint/Test](https://img.shields.io/github/workflow/status/<USER>/<REPO>/Lint-Test)
=======
![Build (ci.yml)](<https://img.shields.io/github/actions/workflow/status/33SLueck/devops-einblick/ci.yml?branch=main&label=build%20(ci.yml)>)
![Lint/Test](https://img.shields.io/github/actions/workflow/status/33SLueck/devops-einblick/test.yml?branch=main)
>>>>>>> Stashed changes
![Coverage](https://img.shields.io/badge/coverage-auto-green)

## Features

- Next.js Dashboard mit Systemmetriken (CPU, RAM, Netzwerk, Disk)
- Loganzeige (neuste Einträge oben, scrollbar, Analytics für Page Loads/IPs)
- Logging mit Winston (Konsole & Datei)
- Monitoring mit Sentry (optional)
- API-Routen: `/api/log`, `/api/sysinfo`, `/api/logs`
- Husky Pre-Commit Hook für Linting/Formatting
- GitHub Actions für CI, Lint/Test
- Code Coverage mit Jest
- dotenv für Umgebungsvariablen

## Getting Started

```bash
npm install
npm run dev
```

## Test & Coverage

```bash
npm run test
npm run coverage
```

## Projektstruktur

```
public/
src/
	app/
		api/
		...
```

## API-Routen

- **/api/log**: Logging vom Client an Server
- **/api/sysinfo**: Systemmetriken
- **/api/logs**: Logdatei auslesen

## DevOps & Monitoring

- **Linting/Formatting**: ESLint, Prettier, Husky
- **CI/CD**: GitHub Actions Workflows
- **Logging**: Winston
- **Monitoring**: Sentry (optional)
- **Testing/Coverage**: Jest, Testing Library
- **dotenv**: Umgebungsvariablen

## Badges

- CI Status
- Lint/Test Status
- Coverage

> Passe die Badge-Links (`<USER>/<REPO>`) für dein GitHub-Repo an.

---

**Letzte Änderung:** 29.09.2025
