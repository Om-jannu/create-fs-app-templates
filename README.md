# Create-FS-App Templates

Official templates for [create-fs-app](https://github.com/YOUR_USERNAME/create-fs-app).

## Available Templates

### 1. turborepo-nextjs-nestjs-postgresql-prisma
Production-ready full-stack monorepo with:
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: NestJS with Prisma ORM
- **Database**: PostgreSQL
- **Features**: Docker setup, Swagger API docs, shared packages, full-stack TypeScript

### 2. turborepo-react-express-mongodb-mongoose
MERN stack monorepo with:
- **Frontend**: React 18 with Vite, TypeScript, Tailwind CSS
- **Backend**: Express.js with Mongoose ODM
- **Database**: MongoDB
- **Features**: Docker setup, shared packages, REST API, clean architecture

### 3. turborepo-nextjs-express-postgresql-prisma
Simplified full-stack monorepo with:
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Express.js with Prisma ORM
- **Database**: PostgreSQL
- **Features**: Docker setup, lightweight backend, shared packages

## Usage

These templates are used automatically by create-fs-app:

```bash
npx create-fs-app my-project
```

Or specify a template directly:

```bash
npx create-fs-app my-project --template turborepo-nextjs-nestjs-postgresql-prisma
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
- ✅ Example CRUD operations
- ✅ Modern UI components

## Manual Testing

To test a template manually:

```bash
# Clone this repo
git clone https://github.com/YOUR_USERNAME/create-fs-app-templates.git
cd create-fs-app-templates/templates

# Copy a template
cp -r turborepo-nextjs-nestjs-postgresql-prisma ~/my-test-app
cd ~/my-test-app

# Replace 'my-app' with your project name in all files
find . -type f -exec sed -i '' 's/my-app/your-project-name/g' {} +

# Install and run
npm install
docker-compose up -d
npm run dev
```

## Project Structure

Each template follows this structure:

```
template-name/
├── apps/
│   ├── web/         # Frontend app
│   └── api/         # Backend app
├── packages/
│   ├── shared/      # Shared types & utilities
│   ├── eslint-config/    # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
├── docker-compose.yml
├── turbo.json
└── package.json
```

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

MIT

