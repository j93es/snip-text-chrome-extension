import { EditorMutationObserver } from "./common/observer/editor-mutation-observer";
import { runAfterRender } from "./common/wrap-run-after-render";
import { MessageBus } from "../common/message-bus";
import type { MessageRequest, MessageResponse } from "../core/message-types";

const messageBus = new MessageBus("CONTENT");

const GMAIL_EDITOR_SELECTOR =
  'div[contenteditable="true"][g_editable="true"][role="textbox"][aria-multiline="true"]';

function startGmailObserver(): void {
  const gmailObserver = new EditorMutationObserver(
    GMAIL_EDITOR_SELECTOR,
    () => {
      const isEditorRendered = gmailObserver.getEditor() !== null;
      const res = messageBus.send({
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

  messageBus.on((req: MessageRequest): MessageResponse | void => {
    if (req.src !== "BACKGROUND") {
      return;
    }

    if (req.dst !== "CONTENT") {
      return;
    }

    if (!req.data.venderName) {
      return {
        statusCode: 400,
        data: { msg: "venderName is empty." },
      };
    }

    if (!req.data.text) {
      return {
        statusCode: 400,
        data: { msg: "status is empty." },
      };
    }

    if (req.data.venderName !== "GOOGLE") {
      return;
    }

    if (req.method === "PUT" && req.path === "/editor/insert-text") {
      console.log("gmail observer", req.data.text);

      return {
        statusCode: 400,
        data: { prevText: "hello world" },
      };
    }
  });
  gmailObserver.start();
}

runAfterRender(startGmailObserver);
