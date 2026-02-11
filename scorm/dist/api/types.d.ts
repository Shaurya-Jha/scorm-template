export interface ScormAPI2004 {
    Initialize(p: string): string;
    Terminate(p: string): string;
    GetValue(k: string): string;
    SetValue(k: string, v: string): string;
    Commit(p: string): string;
    GetLastError(): string;
    GetErrorString(code: string): string;
}
//# sourceMappingURL=types.d.ts.map