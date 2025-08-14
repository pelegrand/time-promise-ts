export declare function sleep(ms: number): Promise<void>;
export declare function timeout<T>(promise: Promise<T>, ms: number): Promise<T>;
export declare function retry<T>(fn: () => Promise<T>, opts: {
    retries: number;
    delay: number;
}): Promise<T>;
export declare function waitUntil(condition: () => boolean | Promise<boolean>, opts: {
    interval: number;
    timeout: number;
}): Promise<void>;
export declare function debounceAsync<T extends (...args: any[]) => Promise<any>>(fn: T, delay: number): (...args: Parameters<T>) => Promise<ReturnType<T>>;
