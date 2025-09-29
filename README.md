# DevOps Dashboard

![Build Status](https://img.shields.io/github/actions/workflow/status/33SLueck/devops-einblick/ci.yml?branch=main&label=build)

![Lint/Test Status](https://img.shields.io/github/actions/workflow/status/33SLueck/devops-einblick/test.yml?branch=main&label=lint%20%26%20test)

![Coverage](https://img.shields.io/badge/coverage-auto-green)

![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20React%20%7C%20TypeScript-blue)

![Packages](https://img.shields.io/badge/packages-Chart.js%2C%20Winston%2C%20systeminformation%2C%20Husky%2C%20Jest%2C%20Testing%20Library-lightgrey)

[![Open Issues](https://img.shields.io/github/issues/33SLueck/devops-einblick?color=orange)](https://github.com/33SLueck/devops-einblick/issues)
</p>
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

```bash
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
