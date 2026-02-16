import fs from 'fs-extra';
import path from 'path';

/**
 * Generate shared packages
 */
export async function generateSharedPackages(targetDir, config) {
  console.log('  → Creating shared packages...');
  
  await generateSharedPackage(targetDir);
  await generateTypescriptConfig(targetDir);
  
  if (config.linting) {
    await generateEslintConfig(targetDir, config);
  }
}

/**
 * Generate shared package for types and utilities
 */
async function generateSharedPackage(targetDir) {
  const sharedDir = path.join(targetDir, 'packages', 'shared');
  await fs.ensureDir(path.join(sharedDir, 'src'));

  // package.json
  const packageJson = {
    name: 'shared',
    version: '0.0.0',
    main: './src/index.ts',
    types: './src/index.ts',
    exports: {
      '.': './src/index.ts'
    }
  };

  await fs.writeJSON(path.join(sharedDir, 'package.json'), packageJson, { spaces: 2 });

  // tsconfig.json
  const tsconfig = {
    extends: '../typescript-config/base.json',
    compilerOptions: {
      outDir: 'dist'
    },
    include: ['src/**/*'],
    exclude: ['node_modules']
  };

  await fs.writeJSON(path.join(sharedDir, 'tsconfig.json'), tsconfig, { spaces: 2 });

  // src/types.ts
  const types = `export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
`;

  await fs.writeFile(path.join(sharedDir, 'src', 'types.ts'), types);

  // src/utils.ts
  const utils = `export function formatDate(date: Date): string {
  return date.toISOString();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}
`;

  await fs.writeFile(path.join(sharedDir, 'src', 'utils.ts'), utils);

  // src/index.ts
  const index = `export * from './types';
export * from './utils';
`;

  await fs.writeFile(path.join(sharedDir, 'src', 'index.ts'), index);
}

/**
 * Generate TypeScript config package
 */
async function generateTypescriptConfig(targetDir) {
  const tsConfigDir = path.join(targetDir, 'packages', 'typescript-config');
  await fs.ensureDir(tsConfigDir);

  // package.json
  const packageJson = {
    name: 'typescript-config',
    version: '0.0.0',
    private: true
  };

  await fs.writeJSON(path.join(tsConfigDir, 'package.json'), packageJson, { spaces: 2 });

  // base.json
  const baseConfig = {
    $schema: 'https://json.schemastore.org/tsconfig',
    compilerOptions: {
      target: 'ES2022',
      lib: ['ES2022'],
      module: 'ESNext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      allowJs: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,
      incremental: true
    },
    exclude: ['node_modules']
  };

  await fs.writeJSON(path.join(tsConfigDir, 'base.json'), baseConfig, { spaces: 2 });

  // nextjs.json
  const nextjsConfig = {
    $schema: 'https://json.schemastore.org/tsconfig',
    extends: './base.json',
    compilerOptions: {
      target: 'ES2017',
      lib: ['dom', 'dom.iterable', 'esnext'],
      jsx: 'preserve',
      plugins: [{ name: 'next' }],
      paths: {
        '@/*': ['./src/*']
      }
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules']
  };

  await fs.writeJSON(path.join(tsConfigDir, 'nextjs.json'), nextjsConfig, { spaces: 2 });

  // react-library.json
  const reactLibConfig = {
    $schema: 'https://json.schemastore.org/tsconfig',
    extends: './base.json',
    compilerOptions: {
      jsx: 'react-jsx',
      lib: ['ES2022', 'DOM', 'DOM.Iterable']
    }
  };

  await fs.writeJSON(path.join(tsConfigDir, 'react-library.json'), reactLibConfig, { spaces: 2 });
}

/**
 * Generate ESLint config package
 */
async function generateEslintConfig(targetDir, config) {
  const eslintDir = path.join(targetDir, 'packages', 'eslint-config');
  await fs.ensureDir(eslintDir);

  // package.json
  const packageJson = {
    name: 'eslint-config',
    version: '0.0.0',
    private: true,
    devDependencies: {
      '@typescript-eslint/parser': '^6.0.0',
      '@typescript-eslint/eslint-plugin': '^6.0.0',
      'eslint': '^8.0.0',
      'eslint-config-prettier': '^9.0.0',
      'eslint-plugin-prettier': '^5.0.0',
      'prettier': '^3.0.0'
    }
  };

  await fs.writeJSON(path.join(eslintDir, 'package.json'), packageJson, { spaces: 2 });

  // base.js
  const baseConfig = `module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  env: {
    node: true,
    es2022: true
  }
};
`;

  await fs.writeFile(path.join(eslintDir, 'base.js'), baseConfig);

  // next.js
  if (config.frontend === 'nextjs') {
    const nextConfig = `module.exports = {
  extends: ['./base.js', 'next/core-web-vitals'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off'
  }
};
`;
    await fs.writeFile(path.join(eslintDir, 'next.js'), nextConfig);
  }

  // react-internal.js
  const reactConfig = `module.exports = {
  extends: ['./base.js'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  env: {
    browser: true
  }
};
`;

  await fs.writeFile(path.join(eslintDir, 'react-internal.js'), reactConfig);

  // README.md
  const readme = `# ESLint Config

Shared ESLint configuration for the monorepo.

## Usage

In your app's \`eslint.config.js\`:

\`\`\`js
module.exports = require('eslint-config/base.js');
\`\`\`
`;

  await fs.writeFile(path.join(eslintDir, 'README.md'), readme);
}

export default generateSharedPackages;
