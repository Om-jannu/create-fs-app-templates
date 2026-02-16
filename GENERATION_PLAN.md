# Template Generation Plan

## Problem
Need to support 46,080 possible combinations of tech stack options.

## Solution Approach

### Phase 1: Infrastructure (Recommended)
Create a template generator script that can:
1. Take configuration as input
2. Use official CLIs to scaffold projects
3. Apply modular patches for each option
4. Generate templates on-demand or pre-build popular ones

### Phase 2: Popular Templates First
Pre-generate the most commonly used combinations (~50-100 templates):

#### Top Priority (Next 10 templates to add):
1. `turborepo-npm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker`
2. `turborepo-npm-react-tailwind-lint-express-mongodb-mongoose-docker`
3. `nx-npm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker`
4. `turborepo-pnpm-nextjs-tailwind-lint-nestjs-postgresql-prisma-docker`
5. `turborepo-npm-react-tailwind-lint-fastify-postgresql-prisma-docker`
6. `turborepo-npm-nextjs-tailwind-lint-express-mysql-prisma-docker`
7. `turborepo-npm-vue-tailwind-lint-express-postgresql-prisma-docker`
8. `nx-npm-react-tailwind-lint-nestjs-mongodb-mongoose-docker`
9. `turborepo-yarn-nextjs-tailwind-lint-nestjs-postgresql-typeorm-docker`
10. `turborepo-npm-nextjs-styled-components-lint-nestjs-postgresql-prisma-docker`

### Phase 3: On-Demand Generation
For less common combinations, generate on-the-fly when requested by CLI.

## Naming Convention

Format: `{monorepo}-{packageManager}-{frontend}-{styling}-[lint-]{backend}-{database}-{orm}-[docker]`

Examples:
- WITH lint & docker: `turborepo-npm-react-tailwind-lint-express-postgresql-prisma-docker`
- WITHOUT lint: `turborepo-npm-react-tailwind-express-postgresql-prisma-docker`
- WITHOUT docker: `turborepo-npm-react-tailwind-lint-express-postgresql-prisma`
- WITHOUT both: `turborepo-npm-react-tailwind-express-postgresql-prisma`

## Implementation Options

### Option A: Full Pre-Generation (Not Recommended)
- Generate all 46,080 templates
- Pros: Instant access
- Cons: Massive repo size, maintenance nightmare

### Option B: Popular + On-Demand (Recommended)
- Pre-generate ~100 popular combinations
- Generate others on-demand via CLI
- Pros: Manageable size, covers 95% of use cases
- Cons: Slight delay for uncommon combinations

### Option C: Pure On-Demand
- Generate all templates on-the-fly
- Pros: Minimal repo size
- Cons: Slower initial setup, requires all CLIs installed

## Recommended: Option B

## Next Steps

1. Create template generator script
2. Define modular components for each option
3. Generate top 10 priority templates
4. Test with create-fs-app CLI
5. Gradually add more popular combinations
