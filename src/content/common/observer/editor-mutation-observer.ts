export class EditorMutationObserver {
  private selector: string;
  private currentEditor: HTMLElement | null | undefined;
  private observer: MutationObserver;
  private editorChangedCallback: () => void;

  constructor(selector: string, changedCallback: () => void) {
    this.selector = selector;
    this.currentEditor = undefined;
    this.editorChangedCallback = changedCallback;

    this.observer = new MutationObserver(() => {
      this.checkEditor();
    });
  }

  start() {
    this.checkEditor();
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  stop() {
    this.observer.disconnect();
  }

  checkEditor() {
    const editors = document.querySelectorAll<HTMLElement>(this.selector);

    const editor =
      [...editors].find((editor) => editor.offsetParent !== null) ?? null;

    if (editor !== this.currentEditor) {
      this.currentEditor = editor;

      this.editorChangedCallback();
    }
  }

  getEditor() {
    return this.currentEditor;
  }
}
