import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/react/index.ts", "src/lib/format.ts", "src/lib/theme.ts"],
  root: "src",
  outDir: "dist",
  format: ["esm"],
  platform: "browser",
  target: "es2022",
  unbundle: true,
  dts: true,
  sourcemap: true,
  clean: true,
  // React components are client components; the helpers in lib/ stay usable from server code
  banner: ({ fileName }) => (fileName.startsWith("react/") && fileName.endsWith(".js") ? '"use client";' : ""),
  external: [/^react($|\/)/, /^react-dom($|\/)/, /^radix-ui($|\/)/, "clsx"],
});
