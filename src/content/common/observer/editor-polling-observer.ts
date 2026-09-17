export class EditorPollingObserver {
  private selector: string;
  private currentEditor: HTMLElement | null;
  private intervalId: number | null = null;
  private editorChangedCallback: () => void;

  constructor(selector: string, changedCallback: () => void) {
    this.selector = selector;
    this.currentEditor = null;
    this.editorChangedCallback = changedCallback;
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.checkEditor();
    this.intervalId = window.setInterval(() => {
      this.checkEditor();
    }, 250);
  }

  stop() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.currentEditor = null;
  }

  checkEditor() {
    const editors = document.querySelectorAll<HTMLElement>(this.selector);

    const editor =
      [...editors].find((editor) => editor.getClientRects().length > 0) ?? null;

    if (editor !== this.currentEditor) {
      this.currentEditor = editor;

      this.editorChangedCallback();
    }
  }

  getEditor() {
    return this.currentEditor;
  }
}
