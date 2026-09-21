import { sendMessage } from "../common/message-bus";
import { listenMessage } from "../common/message-bus";
import type { MessageRequest, MessageResponse } from "../core/message-types";

document?.getElementById("sendButton")?.addEventListener("click", async () => {
  const response = await sendMessage({
    src: "POPUP",
    dst: "BACKGROUND",
    path: "/editor/insert-text",
    method: "PUT",
    data: { text: "hello" },
  });

  const elem = document.getElementById("console");
  if (elem) {
    elem.textContent = JSON.stringify(response);
  }
});

document?.getElementById("getButton")?.addEventListener("click", async () => {
  const response = await sendMessage({
    src: "POPUP",
    dst: "BACKGROUND",
    path: "/editor/status",
    method: "GET",
    data: { vendorName: "NAVER" },
  });

  const elem = document.getElementById("console2");
  if (elem) {
    elem.textContent = JSON.stringify(response);
  }
});

listenMessage(async (req: MessageRequest): Promise<MessageResponse | void> => {
  if (req.src !== "BACKGROUND" || req.dst !== "POPUP") {
    return;
  }

  if (req.method === "PUT" && req.path === "/editor/notify-status") {
    if (!req.data) {
      return {
        statusCode: 400,
        data: { msg: "Invalid data field" },
      };
    }

    const elem = document.getElementById("console2");
    if (elem) {
      elem.textContent = JSON.stringify(req.data);
    }

    return {
      statusCode: 200,
      data: { msg: "ok" },
    };
  }
});
