# Demo Polyglot Project Summary

## 1) What the project is doing
This project is a demonstration of a polyglot microservice architecture: multiple services written in different languages run together inside one monorepo workspace.

The goal is to show how a Node.js app, a Go service, a Java Spring Boot service, and a Python FastAPI service can coexist in one project, communicate through separate ports, and be started together for development.

## 2) Architecture
The project follows a monorepo layout:

- Root workspace with package management and Turbo orchestration
- Each language lives in its own service folder
- Services run independently on separate ports
- Root package config starts dev tasks in parallel

Ports:
- Node.js: 3001
- Go: 3002
- Java: 3003
- Python: 3004

This is a development demo, not a production deployment setup.

## 3) How it was made
The project was generated using create-polyglot, which scaffolds a multi-language project structure automatically.

The root package.json uses Turbo to run all service dev tasks together. Each service folder contains its own runtime-specific config and start script.

The generated structure includes:
- services/node
- services/go
- services/java
- services/python
- root workspace config and Turbo settings

## 4) What each service does
### Node.js service
- Built with Express
- Exposes health and logs endpoints
- Runs on port 3001
- Purpose: lightweight API example

### Go service
- Uses the standard Go HTTP server
- Runs on port 3002
- Purpose: small backend service that logs requests and handles health checks

### Java service
- Built with Spring Boot
- Runs on port 3003
- Purpose: Java backend example using embedded Tomcat

### Python service
- Built with FastAPI and Uvicorn
- Runs on port 3004
- Purpose: modern async API service with health endpoint and log handling

## 5) Typical startup flow
From the demo-project root:

```powershell
npm install
npm run dev
```

On Windows, startup may require clearing stale processes first if previous runs left ports occupied.

## 6) Health check summary
- Node: http://localhost:3001/health
- Go: http://localhost:3002/health
- Python: http://localhost:3004/health
- Java: http://localhost:3003/

## 7) Summary
This project is a practical example of a polyglot monorepo: one workspace, multiple runtimes, one developer setup, and separate services for learning, testing, and extension.
