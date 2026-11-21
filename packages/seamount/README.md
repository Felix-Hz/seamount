<p align="center">
  <img src="https://raw.githubusercontent.com/Felix-Hz/seamount/main/assets/icon.svg" width="64" height="64" alt="">
</p>

<h1 align="center">@felix-hz/seamount</h1>

<p align="center">A design system in plain CSS.</p>

Tokens, fonts, components and a Tailwind 4 theme, with no runtime dependencies. Cobalt ink on paper, four typefaces, thin rules, light and dark themes. For React components, use [`@felix-hz/seamount-react`](https://www.npmjs.com/package/@felix-hz/seamount-react).

Seamount is still 0.x, so pin the version.

## Install

```sh
npm install @felix-hz/seamount
```

## Use it

With a bundler:

```js
import "@felix-hz/seamount/styles.css";
```

Without one, copy `dist/css` and `dist/fonts` from the package and keep them side by side, because the stylesheet loads the fonts by relative path.

```html
<link rel="stylesheet" href="seamount/css/seamount.css">

<div class="sm-row">
  <div class="sm-row-text">
    <div class="sm-row-name">Stop charging at</div>
    <p class="sm-row-help">60% suits a laptop that stays plugged in.</p>
  </div>
  <button class="sm-button" data-variant="primary">Apply</button>
</div>
```

[`examples/vanilla.html`](https://github.com/Felix-Hz/seamount/blob/main/packages/seamount/examples/vanilla.html) has every class.

## Tailwind 4

```css
@import "tailwindcss";
@import "@felix-hz/seamount/styles.css";
@import "@felix-hz/seamount/tailwind.css";
```

This adds the colours and fonts to your theme (`bg-paper`, `text-ink-3`, `border-rule`, `font-mono`) and the `label` and `figures` utilities. Colours follow the theme, so you'll rarely need `dark:`.

## Dark mode

Seamount follows the OS until `<html>` has `data-theme="light"` or `data-theme="dark"`. To keep a saved choice and avoid a flash on load, inline the script in `<head>`:

```js
import { themeScript } from "@felix-hz/seamount/theme";

const script = `<script>${themeScript()}</script>`;
```

If your CSS relies on a `.dark` class, use `themeScript(undefined, true)`.

## Formatting

`@felix-hz/seamount/format` has plain functions for numbers, money and time.

```js
import { formatSigned, formatUnit } from "@felix-hz/seamount/format";

formatUnit(88.4, "°C"); // "88.4 °C"
formatSigned(-42.1); // "−42.10"
```

Missing values print as `–`.

## What's included

| Import                                                                     | Contents                                    |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| `@felix-hz/seamount/styles.css`                                            | All the CSS in one file                     |
| `@felix-hz/seamount/tokens.css`, `fonts.css`, `base.css`, `components.css` | The same CSS, in parts                      |
| `@felix-hz/seamount/tailwind.css`                                          | Tailwind 4 theme and utilities              |
| `@felix-hz/seamount/format`                                                | Number, unit, money and time formatting     |
| `@felix-hz/seamount/theme`                                                 | Theme storage and the head script           |
| `@felix-hz/seamount/fonts/*`                                               | Latin-subset woff2 files and their licences |

Styles sit in the `base` and `components` cascade layers, so your own CSS and Tailwind utilities win without `!important`.

## Licence

[MIT](https://github.com/Felix-Hz/seamount/blob/main/LICENSE). The fonts are under the SIL Open Font License 1.1, with each licence next to its font.

Working on Seamount itself? See [CONTRIBUTING.md](https://github.com/Felix-Hz/seamount/blob/main/CONTRIBUTING.md).
