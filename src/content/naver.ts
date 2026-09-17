import { UrlObserver } from "./common/observer/url-observer";
import { EditorMutationObserver } from "./common/observer/editor-mutation-observer";
import { runAfterRender } from "./common/wrap-run-after-render";
import { MessageBus } from "../common/message-bus";
import type { MessageRequest, MessageResponse } from "../core/message-types";

const NAVER_EDITOR_URL = "mail.naver.com/v2/new";
const NAVER_EDITOR_SELECTOR =
  'div.workseditor-content[class="workseditor-content"][contenteditable="true"]';
const messageBus = new MessageBus("CONTENT");

function startNaverObserver(): void {
  if (window.self !== window.top) {
    return;
  }

  const naverObserver = new UrlObserver(() => {
    const isEditorRendered = naverObserver.getUrl()?.includes(NAVER_EDITOR_URL);
    const res = messageBus.send({
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

  const naverEditorObserver = new EditorMutationObserver(
    NAVER_EDITOR_SELECTOR,
    () => {
      console.log(naverEditorObserver.getEditor());
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

    if (req.data.venderName !== "NAVER") {
      return;
    }

    if (req.method === "PUT" && req.path === "/editor/insert-text") {
      console.log("naver observer", req.data.text);

      return {
        statusCode: 400,
        data: { prevText: "hello world" },
      };
    }
  });

  naverEditorObserver.start();
}

startNaverObserver();
runAfterRender(startNaverEditorObserver);
