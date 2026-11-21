import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/lib/format.ts", "src/lib/theme.ts"],
  root: "src",
  outDir: "dist",
  format: ["esm"],
  platform: "browser",
  target: "es2022",
  unbundle: true,
  dts: true,
  sourcemap: true,
  clean: true,
});
