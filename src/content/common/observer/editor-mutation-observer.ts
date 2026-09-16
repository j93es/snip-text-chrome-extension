export class EditorMutationObserver {
    private selector: string;
    private currentEditor: HTMLElement | null;
    private observer: MutationObserver;
    private editorChangedCallback: () => void;

    constructor(selector: string, changedCallback: () => void) {
        this.selector = selector;
        this.currentEditor = null;
        this.editorChangedCallback = changedCallback;

        this.observer = new MutationObserver(() => {
            this.checkEditor();
        });
    }

    start() {
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.checkEditor();
    }

    stop() {
        this.observer.disconnect();
    }

    checkEditor() {
        const editors =
            document.querySelectorAll<HTMLElement>(this.selector);

        const editor = [...editors].find(
            editor => editor.offsetParent !== null
        ) ?? null;

        if (editor !== this.currentEditor) {

            this.currentEditor = editor;

            this.editorChangedCallback();
        }
    }

    getEditor() {
        return this.currentEditor;
    }
}

