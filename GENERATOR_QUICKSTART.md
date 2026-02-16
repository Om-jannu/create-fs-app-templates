# Generator Quick Start Guide

## Installation

```bash
cd generator
npm install
```

## Test the Generator

Generate a single test template to verify everything works:

```bash
npm test
```

This will create: `templates/turborepo-npm-nextjs-tailwind-lint-express-postgresql-prisma-docker`

## Generate Popular Templates

Generate the 5 most popular template combinations:

```bash
npm run generate:all
```

This creates:
1. `turborepo-npm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker`
2. `turborepo-npm-react-tailwind-lint-express-mongodb-mongoose-docker`
3. `nx-npm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker`
4. `turborepo-pnpm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker`
5. `turborepo-npm-react-tailwind-lint-fastify-postgresql-prisma-docker`

## Generate 15 Diverse Templates

Generate a curated set of 15 templates covering different combinations:

```bash
npm run generate:batch
```

This creates templates with:
- Different monorepo frameworks (Turborepo, Nx, Lerna)
- Different package managers (npm, yarn, pnpm)
- Different frontend frameworks (Next.js, React, Vue)
- Different styling solutions (Tailwind, CSS, Styled Components)
- Different backend frameworks (NestJS, Express, Fastify)
- Different databases (PostgreSQL, MongoDB, MySQL, SQLite)
- Different ORMs (Prisma, TypeORM, Mongoose, Drizzle)
- With/without linting
- With/without Docker

## Generate Custom Template

Create a specific template with your own configuration:

```bash
npm run generate -- '{"monorepo":"turborepo","packageManager":"npm","frontend":"nextjs","styling":"tailwind","linting":true,"backend":"nestjs","database":"postgresql","orm":"prisma","docker":true}'
```

## Configuration Options

### Required Fields
- `monorepo`: turborepo | nx | lerna
- `packageManager`: npm | yarn | pnpm
- `frontend`: nextjs | react | vue | nuxt | angular
- `styling`: css | scss | tailwind | styled-components
- `backend`: express | nestjs | fastify | koa
- `database`: postgresql | mongodb | mysql | sqlite
- `orm`: prisma | typeorm | mongoose | drizzle
- `linting`: true | false
- `docker`: true | false

### Compatibility Rules
- Mongoose only works with MongoDB
- MongoDB only works with Mongoose
- TypeORM doesn't support MongoDB
- Drizzle doesn't support MongoDB

## Output

All templates are generated in the `templates/` directory at the root of the project.

## Testing a Generated Template

```bash
cd templates/turborepo-npm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker
npm install
docker-compose up -d  # Start database
cd apps/api
npm run prisma:migrate  # Run migrations
cd ../..
npm run dev  # Start all apps
```

## Troubleshooting

### "Command not found" errors
Make sure you have Node.js 18+ installed and npm is available.

### Generation fails
Check the error message. Common issues:
- Invalid ORM-Database combination
- Network issues downloading packages
- Insufficient disk space

### Templates are incomplete
Some CLIs require interactive input. The generator tries to use non-interactive flags, but some frameworks may need manual intervention.

## Next Steps

1. Test the generator with `npm test`
2. Generate popular templates with `npm run generate:all`
3. Review the generated templates in `templates/` directory
4. Test a few templates by installing and running them
5. If everything works, generate more templates with `npm run generate:batch`
6. Customize `src/batch.js` to add more template combinations

## Performance

- Single template: ~2-5 minutes
- 5 popular templates: ~10-25 minutes
- 15 batch templates: ~30-75 minutes

Time varies based on:
- Network speed (downloading packages)
- CPU speed (running CLIs)
- Disk speed (writing files)
