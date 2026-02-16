import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { getDatabaseConnectionString, getDockerService } from '../utils.js';

/**
 * Generate Prisma ORM setup
 */
export async function generatePrisma(targetDir, config) {
  console.log('  → Setting up Prisma ORM...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  
  // Initialize Prisma
  await execa('npx', ['prisma', 'init'], { cwd: apiDir, stdio: 'inherit' });

  // Update package.json with Prisma
  const pkgPath = path.join(apiDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.dependencies = {
    ...pkg.dependencies,
    '@prisma/client': '^5.7.0'
  };
  pkg.devDependencies = {
    ...pkg.devDependencies,
    'prisma': '^5.7.0'
  };
  pkg.scripts = {
    ...pkg.scripts,
    'prisma:generate': 'prisma generate',
    'prisma:migrate': 'prisma migrate dev',
    'prisma:studio': 'prisma studio'
  };
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // Update schema.prisma with correct datasource
  const schemaPath = path.join(apiDir, 'prisma', 'schema.prisma');
  let provider = config.database;
  if (config.database === 'postgresql') provider = 'postgresql';
  if (config.database === 'mongodb') provider = 'mongodb';
  if (config.database === 'mysql') provider = 'mysql';
  if (config.database === 'sqlite') provider = 'sqlite';

  const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${provider}"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(${config.database === 'mongodb' ? 'auto()' : 'cuid()'}) ${config.database === 'mongodb' ? '@map("_id") @db.ObjectId' : ''}
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;

  await fs.writeFile(schemaPath, schema);

  // Update .env with database URL
  const envPath = path.join(apiDir, '.env');
  const dbUrl = getDatabaseConnectionString(config.database);
  await fs.writeFile(envPath, `DATABASE_URL="${dbUrl}"\nPORT=3001\n`);
}

/**
 * Generate TypeORM setup
 */
export async function generateTypeORM(targetDir, config) {
  console.log('  → Setting up TypeORM...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  
  // Update package.json with TypeORM
  const pkgPath = path.join(apiDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  
  pkg.dependencies = {
    ...pkg.dependencies,
    'typeorm': '^0.3.17',
    'reflect-metadata': '^0.1.13'
  };

  // Add database driver
  if (config.database === 'postgresql') {
    pkg.dependencies['pg'] = '^8.11.0';
  } else if (config.database === 'mysql') {
    pkg.dependencies['mysql2'] = '^3.6.0';
  } else if (config.database === 'sqlite') {
    pkg.dependencies['better-sqlite3'] = '^9.2.0';
  }

  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // Create TypeORM config
  await fs.ensureDir(path.join(apiDir, 'src', 'config'));
  
  const dbType = config.database === 'postgresql' ? 'postgres' : config.database;
  
  const ormConfig = `import { DataSource } from 'typeorm';
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
  type: '${dbType}',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || ${config.database === 'postgresql' ? 5432 : config.database === 'mysql' ? 3306 : 0},
  ${config.database !== 'sqlite' ? `username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dbname',` : `database: 'database.sqlite',`}
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
`;

  await fs.writeFile(path.join(apiDir, 'src', 'config', 'database.ts'), ormConfig);

  // Create User entity
  await fs.ensureDir(path.join(apiDir, 'src', 'entities'));
  
  const userEntity = `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
`;

  await fs.writeFile(path.join(apiDir, 'src', 'entities', 'User.ts'), userEntity);

  // Update .env
  const envPath = path.join(apiDir, '.env');
  const envContent = config.database === 'sqlite' 
    ? 'PORT=3001\n'
    : `DB_HOST=localhost
DB_PORT=${config.database === 'postgresql' ? 5432 : 3306}
DB_USER=user
DB_PASSWORD=password
DB_NAME=dbname
PORT=3001
`;
  await fs.writeFile(envPath, envContent);
}

/**
 * Generate Mongoose setup
 */
export async function generateMongoose(targetDir, config) {
  console.log('  → Setting up Mongoose...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  
  // Update package.json with Mongoose
  const pkgPath = path.join(apiDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.dependencies = {
    ...pkg.dependencies,
    'mongoose': '^8.0.0'
  };
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // Create database config
  await fs.ensureDir(path.join(apiDir, 'src', 'config'));
  
  const dbConfig = `import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dbname';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
`;

  await fs.writeFile(path.join(apiDir, 'src', 'config', 'database.ts'), dbConfig);

  // Create User model
  await fs.ensureDir(path.join(apiDir, 'src', 'models'));
  
  const userModel = `import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
`;

  await fs.writeFile(path.join(apiDir, 'src', 'models', 'User.ts'), userModel);

  // Update .env
  const envPath = path.join(apiDir, '.env');
  await fs.writeFile(envPath, 'MONGODB_URI=mongodb://localhost:27017/dbname\nPORT=3001\n');
}

/**
 * Generate Drizzle ORM setup
 */
export async function generateDrizzle(targetDir, config) {
  console.log('  → Setting up Drizzle ORM...');
  
  const apiDir = path.join(targetDir, 'apps', 'api');
  
  // Update package.json with Drizzle
  const pkgPath = path.join(apiDir, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  
  pkg.dependencies = {
    ...pkg.dependencies,
    'drizzle-orm': '^0.29.0'
  };

  pkg.devDependencies = {
    ...pkg.devDependencies,
    'drizzle-kit': '^0.20.0'
  };

  // Add database driver
  if (config.database === 'postgresql') {
    pkg.dependencies['postgres'] = '^3.4.0';
  } else if (config.database === 'mysql') {
    pkg.dependencies['mysql2'] = '^3.6.0';
  } else if (config.database === 'sqlite') {
    pkg.dependencies['better-sqlite3'] = '^9.2.0';
  }

  pkg.scripts = {
    ...pkg.scripts,
    'db:generate': 'drizzle-kit generate:pg',
    'db:migrate': 'drizzle-kit push:pg'
  };

  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // Create schema
  await fs.ensureDir(path.join(apiDir, 'src', 'db'));
  
  const schema = `import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
`;

  await fs.writeFile(path.join(apiDir, 'src', 'db', 'schema.ts'), schema);

  // Update .env
  const envPath = path.join(apiDir, '.env');
  const dbUrl = getDatabaseConnectionString(config.database);
  await fs.writeFile(envPath, `DATABASE_URL="${dbUrl}"\nPORT=3001\n`);
}

/**
 * Generate Docker Compose configuration
 */
export async function generateDocker(targetDir, config) {
  if (!config.docker) return;
  
  console.log('  → Creating Docker configuration...');
  
  const dockerService = getDockerService(config.database);
  if (!dockerService) return; // SQLite doesn't need Docker

  const dockerCompose = {
    version: '3.8',
    services: {
      db: dockerService
    },
    volumes: {}
  };

  // Add volume
  if (config.database === 'postgresql') {
    dockerCompose.volumes.postgres_data = {};
  } else if (config.database === 'mongodb') {
    dockerCompose.volumes.mongo_data = {};
  } else if (config.database === 'mysql') {
    dockerCompose.volumes.mysql_data = {};
  }

  await fs.writeFile(
    path.join(targetDir, 'docker-compose.yml'),
    `version: '3.8'\n\nservices:\n  db:\n    image: ${dockerService.image}\n    environment:\n${Object.entries(dockerService.environment).map(([k, v]) => `      ${k}: ${v}`).join('\n')}\n    ports:\n${dockerService.ports.map(p => `      - "${p}"`).join('\n')}\n    volumes:\n${dockerService.volumes.map(v => `      - ${v}`).join('\n')}\n\nvolumes:\n  ${dockerService.volumes[0].split(':')[0]}:\n`
  );
}

/**
 * Main database generator
 */
export async function generateDatabase(targetDir, config) {
  switch (config.orm) {
    case 'prisma':
      await generatePrisma(targetDir, config);
      break;
    case 'typeorm':
      await generateTypeORM(targetDir, config);
      break;
    case 'mongoose':
      await generateMongoose(targetDir, config);
      break;
    case 'drizzle':
      await generateDrizzle(targetDir, config);
      break;
    default:
      throw new Error(`Unknown ORM: ${config.orm}`);
  }

  await generateDocker(targetDir, config);
}

export default generateDatabase;
