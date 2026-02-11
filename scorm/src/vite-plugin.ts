import { generateManifest } from "./manifest/generateManifest.js";
import { zipCourse } from "./pack/zip.js";
import { injectWrapper } from "./wrapper/injectWrapper.js";

export function scormPlugin(cfg:any) {
  return {
    name: "scorm-plugin",

    async closeBundle() {
      const dist = "dist";

      await injectWrapper(dist, cfg);
      await generateManifest(dist, cfg);
      await zipCourse(dist, cfg.output || "scorm.zip");

      console.log("SCORM package created");
    }
  };
}
