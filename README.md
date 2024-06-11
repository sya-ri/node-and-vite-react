# Node and Vite React Monorepo

A monorepo setup using [Turbo](https://turbo.build).

## Projects

### Apps

- [backend](apps/backend): Built with [Hono](https://hono.dev) and deployed on AWS Lambda.
- [frontend](apps/frontend): Built with [Vite](https://vitejs.dev) and React.
- [deploy](apps/deploy): Deploys to AWS using [AWS CDK](https://github.com/aws/aws-cdk).

### Packages

- [database](packages/database): Database schema, migrations, and database operations.
- [model](packages/model): Defines application data models.
- [openapi](packages/openapi): Provides API documentation using OpenAPI specifications.
- [runtime-config](packages/runtime-config): Frontend runtime configuration.
- [typescript-config](packages/typescript-config): Shared TypeScript configuration files.
- [ui](packages/ui): Shared component library for frontend.

## Installation

To set up the project for development:

```shell
./scripts/setup.sh
```

## Commands

### Git Commit

Use the following command to commit your changes:

```shell
npm run commit
```

### Build

To build the entire project:

```shell
npm run build
```

### Development Server

To start the development server:

```shell
npm run dev
```

### Check Code Quality

To run code quality checks:

```shell
npm run check
```

### Fix Code Issues

To fix any code issues automatically:

```shell
npm run fix
```

### Check Dependency Versions

To check for new versions of dependencies using `npm-check-updates`:

```shell
npm run ncu
```

### Bump Dependency Versions

To upgrade dependencies to their latest versions using `npm-check-updates`:

```shell
npm run ncu:apply
```

### Build Storybook

To build the Storybook:

```shell
npm run build-storybook
```

### Open Storybook

To open the storybook:

```shell
npm run storybook
```

### Launch Database

To start the PostgreSQL database using Docker Compose:

```shell
docker compose up -d
```

### Migrate Database

To migrate the database in a development environment:

```shell
npm run migrate:dev -w packages/database
```
