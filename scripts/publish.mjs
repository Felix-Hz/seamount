// Packs with pnpm so workspace: ranges become real versions, then publishes with npm for trusted publishing.
// The core goes first because the React package depends on its exact version.
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const packages = ["packages/seamount", "packages/seamount-react"];
const run = (command, args, cwd) =>
  execFileSync(command, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();
const published = (name, version) => {
  try {
    return run("npm", ["view", `${name}@${version}`, "version"]) === version;
  } catch {
    return false;
  }
};

let version;
let released = false;
for (const dir of packages) {
  const manifest = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  version = manifest.version;
  if (published(manifest.name, version)) {
    console.log(`${manifest.name}@${version} is already on npm`);
    continue;
  }
  const output = run("pnpm", ["pack", "--json"], dir);
  const tarball = resolve(dir, JSON.parse(output).filename);
  run("npm", ["publish", tarball], dir);
  rmSync(tarball);
  released = true;
}
if (released) {
  run("git", ["tag", `v${version}`]);
  run("git", ["push", "origin", `v${version}`]);
}
