export function createMockAPI() {
    const store = {};
    return {
        Initialize: () => "true",
        Terminate: () => "true",
        GetValue: (k) => store[k] ?? "",
        SetValue: (k, v) => {
            store[k] = v;
            return "true";
        },
        Commit: () => "true",
        GetLastError: () => "0",
        GetErrorString: () => "No error"
    };
}
//# sourceMappingURL=mockApi.js.map