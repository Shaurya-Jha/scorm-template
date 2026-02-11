import { findAPI } from "./api-finder.js";

export function getScorm12() {
  const api = findAPI(window, "API");
  if (!api) throw Error("SCORM 1.2 API not found");

  return {
    init: () => api.LMSInitialize(""),
    get: (k: string) => api.LMSGetValue(k),
    set: (k: string, v: string) => api.LMSSetValue(k, v),
    commit: () => api.LMSCommit(""),
    finish: () => api.LMSFinish(""),
  };
}
