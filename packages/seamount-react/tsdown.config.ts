import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/format.ts", "src/theme.ts"],
  root: "src",
  outDir: "dist",
  format: ["esm"],
  platform: "browser",
  target: "es2022",
  unbundle: true,
  dts: true,
  sourcemap: true,
  clean: true,
  // format and theme stay importable from server code
  banner: ({ fileName }) => (fileName.endsWith(".js") && !/^(format|theme)\.js$/.test(fileName) ? '"use client";' : ""),
  external: [/^react($|\/)/, /^react-dom($|\/)/, /^radix-ui($|\/)/, "clsx", /^@felix-hz\/seamount($|\/)/],
});
