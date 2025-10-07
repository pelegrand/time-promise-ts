# ⏱️ time-promises-ts

[![npm version](https://img.shields.io/npm/v/time-promise-ts.svg)](https://www.npmjs.com/package/time-promise-ts)
[![npm downloads](https://img.shields.io/npm/dm/time-promise-ts.svg)](https://www.npmjs.com/package/time-promise-ts)

TypeScript utility library designed to simplify **time-based asynchronous operations** using `Promise`.

It provides a setouts, retries, conditional waits, and debounced async functions.

---

## ✨ Features

- **`sleep(ms)`** – Pauses execution for a given number of milliseconds.
- **`timeout(promise, ms)`** – Rejects a promise if it doesn't resolve within the specified time.
- **`retry(fn, options)`** – Retries an async function with customizable strategy (attempts, delay, etc.).
- **`waitUntil(conditionFn, options)`** – Waits until a condition becomes true, checking periodically.
- **`debounceAsync(fn, delay)`** – Creates a debounced version of an async function.

---

## 📦 Installation

```bash
npm install time-promise-ts
```
## 🧪 Usage Examples

Here are practical examples of how to use each helper provided by `time-promises-ts`:

---

### 💤 `sleep(ms: number): Promise<void>`

Pauses execution for a specified number of milliseconds.

```JS
import { sleep } from 'time-promises-ts';

await sleep(1000);
```


