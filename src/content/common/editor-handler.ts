import { EditorMutationObserver } from "./observer/editor-mutation-observer";
import { EditorPollingObserver } from "./observer/editor-polling-observer";
import type {
  EditorObserver,
  EditorObserverFactory,
} from "./observer/editor-observer";
import { sendMessage } from "../../common/message-bus";
import type { EditorVendorName } from "../../core/data-types";

export type EditorObserverType = "MUTATION" | "POLLING";

export interface StartEditorObserverOptions {
  vendorName: EditorVendorName;
  selector: string;
  observerType?: EditorObserverType;
  shouldInitialize?: () => boolean;
}

function createEditorObserver(
  selector: string,
  observerType: EditorObserverType,
  changedCallback: () => Promise<void>,
): EditorObserver {
  if (observerType === "POLLING") {
    return new EditorPollingObserver(selector, changedCallback);
  }

  return new EditorMutationObserver(selector, changedCallback);
}

function startEditorObserver({
  vendorName,
  selector,
  observerType = "MUTATION",
  shouldInitialize = () => true,
}: StartEditorObserverOptions): EditorObserver | null {
  if (!shouldInitialize()) {
    return null;
  }

  const observer = createEditorObserver(selector, observerType, async () => {
    const editor = observer.getEditor();
    const isEditorRendered = editor !== null;
    const text = observer.getEditorText(editor);

    await sendMessage({
      src: "CONTENT",
      dst: "BACKGROUND",
      path: "/editor/update-status",
      method: "PUT",
      data: {
        venderName: vendorName,
        status: { isEditorRendered, text },
      },
    });
  });

  observer.start();

  return observer;
}

export { startEditorObserver };
export type { EditorObserverFactory, EditorObserver };
