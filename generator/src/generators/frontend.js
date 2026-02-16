import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

/**
 * Generate Next.js app
 */
export async function generateNextjs(targetDir, config) {
  console.log('  → Creating Next.js app...');
  
  const appDir = path.join(targetDir, 'apps', 'web');
  
  // Use create-next-app CLI
  const args = [
    'create-next-app@latest',
    appDir,
    '--typescript',
    '--app',
    '--no-git',
    '--import-alias', '@/*'
  ];

  if (config.styling === 'tailwind') {
    args.push('--tailwind');
  } else {
    args.push('--no-tailwind');
  }

  if (config.linting) {
    args.push('--eslint');
  } else {
    args.push('--no-eslint');
  }

  args.push('--src-dir');

  await execa('npx', args, { stdio: 'inherit' });

  // Update package.json
  const pkgPath = path.join(appDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.name = 'web';
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
}

/**
 * Generate React + Vite app
 */
export async function generateReact(targetDir, config) {
  console.log('  → Creating React app with Vite...');
  
  const appDir = path.join(targetDir, 'apps', 'web');
  
  // Use create-vite CLI
  await execa('npm', [
    'create',
    'vite@latest',
    appDir,
    '--',
    '--template',
    'react-ts'
  ], { stdio: 'inherit' });

  // Update package.json
  const pkgPath = path.join(appDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.name = 'web';

  // Add styling dependencies
  if (config.styling === 'tailwind') {
    pkg.devDependencies = {
      ...pkg.devDependencies,
      'tailwindcss': '^3.4.0',
      'postcss': '^8.4.0',
      'autoprefixer': '^10.4.0'
    };
  } else if (config.styling === 'scss') {
    pkg.devDependencies = {
      ...pkg.devDependencies,
      'sass': '^1.69.0'
    };
  } else if (config.styling === 'styled-components') {
    pkg.dependencies = {
      ...pkg.dependencies,
      'styled-components': '^6.1.0'
    };
    pkg.devDependencies = {
      ...pkg.devDependencies,
      '@types/styled-components': '^5.1.0'
    };
  }

  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // Add Tailwind config if needed
  if (config.styling === 'tailwind') {
    await addTailwindToVite(appDir);
  }
}

/**
 * Generate Vue app
 */
export async function generateVue(targetDir, config) {
  console.log('  → Creating Vue app...');
  
  const appDir = path.join(targetDir, 'apps', 'web');
  
  // Use create-vue CLI
  await execa('npm', [
    'create',
    'vue@latest',
    appDir,
    '--',
    '--typescript',
    '--jsx'
  ], { stdio: 'inherit' });

  const pkgPath = path.join(appDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.name = 'web';
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
}

/**
 * Generate Nuxt app
 */
export async function generateNuxt(targetDir, config) {
  console.log('  → Creating Nuxt app...');
  
  const appDir = path.join(targetDir, 'apps', 'web');
  
  await execa('npx', [
    'nuxi@latest',
    'init',
    appDir,
    '--packageManager',
    config.packageManager
  ], { stdio: 'inherit' });

  const pkgPath = path.join(appDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.name = 'web';
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
}

/**
 * Generate Angular app
 */
export async function generateAngular(targetDir, config) {
  console.log('  → Creating Angular app...');
  
  const appDir = path.join(targetDir, 'apps', 'web');
  
  await execa('npx', [
    '@angular/cli@latest',
    'new',
    'web',
    '--directory',
    appDir,
    '--package-manager',
    config.packageManager,
    '--skip-git',
    '--style',
    config.styling === 'scss' ? 'scss' : 'css'
  ], { stdio: 'inherit' });
}

/**
 * Add Tailwind CSS to Vite project
 */
async function addTailwindToVite(appDir) {
  // Create tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
  await fs.writeFile(path.join(appDir, 'tailwind.config.js'), tailwindConfig);

  // Create postcss.config.js
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
  await fs.writeFile(path.join(appDir, 'postcss.config.js'), postcssConfig);

  // Update index.css
  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  await fs.writeFile(path.join(appDir, 'src', 'index.css'), indexCss);
}

/**
 * Main frontend generator
 */
export async function generateFrontend(targetDir, config) {
  switch (config.frontend) {
    case 'nextjs':
      await generateNextjs(targetDir, config);
      break;
    case 'react':
      await generateReact(targetDir, config);
      break;
    case 'vue':
      await generateVue(targetDir, config);
      break;
    case 'nuxt':
      await generateNuxt(targetDir, config);
      break;
    case 'angular':
      await generateAngular(targetDir, config);
      break;
    default:
      throw new Error(`Unknown frontend framework: ${config.frontend}`);
  }
}

export default generateFrontend;
