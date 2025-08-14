// 1. sleep
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 2. timeout
export async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const race = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  const result = await Promise.race([promise, race]) as T;
  clearTimeout(timer!);
  return result;
}

// 3. retry
export async function retry<T>(
  fn: () => Promise<T>,
  opts: { retries: number; delay: number }
): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i <= opts.retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < opts.retries) await sleep(opts.delay);
    }
  }
  throw lastErr;
}

// 4. waitUntil
export async function waitUntil(
  condition: () => boolean | Promise<boolean>,
  opts: { interval: number; timeout: number }
): Promise<void> {
  const start = Date.now();
  while (true) {
    if (await condition()) return;
    if (Date.now() - start > opts.timeout) {
      throw new Error(`waitUntil timed out after ${opts.timeout}ms`);
    }
    await sleep(opts.interval);
  }
}

// 5. debounceAsync
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastCall: Promise<any> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    lastCall = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        fn(...args).then(resolve).catch(reject);
      }, delay);
    });
    return lastCall as Promise<ReturnType<T>>;
  };
}
