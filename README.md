# LoongKirin Monorepo

This Turborepo is maintained by loongkirin.

## Using this repo

Run the following command:

```sh
npx create-turbo@latest -e with-tailwind
```
## Run this repo

- Install all neccessary packages

```sh
npm install
```

- Build this Monorepo

```sh
npm run build
```

- Run app

```sh
npm run dev -w web
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: The template [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `@loongkirin/ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by all the monorepo applications
- `@loongkirin/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@loongkirin/tailwind-config`: `tailwindcss` configurations
- `@loongkirin/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This monorepo is set up to produce compiled styles for `@loongkirin/ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.ts`. This was chosen for several reasons:

- Make sharing one `tailwind.config.ts` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `@loongkirin/ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.ts` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.ts](packages/tailwind-config/tailwind.config.ts):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `@loongkirin/ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
