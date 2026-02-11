import { findAPI } from "./api-finder.js";
export function getScorm12() {
    const api = findAPI(window, "API");
    if (!api)
        throw Error("SCORM 1.2 API not found");
    return {
        init: () => api.LMSInitialize(""),
        get: (k) => api.LMSGetValue(k),
        set: (k, v) => api.LMSSetValue(k, v),
        commit: () => api.LMSCommit(""),
        finish: () => api.LMSFinish(""),
    };
}
//# sourceMappingURL=scorm12.js.map