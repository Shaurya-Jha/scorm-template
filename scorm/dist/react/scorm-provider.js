import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { scormRuntime } from "../api/scorm-2004";
import { ScormContext } from "./context";
export function ScormProvider({ children }) {
    useEffect(() => {
        scormRuntime.init();
        scormRuntime.set("cmi.completion_status", "incomplete");
        scormRuntime.commit();
        const handleUnload = () => {
            scormRuntime.commit();
            scormRuntime.terminate();
        };
        window.addEventListener("beforeunload", handleUnload);
        return () => handleUnload();
    }, []);
    return (_jsx(ScormContext.Provider, { value: scormRuntime, children: children }));
}
//# sourceMappingURL=scorm-provider.js.map