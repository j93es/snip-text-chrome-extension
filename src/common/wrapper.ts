function tryCatch<T>(fn: () => T): T | undefined {
    try {
        return fn();
    } catch (error) {
        console.error("Error in tryCatch:", error);
        return undefined;
    }
}

export { tryCatch };