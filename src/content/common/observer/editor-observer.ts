export interface EditorObserver {
  start(): void;
  stop(): void;
  getEditor(): HTMLElement | null | undefined;
  getEditorText(editor: HTMLElement | null | undefined): string;
  checkEditor(): void;
}

export interface EditorObserverFactory {
  create(
    selector: string,
    changedCallback: () => Promise<void>,
  ): EditorObserver;
}
