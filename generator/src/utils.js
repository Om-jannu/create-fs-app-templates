import { ORM_DATABASE_COMPATIBILITY } from './config.js';

/**
 * Generate template name from configuration
 */
export function generateTemplateName(config) {
  const parts = [
    config.monorepo,
    config.packageManager,
    config.frontend,
    config.styling
  ];

  if (config.linting) {
    parts.push('lint');
  }

  parts.push(
    config.backend,
    config.database,
    config.orm
  );

  if (config.docker) {
    parts.push('docker');
  }

  return parts.join('-');
}

/**
 * Validate configuration
 */
export function validateConfig(config) {
  const errors = [];

  // Check ORM-Database compatibility
  const compatibleDatabases = ORM_DATABASE_COMPATIBILITY[config.orm];
  if (!compatibleDatabases || !compatibleDatabases.includes(config.database)) {
    errors.push(
      `ORM "${config.orm}" is not compatible with database "${config.database}". ` +
      `Compatible databases: ${compatibleDatabases?.join(', ') || 'none'}`
    );
  }

  // Mongoose only works with MongoDB
  if (config.orm === 'mongoose' && config.database !== 'mongodb') {
    errors.push('Mongoose ORM only works with MongoDB');
  }

  // MongoDB only works with Mongoose
  if (config.database === 'mongodb' && config.orm !== 'mongoose') {
    errors.push('MongoDB only works with Mongoose ORM');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get CLI flags for package manager
 */
export function getPackageManagerFlags(packageManager) {
  const flags = {
    npm: {
      install: 'npm install',
      add: 'npm install',
      addDev: 'npm install --save-dev',
      run: 'npm run'
    },
    yarn: {
      install: 'yarn install',
      add: 'yarn add',
      addDev: 'yarn add --dev',
      run: 'yarn'
    },
    pnpm: {
      install: 'pnpm install',
      add: 'pnpm add',
      addDev: 'pnpm add --save-dev',
      run: 'pnpm'
    }
  };

  return flags[packageManager];
}

/**
 * Convert frontend name to proper format
 */
export function normalizeFrontendName(frontend) {
  const mapping = {
    react: 'react',
    nextjs: 'next.js',
    vue: 'vue',
    nuxt: 'nuxt',
    angular: 'angular'
  };
  return mapping[frontend] || frontend;
}

/**
 * Get database connection string template
 */
export function getDatabaseConnectionString(database) {
  const connections = {
    postgresql: 'postgresql://user:password@localhost:5432/dbname',
    mongodb: 'mongodb://localhost:27017/dbname',
    mysql: 'mysql://user:password@localhost:3306/dbname',
    sqlite: 'file:./dev.db'
  };
  return connections[database];
}

/**
 * Get Docker service configuration
 */
export function getDockerService(database) {
  const services = {
    postgresql: {
      image: 'postgres:16-alpine',
      environment: {
        POSTGRES_USER: 'user',
        POSTGRES_PASSWORD: 'password',
        POSTGRES_DB: 'dbname'
      },
      ports: ['5432:5432'],
      volumes: ['postgres_data:/var/lib/postgresql/data']
    },
    mongodb: {
      image: 'mongo:7-jammy',
      environment: {
        MONGO_INITDB_ROOT_USERNAME: 'user',
        MONGO_INITDB_ROOT_PASSWORD: 'password'
      },
      ports: ['27017:27017'],
      volumes: ['mongo_data:/data/db']
    },
    mysql: {
      image: 'mysql:8',
      environment: {
        MYSQL_ROOT_PASSWORD: 'password',
        MYSQL_DATABASE: 'dbname',
        MYSQL_USER: 'user',
        MYSQL_PASSWORD: 'password'
      },
      ports: ['3306:3306'],
      volumes: ['mysql_data:/var/lib/mysql']
    },
    sqlite: null // No Docker service needed
  };
  return services[database];
}

export default {
  generateTemplateName,
  validateConfig,
  getPackageManagerFlags,
  normalizeFrontendName,
  getDatabaseConnectionString,
  getDockerService
};
