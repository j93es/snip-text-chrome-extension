import { runAfterRender } from "./common/wrap-run-after-render";
import {
  startEditorObserver,
  type EditorObserver,
} from "./common/editor-handler";
import { createEditorRouter, listenEditorRouter } from "./common/editor-router";

const GMAIL_EDITOR_SELECTOR =
  'div[contenteditable="true"][g_editable="true"][role="textbox"][aria-multiline="true"]';

function startGmailEditorObserver(): EditorObserver | null {
  return startEditorObserver({
    vendorName: "GOOGLE",
    selector: GMAIL_EDITOR_SELECTOR,
    observerType: "POLLING",
    shouldInitialize: () => true,
  });
}

runAfterRender(() => {
  const observer = startGmailEditorObserver();

  if (observer) {
    listenEditorRouter(
      createEditorRouter({
        vendorName: "GOOGLE",
        getEditor: () => observer.getEditor(),
        getEditorText: (editor) => observer.getEditorText(editor),
      }),
    );
  }
});
