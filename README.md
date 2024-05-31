# Node and Vite React Monorepo

A monorepo setup using [Turbo](https://turbo.build).

## Projects

### Apps

- [backend](apps/backend): Built with [Hono](https://hono.dev) and deployed on AWS Lambda.
- [frontend](apps/frontend): Built with [Vite](https://vitejs.dev) and React.
- [catalog](apps/catalog): Utilizes [Storybook](https://storybook.js.org) for UI component development.
- [deploy](apps/deploy): Deploys to AWS using [AWS CDK](https://github.com/aws/aws-cdk).

### Packages

- [typescript-config](packages/typescript-config): TypeScript configuration.
- [openapi](packages/openapi): API documentation.
- [ui](packages/ui): Shared component library.

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

### Launch Database

To start the PostgreSQL database using Docker Compose:

```shell
docker compose up -d
```
