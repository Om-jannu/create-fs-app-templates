# my-app

Full-stack application built with modern technologies.

## Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: Next.js 15 with App Router
- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL (or Docker)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
# Copy the environment template to .env
cp apps/api/.env.template apps/api/.env
```

Edit the `.env` file with your database credentials.

### 3. Start Database (Docker)

```bash
docker-compose up -d postgres
```

### 4. Run Migrations

```bash
cd apps/api
npm run prisma:migrate:dev
npm run prisma:generate
```

### 5. Start Development

From root directory:

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api

## Project Structure

```
my-app/
├── apps/
│   ├── web/         # Next.js frontend
│   └── api/         # NestJS backend
├── packages/
│   ├── shared/      # Shared types & utilities
│   ├── eslint-config/    # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
├── docker-compose.yml
├── turbo.json
└── package.json
```

## Available Scripts

- `npm run dev` - Start all apps in dev mode
- `npm run build` - Build all apps
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turborepo Documentation](https://turbo.build)

## License

MIT
