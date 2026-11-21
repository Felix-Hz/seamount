# Contributing

## Develop

You need Node 20.19 or later and pnpm (`corepack enable`).

```sh
pnpm install
pnpm dev             # Storybook at http://localhost:6006
pnpm test            # Vitest with Testing Library
pnpm lint            # Biome
pnpm typecheck
pnpm build           # tsdown to dist/, then CSS and fonts
pnpm check:package   # publint and arethetypeswrong against the packed tarball
```

## Conventions

- A new component is a Radix primitive or plain element with `data-slot`, its variants as data attributes, and its look in `src/css/components.css` under an `sm-` class. A test checks that every class a component emits is defined.
- Exported functions have explicit return types (`isolatedDeclarations`).
- Copy in stories uses real-looking data, sentence case and NZ English, with no em dashes.
- Each change consumers would notice gets a changeset (`pnpm changeset`). The bump rules are in `.changeset/README.md`.

## Release

Merging to `main` with pending changesets opens a "version packages" PR. Merging that PR publishes to npm from GitHub Actions with provenance, through npm trusted publishing, and tags the release.
