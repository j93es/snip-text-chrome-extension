import type { MessageRequest, MessageResponse } from "../../core/message-types";
import { service } from "./service";

const popupRouter = async (
  req: MessageRequest,
): Promise<MessageResponse | void> => {
  if (!req.path.startsWith("/editor")) {
    return;
  }

  if (req.src !== "POPUP" || req.dst !== "BACKGROUND") {
    return;
  }

  if (!req.data) {
    return {
      statusCode: 400,
      data: { msg: "data field is empty." },
    };
  }

  if (req.method === "GET" && req.path === "/editor/is-editor-rendered") {
    if (!req.data.venderName) {
      return {
        statusCode: 400,
        data: { msg: "venderName is empty." },
      };
    }

    const result = await service.getEditorStatus(req.data.venderName);

    return {
      statusCode: 200,
      data: { isEditorRendered: result },
    };
  }

  if (req.method === "PUT" && req.path === "/editor/insert-text") {
    if (!req.data.text) {
      return {
        statusCode: 400,
        data: { msg: "text is empty." },
      };
    }

    const res = await service.insertText(req.data.text);

    return res;
  }
};

export const router = async (
  data: MessageRequest,
): Promise<MessageResponse | void> => {
  const res = await popupRouter(data);

  return res;
};
