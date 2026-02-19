import fs from "fs-extra";
import Handlebars from "handlebars";
import path from "node:path";

/**
 * Generate SCORM manifest
 */
export async function generateManifest(dist: string, cfg: any) {
  // select template
  const templateName =
    cfg.scorm === "1.2" ? "imsmanifest12.xml.hbs" : "imsmanifest2004.xml.hbs";

  const tmplPath = path.join(
    path.dirname(import.meta.url.replace("file://", "")),
    "../../templates",
    templateName,
  );

  // collect files from dist folder
  const files = await collectFiles(dist);

  // auto-detect launch file
  const launch = cfg.launch || detectLaunchFile(files) || "index.html";

  // render template
  const tmpl = await fs.readFile(tmplPath, "utf8");

  const xml = Handlebars.compile(tmpl)({
    ...cfg,
    launch,
    files,
  });

  // write manifest
  await fs.writeFile(path.join(dist, "imsmanifest.xml"), xml, "utf8");
}

/**
 * Recursively collect all files in dist
 */
async function collectFiles(dir: string, base = dir): Promise<string[]> {
  const entries = await fs.readdir(dir);
  const files: string[] = [];

  for (const entry of entries) {
    // ignore system junk
    if (entry === ".DS_Store") continue;
    if (entry === "Thumbs.db") continue;

    const full = path.join(dir, entry);
    const stat = await fs.stat(full);

    if (stat.isDirectory()) {
      files.push(...(await collectFiles(full, base)));
    } else {
      // prevent manifest self-reference
      if (entry === "imsmanifest.xml") continue;

      files.push(path.relative(base, full).replace(/\\/g, "/"));
    }
  }

  return files;
}

/**
 * Auto-detect launch file
 */
function detectLaunchFile(files: string[]): string | null {
  // priority order
  const candidates = ["index_scorm.html", "index.html"];

  for (const file of candidates) {
    if (files.includes(file)) return file;
  }

  return null;
}

// import fs from "fs-extra";
// import Handlebars from "handlebars";
// import path from "node:path";

// export async function generateManifest(dist: string, cfg: any) {
//   // check scorm version
//   const templateName =
//     cfg.scorm === "1.2"
//       ? "imsmanifest12.xml.hbs"
//       : "imsmanifest2004.xml.hbs";

//   const tmplPath = path.join(
//     path.dirname(import.meta.url.replace("file://", "")),
//     "../../templates",
//     templateName,
//   );

//   // collect files from dist
//   const files = await collectFiles(dist);

//   const tmpl = await fs.readFile(tmplPath, "utf8");

//   // pass files into template
//   const xml = Handlebars.compile(tmpl)({
//     ...cfg,
//     files,
//   });

//   await fs.writeFile(path.join(dist, "imsmanifest.xml"), xml);
// }

// async function collectFiles(dir: string, base = dir) {
//   const entries = await fs.readdir(dir);
//   const files: string[] = [];

//   for (const entry of entries) {
//     if (entry === "imsmanifest.xml") continue; // avoid self reference

//     const full = path.join(dir, entry);
//     const stat = await fs.stat(full);

//     if (stat.isDirectory()) {
//       files.push(...(await collectFiles(full, base)));
//     } else {
//       files.push(path.relative(base, full).replace(/\\/g, "/"));
//     }
//   }

//   return files;
// }
