import { useContext } from "react";
import { ScormContext } from "./context";
export function useScorm() {
    const api = useContext(ScormContext);
    if (!api)
        throw new Error("Wrap app with ScormProvider");
    return api;
}
export function useScormProgress() {
    const scorm = useScorm();
    return {
        complete() {
            scorm.set("cmi.completion_status", "completed");
            scorm.commit();
        },
        score(raw) {
            scorm.set("cmi.score.raw", raw);
            scorm.set("cmi.success_status", raw >= 60 ? "passed" : "failed");
            scorm.commit();
        },
        bookmark(loc) {
            scorm.set("cmi.location", loc);
            scorm.commit();
        }
    };
}
//# sourceMappingURL=useScorm.js.map