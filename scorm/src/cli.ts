#!/usr/bin/env node
import { generateManifest } from "./manifest/generateManifest.js";
import { zipCourse } from "./pack/zip.js";
import path from "node:path";

const cfg = await import(process.cwd() + "/scorm.config.ts").then(
  (m) => m.default,
);

// Determine folder to package
const distRoot = path.resolve("dist");

// Detect the folder that contains the launch file
// generateManifest will also auto-detect launch
const scormFolder = path.join(distRoot, cfg.id || "course-temp");

// Generate manifest inside that folder
await generateManifest(scormFolder, cfg);

// Zip the folder contents
await zipCourse(scormFolder, cfg.output || `${cfg.id}.zip`);

console.log("SCORM package created successfully!");






// #!/usr/bin/env node
// import { generateManifest } from "./manifest/generateManifest.js";
// import { zipCourse } from "./pack/zip.js";

// const cfg = await import(process.cwd() + "/scorm.config.ts").then(
//   (m) => m.default,
// );

// await generateManifest("dist", cfg);

// const folderName = cfg.output.replace(".zip", "");
// await zipCourse("dist/"+folderName, cfg.output || "scorm.zip");

// console.log("SCORM packed");
