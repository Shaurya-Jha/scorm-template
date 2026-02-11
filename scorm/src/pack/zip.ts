import fs from "fs-extra"
import archiver from "archiver";

export function zipCourse(dir: string, out: string) {
  return new Promise((res, rej) => {
    const output = fs.createWriteStream(out);
    const archive = archiver("zip");
    
    archive.pipe(output);
    archive.directory(dir, false);
    archive.finalize();
    
    output.on("close", res);
    output.on("error", rej);
  });
}