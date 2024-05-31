# Node and Vite React Monorepo

A monorepo setup using [Turbo](https://turbo.build).

## Projects

### Apps

- [backend](apps/backend): [Hono](https://hono.dev) + AWS Lambda
- [frontend](apps/frontend): [Vite](https://vitejs.dev) + React
- [catalog](apps/catalog): [Storybook](https://storybook.js.org)
- [deploy](apps/deploy): Deploy to AWS using [aws-cdk](https://github.com/aws/aws-cdk)

### Packages

- [typescript-config](packages/typescript-config)
- [ui](packages/ui): Component library

## Scripts

### Git Commit

```shell
npm run commit
```

### Build

```shell
npm run build
```

### Development Server

```shell
npm run dev
```

### Check Code Quality

```shell
npm run check
```

### Fix Code Issues

```shell
npm run fix
```
