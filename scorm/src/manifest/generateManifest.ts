import fs from "fs-extra";
import Handlebars from "handlebars";
import path from "node:path";

export async function generateManifest(dist: string, cfg: any) {
  // check scorm version
  const templateName =
    cfg.scorm === "1.2" ? "imsmanifest12.xml.hbs" : "imsmanifest2004.xml.hbs";

  const tmplPath = path.join(
    path.dirname(import.meta.url.replace("file://", "")),
    "../../templates",
    templateName,
  );

  const tmpl = await fs.readFile(tmplPath, "utf8");
  const xml = Handlebars.compile(tmpl)(cfg);

  await fs.writeFile(path.join(dist, "imsmanifest.xml"), xml);
}
