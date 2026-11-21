<p align="center">
  <img src="https://raw.githubusercontent.com/Felix-Hz/seamount/main/assets/icon.svg" width="64" height="64" alt="">
</p>

<h1 align="center">@felix-hz/seamount-react</h1>

<p align="center">React components for the Seamount design system.</p>

Built on Radix and styled by [`@felix-hz/seamount`](https://www.npmjs.com/package/@felix-hz/seamount), which is installed with it.

Seamount is still 0.x, so pin the version.

## Install

```sh
npm install @felix-hz/seamount-react react react-dom
```

Requires React 19.

## Use it

```tsx
import "@felix-hz/seamount-react/styles.css";
import { Button, Field, Input, Toaster, TooltipProvider, toast } from "@felix-hz/seamount-react";

export function App() {
  return (
    <TooltipProvider>
      <Field label="Monthly limit" help="In NZD.">
        <Input figures inputMode="decimal" />
      </Field>
      <Button variant="primary" onClick={() => toast.success({ title: "Budget created." })}>
        Create budget
      </Button>
      <Toaster />
    </TooltipProvider>
  );
}
```

Components follow the shape of shadcn/ui (`asChild`, `data-slot`, `data-variant`). The styling is plain CSS under `sm-` classes, so you can override it without Tailwind.

## Tailwind 4

```css
@import "tailwindcss";
@import "@felix-hz/seamount-react/styles.css";
@import "@felix-hz/seamount-react/tailwind.css";
```

## Dark mode

Seamount follows the OS until `<html>` has `data-theme="light"` or `data-theme="dark"`. Inline the script in `<head>` to avoid a flash on load, and use the hook for a theme setting:

```tsx
import { useTheme } from "@felix-hz/seamount-react";
import { themeScript } from "@felix-hz/seamount-react/theme";

<script dangerouslySetInnerHTML={{ __html: themeScript() }} />;

const { choice, setChoice } = useTheme(); // "system", "light" or "dark"
```

If your CSS relies on a `.dark` class, use `themeScript(undefined, true)` and `useTheme({ classes: true })`.

## What's included

**Components:** Banner, Button, Checkbox, ConfirmDialog, Dialog, EmptyState, Field, Input, Kbd, Label, Live, LoadingState, Menu, Meter, Popover, Row, Section, SegmentedControl, Select, Separator, ShortcutLabel, Skeleton, Sparkline, SpecList, Square, StatTile, Switch, Table, Tabs, Tag, Textarea, Toaster, Tooltip.

**Hooks:** `useField`, `useHotkey`, `useTheme`.

Number and time helpers are at `@felix-hz/seamount-react/format`. It and `/theme` are safe to import on a server.

## Licence

[MIT](https://github.com/Felix-Hz/seamount/blob/main/LICENSE). Component structure follows shadcn/ui (MIT), see [THIRD_PARTY_NOTICES.md](https://github.com/Felix-Hz/seamount/blob/main/packages/seamount-react/THIRD_PARTY_NOTICES.md).

Working on Seamount itself? See [CONTRIBUTING.md](https://github.com/Felix-Hz/seamount/blob/main/CONTRIBUTING.md).
