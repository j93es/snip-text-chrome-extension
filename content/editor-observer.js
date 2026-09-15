export class EditorObserver {

    constructor(selector) {
        this.selector = selector;
        this.currentEditor = null;

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

    checkEditor() {
        const editors =
            document.querySelectorAll(this.selector);

        const editor = [...editors].find(
            editor => editor.offsetParent !== null
        ) ?? null;

        if (editor !== this.currentEditor) {
            this.currentEditor = editor;

            console.log(
                "Editor changed:",
                editor
            );
        }
    }

    getEditor() {
        return this.currentEditor;
    }
}

