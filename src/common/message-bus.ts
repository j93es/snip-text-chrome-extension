import { tryCatch, tryCatchAsync } from "./wrapper";
import type {
  MessageSource,
  MessageRequest,
  MessageResponse,
} from "../core/message-types";

export class MessageBus {
  private src: MessageSource;

  constructor(src: MessageSource) {
    this.src = src;
  }

  async send(data: MessageRequest): Promise<MessageResponse | void> {
    data.src = this.src;

    return await tryCatchAsync(async () => {
      const response = await chrome.runtime.sendMessage(data);
      return response;
    });
  }

  on(
    callback: (
      req: MessageRequest,
    ) => MessageResponse | Promise<MessageResponse> | void,
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
}
