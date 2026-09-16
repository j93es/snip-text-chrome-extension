import { UrlObserver } from "./common/observer/url-observer";
import { EditorMutationObserver } from "./common/observer/editor-mutation-observer";
import { runAfterRender } from "./common/wrap-run-after-render";
import { ContentMessageBus } from "./common/content-message-bus";
import { DOM_CHANGED } from "../core/bus-tab-id";
import { tryCatch } from "../common/wrapper";

const NAVER_EDITOR_URL = "mail.naver.com/v2/new";
    const NAVER_EDITOR_SELECTOR =
        'div.workseditor-content[class="workseditor-content"][contenteditable="true"]';

tryCatch(() => {
    function startNaverEditorObserver(): void {
        const messageBus = new ContentMessageBus(DOM_CHANGED);
        const naverObserver = new UrlObserver(
            () => {
                const isFoundEditor = naverObserver.getUrl()?.includes(NAVER_EDITOR_URL);
                messageBus.send(JSON.stringify({ isFoundEditor }));
            },
        );
        naverObserver.start();
    }

    runAfterRender(startNaverEditorObserver);
});

tryCatch(() => {
    function startNaverObserver(): void {
        if (window.self === window.top) {
            return;
        }

        if (!document.querySelector(NAVER_EDITOR_SELECTOR)) {
            return;
        }

        const naverObserver = new EditorMutationObserver(NAVER_EDITOR_SELECTOR, () => {
            
        });
        naverObserver.start();
    }

    runAfterRender(startNaverObserver);
});
