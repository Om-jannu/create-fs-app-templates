import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

/**
 * Generate Turborepo monorepo structure
 */
export async function generateTurborepo(targetDir, config) {
  console.log('  → Initializing Turborepo...');
  
  // Create basic structure
  await fs.ensureDir(targetDir);
  await fs.ensureDir(path.join(targetDir, 'apps'));
  await fs.ensureDir(path.join(targetDir, 'packages'));

  // Create root package.json
  const packageJson = {
    name: 'my-app',
    version: '0.0.0',
    private: true,
    workspaces: ['apps/*', 'packages/*'],
    scripts: {
      dev: 'turbo dev',
      build: 'turbo build',
      lint: 'turbo lint',
      clean: 'turbo clean'
    },
    devDependencies: {
      turbo: '^2.0.0'
    }
  };

  await fs.writeJSON(path.join(targetDir, 'package.json'), packageJson, { spaces: 2 });

  // Create turbo.json
  const turboConfig = {
    $schema: 'https://turbo.build/schema.json',
    tasks: {
      build: {
        dependsOn: ['^build'],
        outputs: ['.next/**', '!.next/cache/**', 'dist/**']
      },
      dev: {
        cache: false,
        persistent: true
      },
      lint: {
        dependsOn: ['^lint']
      }
    }
  };

  await fs.writeJSON(path.join(targetDir, 'turbo.json'), turboConfig, { spaces: 2 });

  // Create .gitignore
  const gitignore = `# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/
build
dist/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env*.local

# Turbo
.turbo
`;

  await fs.writeFile(path.join(targetDir, '.gitignore'), gitignore);

  // Create .npmrc for package manager
  if (config.packageManager === 'pnpm') {
    await fs.writeFile(path.join(targetDir, '.npmrc'), 'node-linker=hoisted\n');
  }
}

/**
 * Generate Nx monorepo structure
 */
export async function generateNx(targetDir, config) {
  console.log('  → Initializing Nx workspace...');
  
  // Nx requires interactive setup, we'll create a minimal structure
  await fs.ensureDir(targetDir);
  
  const packageJson = {
    name: 'my-app',
    version: '0.0.0',
    private: true,
    workspaces: ['apps/*', 'packages/*'],
    scripts: {
      dev: 'nx run-many --target=dev --all',
      build: 'nx run-many --target=build --all',
      lint: 'nx run-many --target=lint --all'
    },
    devDependencies: {
      nx: '^18.0.0',
      '@nx/workspace': '^18.0.0'
    }
  };

  await fs.writeJSON(path.join(targetDir, 'package.json'), packageJson, { spaces: 2 });

  // Create nx.json
  const nxConfig = {
    extends: 'nx/presets/npm.json',
    targetDefaults: {
      build: {
        cache: true
      },
      lint: {
        cache: true
      }
    }
  };

  await fs.writeJSON(path.join(targetDir, 'nx.json'), nxConfig, { spaces: 2 });

  await fs.ensureDir(path.join(targetDir, 'apps'));
  await fs.ensureDir(path.join(targetDir, 'packages'));
}

/**
 * Generate Lerna monorepo structure
 */
export async function generateLerna(targetDir, config) {
  console.log('  → Initializing Lerna workspace...');
  
  await fs.ensureDir(targetDir);
  
  const packageJson = {
    name: 'my-app',
    version: '0.0.0',
    private: true,
    workspaces: ['apps/*', 'packages/*'],
    scripts: {
      dev: 'lerna run dev --parallel',
      build: 'lerna run build',
      lint: 'lerna run lint'
    },
    devDependencies: {
      lerna: '^8.0.0'
    }
  };

  await fs.writeJSON(path.join(targetDir, 'package.json'), packageJson, { spaces: 2 });

  // Create lerna.json
  const lernaConfig = {
    version: 'independent',
    npmClient: config.packageManager,
    useWorkspaces: true,
    packages: ['apps/*', 'packages/*']
  };

  await fs.writeJSON(path.join(targetDir, 'lerna.json'), lernaConfig, { spaces: 2 });

  await fs.ensureDir(path.join(targetDir, 'apps'));
  await fs.ensureDir(path.join(targetDir, 'packages'));
}

/**
 * Main monorepo generator
 */
export async function generateMonorepo(targetDir, config) {
  switch (config.monorepo) {
    case 'turborepo':
      await generateTurborepo(targetDir, config);
      break;
    case 'nx':
      await generateNx(targetDir, config);
      break;
    case 'lerna':
      await generateLerna(targetDir, config);
      break;
    default:
      throw new Error(`Unknown monorepo framework: ${config.monorepo}`);
  }
}

export default generateMonorepo;
