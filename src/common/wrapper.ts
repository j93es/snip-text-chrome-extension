function tryCatch<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch (error) {
    console.error("Error in tryCatch:", error);
    return undefined;
  }
}

async function tryCatchAsync<T>(fn: () => Promise<T>): Promise<T | undefined> {
  return fn().catch((error) => {
    console.error("Error in tryCatchAsync:", error);
    return undefined;
  });
}

export { tryCatch, tryCatchAsync };
