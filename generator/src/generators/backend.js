import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

/**
 * Generate NestJS backend
 */
export async function generateNestjs(targetDir, config) {
  console.log('  → Creating NestJS API...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  
  // Use NestJS CLI
  await execa('npx', [
    '@nestjs/cli',
    'new',
    'api',
    '--directory',
    apiDir,
    '--package-manager',
    config.packageManager,
    '--skip-git'
  ], { stdio: 'inherit' });

  // Update package.json
  const pkgPath = path.join(apiDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.name = 'api';
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
}

/**
 * Generate Express backend
 */
export async function generateExpress(targetDir, config) {
  console.log('  → Creating Express API...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  await fs.ensureDir(apiDir);
  await fs.ensureDir(path.join(apiDir, 'src'));
  await fs.ensureDir(path.join(apiDir, 'src', 'routes'));
  await fs.ensureDir(path.join(apiDir, 'src', 'controllers'));
  await fs.ensureDir(path.join(apiDir, 'src', 'config'));

  // Create package.json
  const packageJson = {
    name: 'api',
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'nodemon src/index.ts',
      build: 'tsc',
      start: 'node dist/index.js'
    },
    dependencies: {
      express: '^4.18.0',
      cors: '^2.8.5',
      dotenv: '^16.3.0'
    },
    devDependencies: {
      '@types/express': '^4.17.0',
      '@types/cors': '^2.8.0',
      '@types/node': '^20.0.0',
      typescript: '^5.3.0',
      nodemon: '^3.0.0',
      'ts-node': '^10.9.0'
    }
  };

  await fs.writeJSON(path.join(apiDir, 'package.json'), packageJson, { spaces: 2 });

  // Create tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'node',
      outDir: './dist',
      rootDir: './src',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      resolveJsonModule: true
    },
    include: ['src/**/*'],
    exclude: ['node_modules']
  };

  await fs.writeJSON(path.join(apiDir, 'tsconfig.json'), tsconfig, { spaces: 2 });

  // Create main index.ts
  const indexTs = `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

  await fs.writeFile(path.join(apiDir, 'src', 'index.ts'), indexTs);

  // Create nodemon.json
  const nodemonConfig = {
    watch: ['src'],
    ext: 'ts',
    exec: 'ts-node src/index.ts'
  };

  await fs.writeJSON(path.join(apiDir, 'nodemon.json'), nodemonConfig, { spaces: 2 });

  // Create .env
  await fs.writeFile(path.join(apiDir, '.env'), 'PORT=3001\n');
}

/**
 * Generate Fastify backend
 */
export async function generateFastify(targetDir, config) {
  console.log('  → Creating Fastify API...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  await fs.ensureDir(apiDir);
  await fs.ensureDir(path.join(apiDir, 'src'));

  // Create package.json
  const packageJson = {
    name: 'api',
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'nodemon src/index.ts',
      build: 'tsc',
      start: 'node dist/index.js'
    },
    dependencies: {
      fastify: '^4.25.0',
      '@fastify/cors': '^8.4.0',
      dotenv: '^16.3.0'
    },
    devDependencies: {
      '@types/node': '^20.0.0',
      typescript: '^5.3.0',
      nodemon: '^3.0.0',
      'ts-node': '^10.9.0'
    }
  };

  await fs.writeJSON(path.join(apiDir, 'package.json'), packageJson, { spaces: 2 });

  // Create tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'node',
      outDir: './dist',
      rootDir: './src',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true
    },
    include: ['src/**/*'],
    exclude: ['node_modules']
  };

  await fs.writeJSON(path.join(apiDir, 'tsconfig.json'), tsconfig, { spaces: 2 });

  // Create main index.ts
  const indexTs = `import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
  logger: true
});

await fastify.register(cors);

fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 3001;
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
`;

  await fs.writeFile(path.join(apiDir, 'src', 'index.ts'), indexTs);

  // Create nodemon.json
  const nodemonConfig = {
    watch: ['src'],
    ext: 'ts',
    exec: 'ts-node src/index.ts'
  };

  await fs.writeJSON(path.join(apiDir, 'nodemon.json'), nodemonConfig, { spaces: 2 });

  // Create .env
  await fs.writeFile(path.join(apiDir, '.env'), 'PORT=3001\n');
}

/**
 * Generate Koa backend
 */
export async function generateKoa(targetDir, config) {
  console.log('  → Creating Koa API...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  await fs.ensureDir(apiDir);
  await fs.ensureDir(path.join(apiDir, 'src'));

  // Create package.json
  const packageJson = {
    name: 'api',
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'nodemon src/index.ts',
      build: 'tsc',
      start: 'node dist/index.js'
    },
    dependencies: {
      koa: '^2.14.0',
      '@koa/cors': '^4.0.0',
      '@koa/router': '^12.0.0',
      'koa-bodyparser': '^4.4.0',
      dotenv: '^16.3.0'
    },
    devDependencies: {
      '@types/koa': '^2.13.0',
      '@types/koa__cors': '^4.0.0',
      '@types/koa__router': '^12.0.0',
      '@types/node': '^20.0.0',
      typescript: '^5.3.0',
      nodemon: '^3.0.0',
      'ts-node': '^10.9.0'
    }
  };

  await fs.writeJSON(path.join(apiDir, 'package.json'), packageJson, { spaces: 2 });

  // Create tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'node',
      outDir: './dist',
      rootDir: './src',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true
    },
    include: ['src/**/*'],
    exclude: ['node_modules']
  };

  await fs.writeJSON(path.join(apiDir, 'tsconfig.json'), tsconfig, { spaces: 2 });

  // Create main index.ts
  const indexTs = `import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/health', (ctx) => {
  ctx.body = { status: 'ok' };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

  await fs.writeFile(path.join(apiDir, 'src', 'index.ts'), indexTs);

  // Create nodemon.json
  const nodemonConfig = {
    watch: ['src'],
    ext: 'ts',
    exec: 'ts-node src/index.ts'
  };

  await fs.writeJSON(path.join(apiDir, 'nodemon.json'), nodemonConfig, { spaces: 2 });

  // Create .env
  await fs.writeFile(path.join(apiDir, '.env'), 'PORT=3001\n');
}

/**
 * Main backend generator
 */
export async function generateBackend(targetDir, config) {
  switch (config.backend) {
    case 'nestjs':
      await generateNestjs(targetDir, config);
      break;
    case 'express':
      await generateExpress(targetDir, config);
      break;
    case 'fastify':
      await generateFastify(targetDir, config);
      break;
    case 'koa':
      await generateKoa(targetDir, config);
      break;
    default:
      throw new Error(`Unknown backend framework: ${config.backend}`);
  }
}

export default generateBackend;
