/**
 * Configuration for template generation
 */

export const OPTIONS = {
  monorepo: ['turborepo', 'nx', 'lerna'],
  packageManager: ['npm', 'yarn', 'pnpm'],
  frontend: ['react', 'nextjs', 'vue', 'nuxt', 'angular'],
  styling: ['css', 'scss', 'tailwind', 'styled-components'],
  backend: ['express', 'nestjs', 'fastify', 'koa'],
  database: ['postgresql', 'mongodb', 'mysql', 'sqlite'],
  orm: ['prisma', 'typeorm', 'mongoose', 'drizzle'],
  linting: [true, false],
  docker: [true, false]
};

// ORM compatibility with databases
export const ORM_DATABASE_COMPATIBILITY = {
  prisma: ['postgresql', 'mongodb', 'mysql', 'sqlite'],
  typeorm: ['postgresql', 'mysql', 'sqlite'],
  mongoose: ['mongodb'],
  drizzle: ['postgresql', 'mysql', 'sqlite']
};

// Popular combinations to pre-generate
export const POPULAR_TEMPLATES = [
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'nestjs',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  },
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'react',
    styling: 'tailwind',
    linting: true,
    backend: 'express',
    database: 'mongodb',
    orm: 'mongoose',
    docker: true
  },
  {
    monorepo: 'nx',
    packageManager: 'npm',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'nestjs',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  },
  {
    monorepo: 'turborepo',
    packageManager: 'pnpm',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'nestjs',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  },
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
];

// CLI commands for each framework
export const CLI_COMMANDS = {
  monorepo: {
    turborepo: 'npx create-turbo@latest',
    nx: 'npx create-nx-workspace@latest',
    lerna: 'npx lerna init'
  },
  frontend: {
    react: 'npm create vite@latest',
    nextjs: 'npx create-next-app@latest',
    vue: 'npm create vue@latest',
    nuxt: 'npx nuxi@latest init',
    angular: 'npx @angular/cli@latest new'
  },
  backend: {
    express: null, // Manual setup
    nestjs: 'npx @nestjs/cli new',
    fastify: 'npx fastify-cli generate',
    koa: null // Manual setup
  },
  orm: {
    prisma: 'npx prisma init',
    typeorm: 'npx typeorm init',
    mongoose: null, // Manual setup
    drizzle: 'npm install drizzle-orm'
  }
};

export default {
  OPTIONS,
  ORM_DATABASE_COMPATIBILITY,
  POPULAR_TEMPLATES,
  CLI_COMMANDS
};
