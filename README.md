# demo-node-app

A simple Express.js application containerized with Docker, deployed to **AWS ECS Fargate** behind an **Application Load Balancer** with HTTPS.

**Live URLs**

- https://www.demoexpressapp.me
- https://www.demoexpressapp.me/health
- https://demoexpressapp.me

---

## Features

- Express REST API with health check and sample endpoints
- Docker image stored in **Amazon ECR**
- **ECS Fargate** for container orchestration
- **ALB** with ACM certificate (HTTPS)
- **Route 53** DNS for `demoexpressapp.me`
- **GitHub Actions** CI/CD with **OIDC** (no AWS access keys in GitHub)

---

## Project structure

```
demo-node-app/
├── .github/workflows/
│   └── deploy.yml          # Build, test, and deploy pipeline
├── iam/                    # IAM policies for GitHub OIDC (reference)
├── src/
│   ├── app.js              # Express app (exported for tests)
│   ├── index.js            # Server entry point
│   └── routes/api.js       # API routes
├── test/
│   └── app.test.js         # Automated tests
├── Dockerfile
├── ecs-task-definition.json
├── package.json
└── .env.example
```

---

## API endpoints

| Method | Endpoint        | Response        |
|--------|-----------------|-----------------|
| GET    | `/`             | Welcome JSON    |
| GET    | `/health`       | Health check    |
| GET    | `/api/ping`     | `pong` (text)   |
| GET    | `/api/status`   | Status (text)   |
| GET    | `/api/info`     | App info JSON   |
| GET    | `/api/users`    | User list JSON  |
| POST   | `/api/echo`     | Echo request body |

---

## Local development

### Prerequisites

- Node.js 24+
- npm

### Setup

```bash
cp .env.example .env
npm install
npm start
```

App runs at http://localhost:3000

### Run tests

```bash
npm test
```

### Run with Docker

```bash
docker build -t demo-node-app .
docker run -p 3000:3000 -e PORT=3000 demo-node-app
```

---

## CI/CD pipeline

Pushing to `main` triggers **Build, Test and Deploy** (`.github/workflows/deploy.yml`):

1. Install dependencies
2. Run tests
3. Authenticate to AWS via **GitHub OIDC**
4. Build and push Docker image to **ECR**
5. Deploy to **ECS Fargate**
6. Smoke test the live health endpoint

### GitHub repository variables

| Variable           | Example value                                                              |
|--------------------|----------------------------------------------------------------------------|
| `AWS_REGION`       | `ap-south-1`                                                               |
| `AWS_ROLE_ARN`     | `arn:aws:iam::535166420367:role/github-actions-express-app-deploy`         |
| `ECR_REPOSITORY`   | `demo-node-app`                                                            |
| `ECS_CLUSTER`      | `demo-node-app-cluster`                                                    |
| `ECS_SERVICE`      | `demo-node-app-service`                                                    |
| `HEALTH_CHECK_URL` | `https://www.demoexpressapp.me/health`                                     |

---

## AWS infrastructure

| Resource            | Name / ID                          |
|---------------------|------------------------------------|
| AWS account         | `535166420367`                     |
| Region              | `ap-south-1` (Mumbai)              |
| ECR repository      | `demo-node-app`                    |
| ECS cluster         | `demo-node-app-cluster`            |
| ECS service         | `demo-node-app-service`            |
| Task definition     | `demo-node-app-task`               |
| ALB                 | `demo-node-app-alb`                |
| Domain              | `demoexpressapp.me` (Route 53)     |

---

## Environment variables

| Variable   | Default | Description      |
|------------|---------|------------------|
| `PORT`     | `3000`  | Server port      |
| `NODE_ENV` | —       | `production` in ECS |

Copy `.env.example` to `.env` for local use. Never commit `.env`.

---

## License

MIT