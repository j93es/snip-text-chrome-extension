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

  if (req.method === "GET" && req.path === "/editor/is-editor-rendered") {
    if (!req.data || !req.data.venderName) {
      return {
        statusCode: 400,
        data: { msg: "Invaild data field" },
      };
    }

    const result = await service.getEditorStatus(req.data.venderName);

    return {
      statusCode: 200,
      data: { isEditorRendered: result },
    };
  }
};

export const router = async (
  data: MessageRequest,
): Promise<MessageResponse | void> => {
  const res = await popupRouter(data);

  return res;
};
