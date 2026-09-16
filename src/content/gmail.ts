import { EditorMutationObserver } from "./common/observer/editor-mutation-observer";
import { runAfterRender } from "./common/wrap-run-after-render";
import { ContentMessageBus } from "./common/content-message-bus";
import { DOM_CHANGED } from "../core/bus-tab-id";
import { tryCatch } from "../common/wrapper";

tryCatch(() => {
    const GMAIL_EDITOR_SELECTOR = 'div[contenteditable="true"][g_editable="true"][role="textbox"][aria-multiline="true"]';
    const messageBus = new ContentMessageBus(DOM_CHANGED);

    function startGmailObserver(): void {
        const gmailObserver = new EditorMutationObserver(
            GMAIL_EDITOR_SELECTOR, 
            () => {
                const isFoundEditor = gmailObserver.getEditor() !== null;
                messageBus.send(JSON.stringify({ isFoundEditor }));
            },
        );
        gmailObserver.start()
    }

    runAfterRender(startGmailObserver);
});
