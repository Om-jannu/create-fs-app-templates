# my-app

Full-stack application with Next.js and Express.

## Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: Next.js 15 with App Router
- **Backend**: Express.js
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

## Project Structure

```
my-app/
├── apps/
│   ├── web/         # Next.js frontend
│   └── api/         # Express backend
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
- `npm run format` - Format code

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turborepo Documentation](https://turbo.build)

## License

MIT
