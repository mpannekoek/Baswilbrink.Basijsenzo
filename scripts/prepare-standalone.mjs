import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneRoot = path.join(root, ".next", "standalone");
const standaloneNextRoot = path.join(standaloneRoot, ".next");
const staticSource = path.join(root, ".next", "static");
const staticTarget = path.join(standaloneNextRoot, "static");
const publicSource = path.join(root, "public");
const publicTarget = path.join(standaloneRoot, "public");

if (!existsSync(standaloneRoot)) {
  process.exit(0);
}

mkdirSync(standaloneNextRoot, { recursive: true });

if (existsSync(staticTarget)) {
  rmSync(staticTarget, { recursive: true, force: true });
}

if (existsSync(publicTarget)) {
  rmSync(publicTarget, { recursive: true, force: true });
}

if (existsSync(staticSource)) {
  cpSync(staticSource, staticTarget, { recursive: true });
}

if (existsSync(publicSource)) {
  cpSync(publicSource, publicTarget, { recursive: true });
}
