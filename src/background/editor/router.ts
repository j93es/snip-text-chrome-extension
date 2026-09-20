import type { MessageRequest, MessageResponse } from "../../core/message-types";
import { service } from "./service";

const commonRouter = async (
  req: MessageRequest,
): Promise<MessageResponse | void> => {
  if (req.dst !== "BACKGROUND") {
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

    const res = await service.commandInsertTemplate(req.data.venderName);
    if (res && res.statusCode !== 200) {
      return res;
    }

    return {
      statusCode: 200,
      data: { msg: "ok" },
    };
  }

  if (req.method === "GET" && req.path === "/editor/status") {
    if (!req.data || !req.data.venderName) {
      return {
        statusCode: 400,
        data: { msg: "Invaild data field" },
      };
    }

    const result = await service.getEditorStatus(req.data.venderName);

    if (result) {
      return {
        statusCode: 200,
        data: result,
      };
    }
  }

  if (req.method === "PUT" && req.path === "/editor/insert-text") {
    if (!req.data || !req.data.text) {
      return {
        statusCode: 400,
        data: { msg: "Invalid data field" },
      };
    }

    const res = await service.insertText(req.data.text);

    return res;
  }
};

export const router = async (
  data: MessageRequest,
): Promise<MessageResponse | void> => {
  const res = await commonRouter(data);

  return res;
};
