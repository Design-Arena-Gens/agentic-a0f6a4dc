# Goat Farm Management System (GFMS)

Enterprise-grade management platform for Barbari and Boer goat farms with genetics, health, feed, finance, and compliance workflows.

## Project Structure

```
├── goat-farm-backend/   # Spring Boot 3 (Java 21)
├── goat-farm-frontend/  # React 18 + Vite + Tailwind + Material UI
├── docker-compose.yml   # Postgres + Redis + Backend + Frontend
```

## Backend

- Spring Boot 3, Java 21, Maven
- JWT security with role-based access (SUPER_ADMIN, FARM_MANAGER, VERIFIER, APPROVER, WORKER, VET)
- Modules: user/roles, farms, goats & genetics, breeding, health, feed, finance, tasks, notifications, sensors, dashboards
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Seed data via `src/main/resources/data.sql` (roles, demo users, 1000 goats, sample finance)

### Run Backend Locally

```bash
cd goat-farm-backend
mvn spring-boot:run
```

## Frontend

- React 18 with Vite, React Router, Redux Toolkit, React Query
- TailwindCSS + Material UI components
- Dashboards, goat registry, breeding, health, feed, finance, tasks, notifications, compliance and reporting modules

### Run Frontend Locally

```bash
cd goat-farm-frontend
npm install
npm run dev
```

## Docker

```bash
docker-compose up --build
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8080`

## Demo Accounts

| Username    | Password      | Roles                    |
|-------------|---------------|--------------------------|
| superadmin  | ChangeMe123!  | SUPER_ADMIN              |
| manager     | ChangeMe123!  | FARM_MANAGER, APPROVER   |
| vet         | ChangeMe123!  | VET                      |

## CI/CD

A GitHub Actions workflow (see `.github/workflows/ci.yml`) builds, tests, and packages backend and frontend artifacts and can deploy to Vercel/Supabase.

## Reports & Exports

- PDF/XLSX export via jsPDF + xlsx helpers
- Scheduled reporting stubs in frontend (extendable)

## Advanced Analytics

- Dashboard displays fertility, mortality, feed cost per kg gain, ROI
- Extend `DashboardService` for deeper KPIs and IoT ingestion

## Environment Variables

- `APP_JWT_SECRET` (base64) overrides default secret
- `POSTGRES_*` for database credentials (see docker-compose)
- `REDIS_*` for cache host/port

## Deployment

Follow Vercel CLI instructions after building locally:

```bash
npm install --prefix goat-farm-frontend
npm run build --prefix goat-farm-frontend
mvn -f goat-farm-backend/pom.xml package
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-a0f6a4dc
```
