<p align="center">
  <img src="assets/icon.svg" width="64" height="64" alt="">
</p>

<h1 align="center">seamount</h1>

<p align="center">Printed precision for my sites and apps: tokens, faces, vanilla CSS and React components on Radix.</p>

Seamount is one cobalt ink on paper, four faces with one job each, instrument labels and hairlines. This package is the shared implementation: the same stylesheet serves a plain HTML page and the React components, so a desktop app in vanilla JS and a React Router app look and behave alike. The rules (principles, voice, charts, icons) are summarised in the stories; Storybook is the living reference.

## Contents

- [Install](#install)
- [Use it](#use-it)
- [What is in it](#what-is-in-it)
- [Develop](#develop)
- [Release](#release)
- [Licences](#licences)

## Install

```sh
pnpm add @felix-hz/seamount   # or bun add, npm install
```

React 19 is a peer dependency for the components; the CSS, `format` and `theme` entries need nothing else.

## Use it

### Plain CSS

One file holds tokens, faces, base and components. Fonts resolve relative to it, so copy `dist/css` and `dist/fonts` together.

```html
<link rel="stylesheet" href="seamount/css/seamount.css">

<section class="sm-section">
  <div class="sm-section-head">
    <span class="sm-label" data-tone="accent">[&nbsp;01&nbsp;]</span>
    <h2 class="sm-section-title">Power</h2>
  </div>
  <div class="sm-row">
    <div class="sm-row-text">
      <div class="sm-row-name">Stop charging at</div>
      <p class="sm-row-help">60% suits a laptop that stays plugged in.</p>
    </div>
    <button class="sm-button" data-variant="primary">Apply</button>
  </div>
</section>
```

[`examples/vanilla.html`](examples/vanilla.html) shows every class without React.

### React

```tsx
import "@felix-hz/seamount/styles.css";
import { Button, Field, Input, Toaster, TooltipProvider, toast } from "@felix-hz/seamount";

export function App() {
  return (
    <TooltipProvider>
      <Field label="Monthly limit" help="In NZD.">
        <Input figures inputMode="decimal" />
      </Field>
      <Button variant="primary" onClick={() => toast.success({ title: "Created Groceries. $500 a month." })}>
        Create budget
      </Button>
      <Toaster />
    </TooltipProvider>
  );
}
```

Components follow shadcn/ui's shape (Radix primitives, `asChild`, `data-slot` and `data-variant` attributes) but take their look from the `sm-` classes rather than utility strings, so overriding is plain CSS and needs no Tailwind.

### Tailwind 4

```css
@import "tailwindcss";
@import "@felix-hz/seamount/styles.css";
@import "@felix-hz/seamount/tailwind.css";
```

`tailwind.css` maps the tokens into the theme (`bg-paper`, `text-ink-3`, `border-rule`, `font-mono`, `rounded`) and adds the `label` and `figures` utilities. Colours switch with the theme through the tokens, so `dark:` variants are rarely needed.

### Theme

Dark mode follows the OS until the page sets `data-theme="light"` or `"dark"` on `<html>`. To avoid a flash, inline the script in `<head>` and use the hook for the setting:

```tsx
import { themeScript } from "@felix-hz/seamount/theme";
import { useTheme } from "@felix-hz/seamount";

<script dangerouslySetInnerHTML={{ __html: themeScript() }} />;

const { choice, setChoice } = useTheme(); // "system" | "light" | "dark", persisted
```

Pass `classes: true` to both when an app's CSS keys off `.dark`.

### Formatting

`@felix-hz/seamount/format` holds the number and time rules as plain functions, safe on a server: `formatUnit(88.4, "°C")` gives `88.4 °C`, `formatSigned(-42.1)` gives `−42.10`, `formatWhen(date)` gives `4 min ago` or `Fri 20 Nov, 21:40`, and every one prints `–` for a missing value.

## What is in it

| Entry                                                                      | Contents                                       |
| -------------------------------------------------------------------------- | ---------------------------------------------- |
| `@felix-hz/seamount`                                                       | React components and hooks                     |
| `@felix-hz/seamount/styles.css`                                            | tokens, faces, base and components in one file |
| `@felix-hz/seamount/tokens.css`, `fonts.css`, `base.css`, `components.css` | the same, in parts                             |
| `@felix-hz/seamount/tailwind.css`                                          | Tailwind 4 theme mapping and utilities         |
| `@felix-hz/seamount/format`                                                | numbers, units, money and time                 |
| `@felix-hz/seamount/theme`                                                 | theme choice, head script, OS watch            |
| `@felix-hz/seamount/fonts/*`                                               | Latin-subset woff2 files and their licences    |

**Components:** Button, Label, Tag, Kbd, Square, Live, ShortcutLabel, Section (collapsible), SpecList, Row, Field with Input and Textarea, Select, Checkbox, Switch, SegmentedControl, Tabs, Dialog, ConfirmDialog, Menu, Popover, Tooltip, Separator, Toaster and `toast`, Banner, EmptyState, LoadingState, Skeleton, Table, StatTile, Sparkline, Meter. **Hooks:** `useTheme`, `useHotkey`, `useField`.

Every component is a client component (`"use client"` is kept in the build); `format` and `theme` are not, so server code can import them.

The styles are in the `base` and `components` cascade layers, declared in Tailwind's order. Unlayered app CSS and Tailwind utilities beat them without `!important`.

## Develop

Node 20.19 or later and pnpm (`corepack enable`).

```sh
pnpm install
pnpm dev             # Storybook at http://localhost:6006
pnpm test            # Vitest with Testing Library
pnpm lint            # Biome
pnpm typecheck
pnpm build           # tsdown to dist/, then CSS and fonts
pnpm check:package   # publint and arethetypeswrong against the packed tarball
```

Conventions:

- A new component is a Radix primitive (or plain element) with `data-slot`, its variants as data attributes, and its look in `src/css/components.css` under an `sm-` class. A test checks that every class a component emits is defined.
- Exported functions carry explicit return types (`isolatedDeclarations`), which keeps declaration output fast and the public API deliberate.
- Copy in stories follows the Seamount voice: real-looking data, sentence case, NZ English, no em dashes.
- Each change consumers would notice gets a changeset (`pnpm changeset`); see `.changeset/README.md` for the bump rules.

## Release

Merging to `main` with pending changesets opens a "version packages" PR. Merging that PR publishes to npm from GitHub Actions with provenance, through npm trusted publishing (OIDC, no stored token), and tags the release.

## Licences

MIT, see [LICENSE](LICENSE). The fonts are under the SIL Open Font License 1.1, each licence beside its file in `dist/fonts`. Component structure follows shadcn/ui (MIT); see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
