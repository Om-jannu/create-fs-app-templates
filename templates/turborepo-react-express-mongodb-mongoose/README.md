# {{PROJECT_NAME}}

MERN Stack application built with modern technologies.

## Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: React 18 with Vite
- **Backend**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- MongoDB (or Docker)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
# Copy the environment template to .env
cp apps/api/.env.template apps/api/.env
```

Edit the `.env` file with your database credentials.

### 3. Start Database (Docker)

```bash
docker-compose up -d mongodb
```

### 4. Start Development

From root directory:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Project Structure

```
{{PROJECT_NAME}}/
├── apps/
│   ├── web/         # React + Vite frontend
│   └── api/         # Express backend
├── packages/
│   ├── shared/      # Shared types & utilities
│   ├── eslint-config/    # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
├── docker-compose.yml
├── turbo.json
└── package.json
```

## Available Scripts

- `npm run dev` - Start all apps in dev mode
- `npm run build` - Build all apps
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Learn More

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Turborepo Documentation](https://turbo.build)

## License

MIT
