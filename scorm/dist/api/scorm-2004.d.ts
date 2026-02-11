import { ScormAPI2004 } from "./types";
declare class ScormRuntime {
    api: ScormAPI2004 | null;
    initialized: boolean;
    init(): boolean | undefined;
    get(key: string): string;
    set(key: string, value: any): string | undefined;
    commit(): void;
    terminate(): void;
}
export declare const scormRuntime: ScormRuntime;
export {};
//# sourceMappingURL=scorm-2004.d.ts.map