import { scormRuntime } from "../api/scorm-2004";
export function saveSuspend(data) {
    scormRuntime.set("cmi.suspend_data", JSON.stringify(data));
    scormRuntime.commit();
}
export function loadSuspend() {
    const raw = scormRuntime.get("cmi.suspend_data");
    if (!raw)
        return null;
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=suspend.js.map