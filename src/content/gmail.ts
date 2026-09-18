import { EditorMutationObserver } from "./common/observer/editor-mutation-observer";
import { runAfterRender } from "./common/wrap-run-after-render";
import { sendMessage, listenMessage } from "../common/message-bus";
import type { MessageRequest, MessageResponse } from "../core/message-types";
import { insertTextToEditor } from "./common/insert-text";

const GMAIL_EDITOR_SELECTOR =
  'div[contenteditable="true"][g_editable="true"][role="textbox"][aria-multiline="true"]';

function startGmailObserver(): void {
  const gmailObserver = new EditorMutationObserver(
    GMAIL_EDITOR_SELECTOR,
    () => {
      const isEditorRendered = gmailObserver.getEditor() !== null;
      const res = sendMessage({
        src: "CONTENT",
        dst: "BACKGROUND",
        path: "/editor/update-status",
        method: "PUT",
        data: { venderName: "GOOGLE", status: { isEditorRendered } },
      });

      res.then((response) => {
        console.log("res:", response);
      });
    },
  );

  // background -> content
  listenMessage(
    async (req: MessageRequest): Promise<MessageResponse | void> => {
      if (req.src !== "BACKGROUND" || req.dst !== "CONTENT" || !req.data.text) {
        return {
          statusCode: 400,
          data: { msg: "Invalid field" },
        };
      }

      // 경로별로 유효성 검사 분기
      if (req.method === "PUT" && req.path === "/editor/insert-text") {
        const editor = gmailObserver.getEditor();
        const { isInserted, prevText } = insertTextToEditor(
          editor,
          req.data.text,
        );

        if (!isInserted) {
          return {
            statusCode: 404,
            data: { msg: "Gmail editor not found." },
          };
        }

        return {
          statusCode: 200,
          data: {
            prevText: prevText,
            insertedText: req.data.text,
            currentText:
              editor instanceof HTMLElement ? (editor.textContent ?? "") : "",
            isInserted: isInserted,
          },
        };
      }
    },
  );

  gmailObserver.start();
}

runAfterRender(startGmailObserver);
