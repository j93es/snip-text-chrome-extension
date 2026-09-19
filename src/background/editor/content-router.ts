import type { MessageRequest, MessageResponse } from "../../core/message-types";
import { service } from "./service";

const contentRouter = async (
  req: MessageRequest,
): Promise<MessageResponse | void> => {
  if (!req.path.startsWith("/editor")) {
    return;
  }

  if (req.src !== "CONTENT" || req.dst !== "BACKGROUND") {
    return;
  }

  if (req.method === "PUT" && req.path === "/editor/update-status") {
    if (!req.data || !req.data.venderName || !req.data.status) {
      return {
        statusCode: 400,
        data: { msg: "Invaild data field" },
      };
    }

    await service.updateEditorStatus(req.data.venderName, req.data.status);

    return {
      statusCode: 200,
      data: { msg: "ok" },
    };
  }
};

export const router = async (
  req: MessageRequest,
): Promise<MessageResponse | void> => {
  const res = await contentRouter(req);
  if (res) {
    return res;
  }
};
