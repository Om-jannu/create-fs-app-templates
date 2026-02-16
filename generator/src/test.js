#!/usr/bin/env node

import chalk from 'chalk';
import { generateTemplate } from './index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Test configuration
 */
const testConfig = {
  monorepo: 'turborepo',
  packageManager: 'npm',
  frontend: 'nextjs',
  styling: 'tailwind',
  linting: true,
  backend: 'express',
  database: 'postgresql',
  orm: 'prisma',
  docker: true
};

console.log(chalk.bold('\n🧪 Testing Template Generator\n'));
console.log(chalk.gray('Configuration:'));
console.log(chalk.gray(JSON.stringify(testConfig, null, 2)));
console.log('');

const outputDir = path.join(__dirname, '..', '..', 'templates');

try {
  await generateTemplate(testConfig, outputDir);
  console.log(chalk.green.bold('\n✓ Test passed!\n'));
} catch (error) {
  console.error(chalk.red.bold('\n✗ Test failed!\n'));
  console.error(error);
  process.exit(1);
}
