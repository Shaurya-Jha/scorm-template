import { findAPI } from "./finder";
import { createMockAPI } from "../mock/mockApi";
class ScormRuntime {
    constructor() {
        this.api = null;
        this.initialized = false;
    }
    init() {
        if (this.api === undefined || null)
            return;
        if (this.initialized)
            return true;
        this.api = findAPI(window) || createMockAPI();
        const ok = this.api?.Initialize("");
        this.initialized = ok === "true";
        return this.initialized;
    }
    get(key) {
        return this.api?.GetValue(key) ?? "";
    }
    set(key, value) {
        return this.api?.SetValue(key, String(value));
    }
    commit() {
        this.api?.Commit("");
    }
    terminate() {
        this.api?.Terminate("");
    }
}
export const scormRuntime = new ScormRuntime();
//# sourceMappingURL=scorm-2004.js.map