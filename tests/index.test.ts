import { sleep, timeout, retry, waitUntil, debounceAsync } from "../src";

async function runTests() {
  console.log("Test sleep...");
  const start = Date.now();
  await sleep(200);
  console.log("  ✔ slept for", Date.now() - start, "ms");

  console.log("Test timeout...");
  try {
    await timeout(sleep(300), 100);
  } catch (e) {
    console.log("  ✔ timeout triggered:", (e as Error).message);
  }

  console.log("Test retry...");
  let attempts = 0;
  const result = await retry(
    async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "ok";
    },
    { retries: 5, delay: 100 }
  );
  console.log("  ✔ retry result:", result);

  console.log("Test waitUntil...");
  let ready = false;
  setTimeout(() => (ready = true), 300);
  await waitUntil(() => ready, { interval: 50, timeout: 1000 });
  console.log("  ✔ waitUntil success");

  console.log("Test debounceAsync...");
  const fn = debounceAsync(async (x: number) => x * 2, 200);
  fn(2);
  const val = await fn(3);
  console.log("  ✔ debounceAsync result:", val);
}

runTests();
