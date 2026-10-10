# Demo Polyglot Project

This project was generated with `create-polyglot` and is a multi-language microservice example built with a shared monorepo style.

It contains four independent services running together in one workspace:

- Node.js service on port 3001
- Go service on port 3002
- Java Spring Boot service on port 3003
- Python FastAPI service on port 3004

The root workspace is configured with Turbo for parallel development tasks, while each service runs its own language runtime and local HTTP server.

## What this project is doing

This is a demo project for learning and testing a polyglot architecture. Each service is a small application with its own runtime and its own health endpoint.

### Services

1. Node.js
   - Framework: Express
   - Purpose: lightweight API service with health and logs endpoints
   - Endpoint: `http://localhost:3001/health`

2. Go
   - Framework: standard Go HTTP server
   - Purpose: minimal HTTP service for logging and health checking
   - Endpoint: `http://localhost:3002/health`

3. Java
   - Framework: Spring Boot
   - Purpose: Java backend service using embedded Tomcat
   - Endpoint: `http://localhost:3003/` or `/health` depending on the app

4. Python
   - Framework: FastAPI + Uvicorn
   - Purpose: modern async API service with health and logs endpoints
   - Endpoint: `http://localhost:3004/health`

The project is meant to show how multiple runtimes can coexist in one codebase and be started together for development.

## Prerequisites

Install the following on your machine before starting the project:

- Node.js 18+ or 20+
- npm
- Python 3.11+
- pip
- Go
- Java JDK 17+
- Maven

## Installation

From the root of this project:

```powershell
cd N:\Projects\create-polyglot\demo-project
python -m ensurepip --upgrade
python -m pip install --upgrade pip
python -m pip install -r .\services\python\requirements.txt
npm install
```

If `python -m pip` is not available, reinstall Python and make sure the Python launcher and PATH are enabled during installation.

## Start the project

This project can be started in two ways:

### Option 1: All services together (Turbo)

Use this only after all port conflicts are cleared:

```powershell
cd N:\Projects\create-polyglot\demo-project
npm run dev
```

### Option 2: Start each service manually

This is the safest option on Windows if a previous run left stale processes behind.

Open separate terminals and run:

```powershell
cd N:\Projects\create-polyglot\demo-project\services\node
$env:PORT='3001'
npm run dev
```

```powershell
cd N:\Projects\create-polyglot\demo-project\services\go
$env:PORT='3002'
go run main.go
```

```powershell
cd N:\Projects\create-polyglot\demo-project\services\python
$env:PORT='3004'
python -m uvicorn app.main:app --host 0.0.0.0 --port 3004
```

```powershell
cd N:\Projects\create-polyglot\demo-project\services\java
mvn spring-boot:run
```

## Health checks

After startup, each service should respond on its health endpoint:

- Node: `http://localhost:3001/health`
- Go: `http://localhost:3002/health`
- Python: `http://localhost:3004/health`
- Java: `http://localhost:3003/`

## Useful commands

```powershell
npm run list:services
npm run lint
npm run format
```

## Common issue

If a service fails because the port is already in use, stop any stale service processes and restart the project. On Windows, this usually happens when an old Node, Go, Java, or Python process is still running in the background.

```powershell
Get-Process node,go,java,python -ErrorAction SilentlyContinue | Stop-Process -Force
```

## Notes

- This project is a development demo, not a production deployment setup.
- The generated services are intentionally small and simple so the architecture is easy to inspect and modify.
- The workspace uses a monorepo-style layout with shared tooling and separate runtime folders.
