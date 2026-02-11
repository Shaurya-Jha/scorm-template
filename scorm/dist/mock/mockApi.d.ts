export declare function createMockAPI(): {
    Initialize: () => string;
    Terminate: () => string;
    GetValue: (k: string) => string;
    SetValue: (k: string, v: string) => string;
    Commit: () => string;
    GetLastError: () => string;
    GetErrorString: () => string;
};
//# sourceMappingURL=mockApi.d.ts.map