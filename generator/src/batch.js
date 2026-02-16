#!/usr/bin/env node

import chalk from 'chalk';
import { generateTemplate } from './index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Batch generate templates
 * Add your custom configurations here
 */
const templates = [
  // Turborepo + Next.js variants
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
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'express',
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
  
  // React + Vite variants
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
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'react',
    styling: 'tailwind',
    linting: true,
    backend: 'fastify',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  },
  
  // Nx variants
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
    monorepo: 'nx',
    packageManager: 'npm',
    frontend: 'react',
    styling: 'tailwind',
    linting: true,
    backend: 'nestjs',
    database: 'mongodb',
    orm: 'mongoose',
    docker: true
  },
  
  // MySQL variants
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'express',
    database: 'mysql',
    orm: 'prisma',
    docker: true
  },
  
  // Vue variants
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'vue',
    styling: 'tailwind',
    linting: true,
    backend: 'express',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  },
  
  // Styled Components variant
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'nextjs',
    styling: 'styled-components',
    linting: true,
    backend: 'nestjs',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  },
  
  // TypeORM variant
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'nestjs',
    database: 'postgresql',
    orm: 'typeorm',
    docker: true
  },
  
  // Drizzle variant
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'express',
    database: 'postgresql',
    orm: 'drizzle',
    docker: true
  },
  
  // Without Docker
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'express',
    database: 'sqlite',
    orm: 'prisma',
    docker: false
  },
  
  // Without Linting
  {
    monorepo: 'turborepo',
    packageManager: 'npm',
    frontend: 'react',
    styling: 'css',
    linting: false,
    backend: 'express',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  },
  
  // Yarn variant
  {
    monorepo: 'turborepo',
    packageManager: 'yarn',
    frontend: 'nextjs',
    styling: 'tailwind',
    linting: true,
    backend: 'nestjs',
    database: 'postgresql',
    orm: 'prisma',
    docker: true
  }
];

async function batchGenerate() {
  console.log(chalk.bold(`\n🚀 Batch Generating ${templates.length} Templates\n`));
  
  const outputDir = path.join(__dirname, '..', '..', 'templates');
  
  let successful = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < templates.length; i++) {
    const config = templates[i];
    console.log(chalk.bold(`\n[${i + 1}/${templates.length}] Generating template...`));
    
    try {
      await generateTemplate(config, outputDir);
      successful++;
    } catch (error) {
      failed++;
      errors.push({ config, error: error.message });
      console.error(chalk.red(`Failed: ${error.message}`));
    }
  }

  console.log(chalk.bold('\n' + '='.repeat(60)));
  console.log(chalk.bold('Batch Generation Complete'));
  console.log(chalk.bold('='.repeat(60)));
  console.log(chalk.green(`✓ Successful: ${successful}`));
  if (failed > 0) {
    console.log(chalk.red(`✗ Failed: ${failed}`));
    console.log('\nErrors:');
    errors.forEach(({ config, error }) => {
      console.log(chalk.red(`  - ${config.monorepo}-${config.frontend}-${config.backend}: ${error}`));
    });
  }
  console.log('');
}

batchGenerate().catch(error => {
  console.error(chalk.red('Batch generation failed:'), error);
  process.exit(1);
});
