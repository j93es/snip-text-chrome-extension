class EditorObserver {

    constructor(selector) {
        this.selector = selector;
        this.currentEditor = null;

        this.observer = new MutationObserver(() => {
            this.checkEditor();
        });
    }

    start() {
        if (!document.body) {
            console.warn("document.body is not detected.");
            return;
        }

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.checkEditor();

        console.log("EditorObserver started");
    }

    stop() {
        this.observer.disconnect();

        this.currentEditor = null;

        console.log("EditorObserver stopped");
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

const GMAIL_EDITOR_SELECTOR = 'div[contenteditable="true"][role="textbox"][aria-multiline="true"]';
const gmailObserver = new EditorObserver(GMAIL_EDITOR_SELECTOR);
gmailObserver.start()

setInterval(() => {
    console.log(gmailObserver.getEditor());
}, 1000)