#!/usr/bin/env node
import { generateManifest } from "./manifest/generateManifest.js";
import { zipCourse } from "./pack/zip.js";

const cfg = await import(process.cwd() + "/scorm.config.ts").then(
  (m) => m.default,
);

await generateManifest("dist", cfg);
await zipCourse("dist", cfg.output || "scorm.zip");

console.log("SCORM packed");
