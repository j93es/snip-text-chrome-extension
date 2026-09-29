import { EditorMutationObserver } from "./observer/editor-mutation-observer";
import { EditorCombinedObserver } from "./observer/editor-combined-observer";
import { EditorPollingObserver } from "./observer/editor-polling-observer";
import type {
  EditorObserver,
  EditorObserverFactory,
} from "./observer/editor-observer";
import { sendMessage } from "../../common/message-bus";
import type { EditorVendorName } from "../../core/data-types";

export type EditorObserverType = "MUTATION" | "POLLING" | "COMBINED";

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

  if (observerType === "MUTATION") {
    return new EditorMutationObserver(selector, changedCallback);
  }

  return new EditorCombinedObserver(selector, changedCallback);
}

function startEditorObserver({
  vendorName,
  selector,
  observerType = "COMBINED",
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
        vendorName: vendorName,
        status: { isEditorRendered, text },
      },
    });
  });

  observer.start();

  return observer;
}

export { startEditorObserver };
export type { EditorObserverFactory, EditorObserver };
