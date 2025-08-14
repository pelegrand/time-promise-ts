"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
exports.timeout = timeout;
exports.retry = retry;
exports.waitUntil = waitUntil;
exports.debounceAsync = debounceAsync;
// 1. sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// 2. timeout
async function timeout(promise, ms) {
    let timer;
    const race = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    });
    const result = await Promise.race([promise, race]);
    clearTimeout(timer);
    return result;
}
// 3. retry
async function retry(fn, opts) {
    let lastErr;
    for (let i = 0; i <= opts.retries; i++) {
        try {
            return await fn();
        }
        catch (err) {
            lastErr = err;
            if (i < opts.retries)
                await sleep(opts.delay);
        }
    }
    throw lastErr;
}
// 4. waitUntil
async function waitUntil(condition, opts) {
    const start = Date.now();
    while (true) {
        if (await condition())
            return;
        if (Date.now() - start > opts.timeout) {
            throw new Error(`waitUntil timed out after ${opts.timeout}ms`);
        }
        await sleep(opts.interval);
    }
}
// 5. debounceAsync
function debounceAsync(fn, delay) {
    let timer = null;
    let lastCall = null;
    return (...args) => {
        if (timer)
            clearTimeout(timer);
        lastCall = new Promise((resolve, reject) => {
            timer = setTimeout(() => {
                fn(...args).then(resolve).catch(reject);
            }, delay);
        });
        return lastCall;
    };
}
