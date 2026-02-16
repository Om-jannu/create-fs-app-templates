#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { generateTemplateName, validateConfig } from './utils.js';
import { generateMonorepo } from './generators/monorepo.js';
import { generateFrontend } from './generators/frontend.js';
import { generateBackend } from './generators/backend.js';
import { generateDatabase } from './generators/database.js';
import { generateSharedPackages } from './generators/shared.js';
import { POPULAR_TEMPLATES } from './config.js';

/**
 * Main template generator
 */
export async function generateTemplate(config, outputDir) {
  const spinner = ora('Generating template...').start();

  try {
    // Validate configuration
    const validation = validateConfig(config);
    if (!validation.valid) {
      spinner.fail('Invalid configuration');
      validation.errors.forEach(err => console.error(chalk.red(`  ✗ ${err}`)));
      process.exit(1);
    }

    const templateName = generateTemplateName(config);
    const targetDir = path.join(outputDir, templateName);

    spinner.text = `Generating template: ${chalk.cyan(templateName)}`;

    // Clean target directory if exists
    if (await fs.pathExists(targetDir)) {
      spinner.text = 'Cleaning existing directory...';
      await fs.remove(targetDir);
    }

    // Step 1: Generate monorepo structure
    spinner.text = 'Creating monorepo structure...';
    await generateMonorepo(targetDir, config);

    // Step 2: Generate frontend app
    spinner.text = 'Creating frontend app...';
    await generateFrontend(targetDir, config);

    // Step 3: Generate backend app
    spinner.text = 'Creating backend app...';
    await generateBackend(targetDir, config);

    // Step 4: Generate database/ORM setup
    spinner.text = 'Setting up database and ORM...';
    await generateDatabase(targetDir, config);

    // Step 5: Generate shared packages
    spinner.text = 'Creating shared packages...';
    await generateSharedPackages(targetDir, config);

    // Step 6: Create README
    spinner.text = 'Creating documentation...';
    await createReadme(targetDir, config, templateName);

    spinner.succeed(chalk.green(`✓ Template generated: ${templateName}`));
    
    console.log('\n' + chalk.bold('Next steps:'));
    console.log(chalk.gray(`  cd templates/${templateName}`));
    console.log(chalk.gray(`  ${config.packageManager} install`));
    if (config.docker) {
      console.log(chalk.gray('  docker-compose up -d'));
    }
    console.log(chalk.gray(`  ${config.packageManager} run dev`));
    console.log('');

    return targetDir;
  } catch (error) {
    spinner.fail('Template generation failed');
    console.error(chalk.red('\nError:'), error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

/**
 * Create README for the template
 */
async function createReadme(targetDir, config, templateName) {
  const readme = `# ${templateName}

Full-stack monorepo template with modern technologies.

## Tech Stack

- **Monorepo**: ${config.monorepo}
- **Package Manager**: ${config.packageManager}
- **Frontend**: ${config.frontend} with ${config.styling}
- **Backend**: ${config.backend}
- **Database**: ${config.database}
- **ORM**: ${config.orm}
- **Linting**: ${config.linting ? 'ESLint + Prettier' : 'Disabled'}
- **Docker**: ${config.docker ? 'Enabled' : 'Disabled'}

## Getting Started

### Prerequisites

- Node.js 18+
- ${config.packageManager === 'npm' ? 'npm' : config.packageManager === 'yarn' ? 'Yarn' : 'pnpm'}
${config.docker ? '- Docker & Docker Compose' : ''}

### Installation

1. Install dependencies:
\`\`\`bash
${config.packageManager} install
\`\`\`

${config.docker ? `2. Start the database:
\`\`\`bash
docker-compose up -d
\`\`\`

3. Run database migrations:
\`\`\`bash
cd apps/api
${config.orm === 'prisma' ? `${config.packageManager} run prisma:migrate` : config.orm === 'typeorm' ? 'npm run typeorm migration:run' : '# No migrations needed'}
\`\`\`

4. Start development servers:` : `2. Start development servers:`}
\`\`\`bash
${config.packageManager} run dev
\`\`\`

## Project Structure

\`\`\`
.
├── apps/
│   ├── web/          # Frontend application
│   └── api/          # Backend application
├── packages/
│   ├── shared/       # Shared types and utilities
│   ├── typescript-config/  # Shared TypeScript configs
${config.linting ? '│   └── eslint-config/      # Shared ESLint configs' : ''}
${config.docker ? '├── docker-compose.yml' : ''}
├── ${config.monorepo === 'turborepo' ? 'turbo.json' : config.monorepo === 'nx' ? 'nx.json' : 'lerna.json'}
└── package.json
\`\`\`

## Available Scripts

- \`${config.packageManager} run dev\` - Start development servers
- \`${config.packageManager} run build\` - Build all apps
- \`${config.packageManager} run lint\` - Lint all apps
${config.orm === 'prisma' ? `- \`${config.packageManager} run prisma:studio\` - Open Prisma Studio` : ''}

## Environment Variables

### Backend (\`apps/api/.env\`)

\`\`\`env
${config.orm === 'prisma' || config.orm === 'drizzle' ? `DATABASE_URL="${config.database === 'postgresql' ? 'postgresql://user:password@localhost:5432/dbname' : config.database === 'mongodb' ? 'mongodb://localhost:27017/dbname' : config.database === 'mysql' ? 'mysql://user:password@localhost:3306/dbname' : 'file:./dev.db'}"` : config.orm === 'mongoose' ? 'MONGODB_URI=mongodb://localhost:27017/dbname' : `DB_HOST=localhost
DB_PORT=${config.database === 'postgresql' ? 5432 : 3306}
DB_USER=user
DB_PASSWORD=password
DB_NAME=dbname`}
PORT=3001
\`\`\`

## License

MIT
`;

  await fs.writeFile(path.join(targetDir, 'README.md'), readme);
}

/**
 * Generate all popular templates
 */
async function generateAllPopular() {
  console.log(chalk.bold('\n🚀 Generating popular templates...\n'));
  
  const outputDir = path.join(process.cwd(), 'templates');
  await fs.ensureDir(outputDir);

  for (let i = 0; i < POPULAR_TEMPLATES.length; i++) {
    const config = POPULAR_TEMPLATES[i];
    console.log(chalk.bold(`\n[${i + 1}/${POPULAR_TEMPLATES.length}] Generating template...`));
    await generateTemplate(config, outputDir);
  }

  console.log(chalk.bold.green('\n✓ All popular templates generated!\n'));
}

/**
 * Generate single template from CLI args
 */
async function generateSingle() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(chalk.yellow('Usage: npm run generate -- <config-json>'));
    console.log(chalk.yellow('   or: npm run generate -- --all'));
    console.log('\nExample:');
    console.log(chalk.gray('  npm run generate -- \'{"monorepo":"turborepo","packageManager":"npm","frontend":"nextjs","styling":"tailwind","linting":true,"backend":"nestjs","database":"postgresql","orm":"prisma","docker":true}\''));
    process.exit(1);
  }

  if (args[0] === '--all') {
    await generateAllPopular();
    return;
  }

  try {
    const config = JSON.parse(args[0]);
    const outputDir = path.join(process.cwd(), 'templates');
    await fs.ensureDir(outputDir);
    await generateTemplate(config, outputDir);
  } catch (error) {
    console.error(chalk.red('Invalid JSON configuration'));
    console.error(error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSingle();
}

export default generateTemplate;
