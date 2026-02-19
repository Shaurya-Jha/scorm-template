import { generateManifest } from "./manifest/generateManifest.js";
import { zipCourse } from "./pack/zip.js";
import path from "node:path";
import fs from "fs-extra";
export function scormPlugin(cfg) {
    return {
        name: "scorm-plugin",
        async closeBundle() {
            const dist = "dist";
            const indexPath = path.join(dist, "index.html");
            let html = await fs.readFile(indexPath, "utf8");
            // inject SCORM API script BEFORE closing </head>
            const apiScript = cfg.scrom === "2004"
                ? `<script src="./scorm2004-api.js"></script>`
                : `<script src="./scorm12-api.js"></script>`;
            html = html.replace("</head>", `${apiScript}\n</head>`);
            await fs.writeFile(indexPath, html, "utf8");
            // await injectWrapper(dist, cfg);
            await generateManifest(dist, cfg);
            await zipCourse(dist, cfg.output || "scorm.zip");
            console.log("SCORM package created");
        }
    };
}
//# sourceMappingURL=vite-plugin.js.map