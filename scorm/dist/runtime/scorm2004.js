import { findAPI } from "./api-finder.js";
export function getScorm2004() {
    const api = findAPI(window, "API_1484_11");
    if (!api)
        throw Error("SCORM 2004 API not found");
    return {
        init: () => api.Initialize(""),
        get: (k) => api.GetValue(k),
        set: (k, v) => api.SetValue(k, v),
        commit: () => api.Commit(""),
        finish: () => api.Terminate("")
    };
}
//# sourceMappingURL=scorm2004.js.map