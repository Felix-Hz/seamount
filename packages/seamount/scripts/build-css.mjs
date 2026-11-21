// Copies the CSS and fonts to dist and writes dist/css/seamount.css, the one-file bundle, so a page without
// a bundler loads a single stylesheet instead of a chain of @imports.
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const src = "src";
const dist = "dist";
const parts = ["tokens.css", "fonts.css", "base.css", "components.css"];

await mkdir(join(dist, "css"), { recursive: true });
await mkdir(join(dist, "fonts"), { recursive: true });

for (const name of [...parts, "tailwind.css"]) {
  await copyFile(join(src, "css", name), join(dist, "css", name));
}
for (const name of await readdir(join(src, "fonts"))) {
  await copyFile(join(src, "fonts", name), join(dist, "fonts", name));
}

const { version } = JSON.parse(await readFile("package.json", "utf8"));
// Same order Tailwind 4 declares, so a Tailwind app and a plain page layer identically
const bundle = [`/*! @felix-hz/seamount ${version} */`, "@layer theme, base, components, utilities;", ""];
for (const name of parts) bundle.push(await readFile(join(src, "css", name), "utf8"));
await writeFile(join(dist, "css", "seamount.css"), bundle.join("\n"));
console.log(`css: ${parts.length + 1} files, seamount.css bundled`);
