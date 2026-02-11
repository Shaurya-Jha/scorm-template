import fs from "fs-extra";
import path from "node:path";
export async function injectWrapper(dist, cfg) {
    const wrapper = `
<!doctype html>
<html>
<body>
<iframe src="${cfg.launch}" width="100%" height="100%"></iframe>
<script src="scorm-api.js"></script>
</body>
</html>`;
    await fs.writeFile(path.join(dist, "index_scorm.html"), wrapper);
}
//# sourceMappingURL=injectWrapper.js.map