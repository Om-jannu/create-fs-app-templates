# Template Generator

Automated template generator for create-fs-app that creates full-stack monorepo templates using official CLIs.

## Features

- ✅ Uses official CLIs (create-next-app, @nestjs/cli, create-vite, etc.)
- ✅ Supports all tech stack combinations
- ✅ Validates ORM-Database compatibility
- ✅ Generates Docker configurations
- ✅ Creates shared packages automatically
- ✅ Configurable linting and styling

## Installation

```bash
cd generator
npm install
```

## Usage

### Generate All Popular Templates

```bash
npm run generate -- --all
```

This will generate the 5 most popular template combinations defined in `src/config.js`.

### Generate Single Template

```bash
npm run generate -- '{"monorepo":"turborepo","packageManager":"npm","frontend":"nextjs","styling":"tailwind","linting":true,"backend":"nestjs","database":"postgresql","orm":"prisma","docker":true}'
```

### Test Generator

```bash
npm test
```

This will generate a test template to verify everything works.

## Configuration Options

### Monorepo Frameworks
- `turborepo` - Turborepo (recommended)
- `nx` - Nx
- `lerna` - Lerna

### Package Managers
- `npm` - npm
- `yarn` - Yarn
- `pnpm` - pnpm

### Frontend Frameworks
- `nextjs` - Next.js 15 with App Router
- `react` - React 18 with Vite
- `vue` - Vue 3
- `nuxt` - Nuxt 3
- `angular` - Angular

### Styling Solutions
- `css` - Plain CSS
- `scss` - SCSS/Sass
- `tailwind` - Tailwind CSS
- `styled-components` - Styled Components

### Backend Frameworks
- `express` - Express.js
- `nestjs` - NestJS (recommended)
- `fastify` - Fastify
- `koa` - Koa

### Databases
- `postgresql` - PostgreSQL
- `mongodb` - MongoDB
- `mysql` - MySQL
- `sqlite` - SQLite

### ORMs
- `prisma` - Prisma (recommended)
- `typeorm` - TypeORM
- `mongoose` - Mongoose (MongoDB only)
- `drizzle` - Drizzle ORM

### Options
- `linting` - Enable ESLint + Prettier (boolean)
- `docker` - Include Docker Compose (boolean)

## ORM-Database Compatibility

| ORM | PostgreSQL | MongoDB | MySQL | SQLite |
|-----|-----------|---------|-------|--------|
| Prisma | ✅ | ✅ | ✅ | ✅ |
| TypeORM | ✅ | ❌ | ✅ | ✅ |
| Mongoose | ❌ | ✅ | ❌ | ❌ |
| Drizzle | ✅ | ❌ | ✅ | ✅ |

## Template Naming Convention

Format: `{monorepo}-{packageManager}-{frontend}-{styling}-[lint-]{backend}-{database}-{orm}-[docker]`

Examples:
- `turborepo-npm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker`
- `nx-pnpm-react-scss-express-mongodb-mongoose`
- `lerna-yarn-vue-tailwind-lint-fastify-mysql-prisma-docker`

## How It Works

1. **Monorepo Setup**: Creates base monorepo structure (Turborepo/Nx/Lerna)
2. **Frontend Generation**: Uses official CLI (create-next-app, create-vite, etc.)
3. **Backend Generation**: Uses official CLI where available (NestJS) or creates structure
4. **Database/ORM Setup**: Configures ORM with proper database connection
5. **Shared Packages**: Creates shared types, configs, and utilities
6. **Docker**: Generates docker-compose.yml with database service
7. **Documentation**: Creates comprehensive README

## Project Structure

```
generator/
├── src/
│   ├── generators/
│   │   ├── monorepo.js      # Monorepo structure generation
│   │   ├── frontend.js      # Frontend app generation
│   │   ├── backend.js       # Backend app generation
│   │   ├── database.js      # Database/ORM setup
│   │   └── shared.js        # Shared packages
│   ├── config.js            # Configuration and popular templates
│   ├── utils.js             # Utility functions
│   ├── index.js             # Main orchestrator
│   └── test.js              # Test script
├── package.json
└── README.md
```

## Adding New Popular Templates

Edit `src/config.js` and add to the `POPULAR_TEMPLATES` array:

```javascript
{
  monorepo: 'turborepo',
  packageManager: 'npm',
  frontend: 'react',
  styling: 'tailwind',
  linting: true,
  backend: 'fastify',
  database: 'postgresql',
  orm: 'prisma',
  docker: true
}
```

## Troubleshooting

### CLI Not Found
Make sure you have Node.js 18+ installed. The generator uses `npx` to run CLIs.

### Permission Errors
Run with appropriate permissions or use `sudo` on Unix systems.

### Generation Fails
Check the error message. Common issues:
- Invalid ORM-Database combination
- Missing Node.js version
- Network issues downloading packages

## Development

### Run in Development Mode
```bash
node src/index.js -- '{"monorepo":"turborepo",...}'
```

### Debug Mode
```bash
NODE_ENV=development node src/index.js -- --all
```

## License

MIT
