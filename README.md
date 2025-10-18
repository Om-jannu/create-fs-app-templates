# Create-FS-App Templates

Official templates for [create-fs-app](https://github.com/Om-jannu/create-fs-app).

## Available Templates

### Turborepo Templates

#### 1. turborepo-nextjs-nestjs-postgresql-prisma
Production-ready full-stack monorepo with:
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: NestJS with Prisma ORM
- **Database**: PostgreSQL
- **Features**: Docker setup, shared packages, full-stack TypeScript

#### 2. turborepo-react-express-mongodb-mongoose
MERN stack monorepo with:
- **Frontend**: React 18 with Vite, TypeScript, Tailwind CSS
- **Backend**: Express.js with Mongoose ODM
- **Database**: MongoDB
- **Features**: Docker setup, shared packages, REST API

#### 3. turborepo-nextjs-express-postgresql-prisma
Simplified full-stack monorepo with:
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Express.js with Prisma ORM
- **Database**: PostgreSQL
- **Features**: Docker setup, lightweight backend, shared packages

## Usage

These templates are used automatically by create-fs-app:

```bash
npx create-fs-app my-app
```

Or specify a template directly:

```bash
npx create-fs-app my-app --template turborepo-nextjs-nestjs-postgresql-prisma
```

## Template Features

All templates include:
- ✅ Full TypeScript support
- ✅ Monorepo setup with Turborepo
- ✅ Shared packages for code reuse
- ✅ Docker Compose for local development
- ✅ Environment configuration examples
- ✅ ESLint and Prettier
- ✅ Production-ready structure

## Contributing

See [create-fs-app TEMPLATE_GUIDE.md](https://github.com/Om-jannu/create-fs-app/blob/main/docs/TEMPLATE_GUIDE.md) for guidelines on creating new templates.

## License

MIT

