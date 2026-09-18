import { tryCatch, tryCatchAsync } from "./wrapper";
import type { MessageRequest, MessageResponse } from "../core/message-types";

async function sendMessage(
  req: MessageRequest,
): Promise<MessageResponse | void> {
  return await tryCatchAsync(async () => {
    const response = await chrome.runtime.sendMessage(req);

    return response;
  });
}

async function sendToActiveTab(
  req: MessageRequest,
): Promise<MessageResponse | void> {
  return await tryCatchAsync(async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const tabId = tabs[0]?.id;

    if (tabId === undefined) {
      return;
    }

    const response = await chrome.tabs.sendMessage(tabId, req);

    return response;
  });
}

function listenMessage(
  callback: (req: MessageRequest) => Promise<MessageResponse | void>,
): void {
  const _callback = (
    req: MessageRequest,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: MessageResponse) => void,
  ) => {
    Promise.resolve(callback(req)).then((res) => {
      if (res) {
        sendResponse(res);
      } else {
        sendResponse({
          statusCode: 500,
          data: { msg: `${req.path} | response data is not created` },
        });
      }
    });

    return true;
  };

  tryCatch(() => {
    chrome.runtime.onMessage.addListener(_callback);
  });
}

export { sendMessage, sendToActiveTab, listenMessage };
