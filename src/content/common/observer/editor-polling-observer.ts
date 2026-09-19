import type { EditorObserver } from "./editor-observer";

export class EditorPollingObserver implements EditorObserver {
  private selector: string;
  private currentEditor: HTMLElement | null | undefined;
  private currentText: string;
  private intervalId: number | null = null;
  private editorChangedCallback: () => Promise<void>;

  constructor(selector: string, changedCallback: () => Promise<void>) {
    this.selector = selector;
    this.currentEditor = undefined;
    this.currentText = "";
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

    this.currentEditor = undefined;
    this.currentText = "";
  }

  getEditorText(editor: HTMLElement | null | undefined): string {
    if (!(editor instanceof HTMLElement)) {
      return "";
    }

    return editor.textContent?.replace(/\u200B/g, "") ?? "";
  }

  checkEditor() {
    const editors = document.querySelectorAll<HTMLElement>(this.selector);

    const editor =
      [...editors].find((editor) => editor.offsetParent !== null) ?? null;
    const nextText = this.getEditorText(editor);
    const textChanged =
      editor !== null &&
      editor === this.currentEditor &&
      nextText !== this.currentText;

    if (editor !== this.currentEditor || textChanged) {
      this.currentEditor = editor;
      this.currentText = nextText;

      this.editorChangedCallback();
    }
  }

  getEditor() {
    return this.currentEditor;
  }
}
