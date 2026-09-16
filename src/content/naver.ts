import { EditorObserver } from "./editor-observer";

const NAVER_EDITOR_SELECTOR =
    'div.workseditor-content[class="workseditor-content"][contenteditable="true"]';

function startNaverObserver(): void {
    if (window.self === window.top) {
        return;
    }

    if (!document.querySelector(NAVER_EDITOR_SELECTOR)) {
        return;
    }

    const naverObserver = new EditorObserver(NAVER_EDITOR_SELECTOR);
    naverObserver.start();

    setInterval(() => {
        console.log(naverObserver.getEditor());
    }, 1000);
}

function runAfterRender(callback: () => void): void {
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

runAfterRender(startNaverObserver);
