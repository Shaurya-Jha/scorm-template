import fs from "fs-extra";
import archiver from "archiver";
export function zipCourse(dir, out) {
    return new Promise((res, rej) => {
        const output = fs.createWriteStream(out);
        const archive = archiver("zip", { zlib: { level: 9 } });
        output.on("close", res);
        output.on("error", rej);
        archive.on("error", rej);
        archive.pipe(output);
        // Zip the **contents of dir**, not dir itself
        archive.glob("**/*", { cwd: dir, dot: true });
        archive.finalize();
    });
}
// export function zipCourse(dir: string, out: string) {
//   return new Promise<void>((res, rej) => {
//     const output = fs.createWriteStream(out);
//     const archive = archiver("zip", { zlib: { level: 9 } });
//     output.on("close", () => res());
//     output.on("error", rej);
//     archive.on("error", rej);
//     archive.pipe(output);
//     archive.glob("**/*", {
//       cwd: dir,   // MUST be folder containing imsmanifest.xml
//       dot: true
//     });
//     archive.finalize();
//   });
// }
// import fs from "fs-extra"
// import archiver from "archiver";
// export function zipCourse(dir: string, out: string) {
//   return new Promise((res, rej) => {
//     const output = fs.createWriteStream(out);
//     const archive = archiver("zip");
//     archive.pipe(output);
//     archive.directory(dir, false);
//     archive.finalize();
//     output.on("close", res);
//     output.on("error", rej);
//   });
// }
//# sourceMappingURL=zip.js.map