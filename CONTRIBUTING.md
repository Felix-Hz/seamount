# Contributing

## Layout

- `packages/seamount`: CSS, fonts, `format` and `theme`. It has no runtime dependencies.
- `packages/seamount-react`: React components and hooks.
- `stories`, `.storybook` and the test config live at the root. They resolve both packages from source, so `pnpm dev` needs no build first.

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

- A new component is a Radix primitive or plain element with `data-slot`, its variants as data attributes, and its look in `packages/seamount/src/css/components.css` under an `sm-` class. A test checks that every class a component emits is defined.
- Exported functions have explicit return types (`isolatedDeclarations`).
- Copy in stories uses real-looking data, sentence case and NZ English, with no em dashes.
- Each change consumers would notice gets a changeset (`pnpm changeset`). The bump rules are in `.changeset/README.md`.

## Release

Merging to `main` with pending changesets opens a "version packages" PR. Both packages always share one version. Merging that PR publishes them to npm, core first, from GitHub Actions with provenance, through npm trusted publishing, and tags the release.
