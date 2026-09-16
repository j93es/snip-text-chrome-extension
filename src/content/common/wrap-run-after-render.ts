export function runAfterRender(callback: () => void): void {
    const schedule = () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(callback);
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", schedule, {
            once: true
        });
        return;
    }

    schedule();
}

