import { UrlObserver } from "./common/observer/url-observer";
import { EditorMutationObserver } from "./common/observer/editor-mutation-observer";
import { runAfterRender } from "./common/wrap-run-after-render";
import { sendMessage, listenMessage } from "../common/message-bus";
import type { MessageRequest, MessageResponse } from "../core/message-types";
import { insertTextToEditor } from "./common/insert-text";

const NAVER_EDITOR_URL = "mail.naver.com/v2/new";
const NAVER_EDITOR_SELECTOR =
  'div.workseditor-content[class="workseditor-content"][contenteditable="true"]';
let naverEditorObserver: EditorMutationObserver;

function startNaverObserver(): void {
  if (window.self !== window.top) {
    return;
  }

  if (!window.location.href.includes(NAVER_EDITOR_URL)) {
    return;
  }

  const naverObserver = new UrlObserver(() => {
    const isEditorRendered = naverObserver.getUrl()?.includes(NAVER_EDITOR_URL);
    const res = sendMessage({
      src: "CONTENT",
      dst: "BACKGROUND",
      path: "/editor/update-status",
      method: "PUT",
      data: { venderName: "NAVER", status: { isEditorRendered } },
    });

    res.then((response) => {
      console.log("res:", response);
    });
  });

  naverObserver.start();
}

function startNaverEditorObserver(): void {
  if (window.self === window.top) {
    return;
  }

  if (!document.querySelector(NAVER_EDITOR_SELECTOR)) {
    return;
  }

  naverEditorObserver = new EditorMutationObserver(
    NAVER_EDITOR_SELECTOR,
    () => {
      // console.log(naverEditorObserver.getEditor());
    },
  );

  // background -> content
  listenMessage(
    async (req: MessageRequest): Promise<MessageResponse | void> => {
      if (req.src !== "POPUP" || req.dst !== "CONTENT") {
        return;
      }

      // 경로별로 유효성 검사 분기
      if (req.method === "PUT" && req.path === "/editor/insert-text") {
        if (!req.data || !req.data.text) {
          return {
            statusCode: 400,
            data: { msg: "Invalid data field" },
          };
        }

        const editor = naverEditorObserver?.getEditor();
        const { prevText, isInserted } = insertTextToEditor(
          editor,
          req.data.text,
        );

        if (!isInserted) {
          return {
            statusCode: 404,
            data: { msg: "Naver editor not found." },
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

  naverEditorObserver.start();
}

startNaverObserver();
runAfterRender(startNaverEditorObserver);
