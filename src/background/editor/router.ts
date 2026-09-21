import type { MessageRequest, MessageResponse } from "../../core/message-types";
import { service } from "./service";

const routing = async (
  req: MessageRequest,
): Promise<MessageResponse | void> => {
  if (req.dst !== "BACKGROUND") {
    return;
  }

  if (req.method === "GET" && req.path === "/editor/status") {
    if (!req.data || !req.data.vendorName) {
      return {
        statusCode: 400,
        data: { msg: "Invaild data field" },
      };
    }

    const result = await service.getEditorStatus(req.data.vendorName);

    if (result) {
      return {
        statusCode: 200,
        data: result,
      };
    }
  }

  if (req.method === "PUT" && req.path === "/editor/update-status") {
    if (req.src !== "CONTENT") {
      return;
    }

    if (!req.data || !req.data.vendorName || !req.data.status) {
      return {
        statusCode: 400,
        data: { msg: "Invaild data field" },
      };
    }

    await service.updateEditorStatus(req.data.vendorName, req.data.status);

    const result = await service.commandInsertTemplate(req.data.vendorName);

    return {
      statusCode: 200,
      data: result,
    };
  }

  if (req.method === "PUT" && req.path === "/editor/insert-text") {
    if (req.src !== "POPUP") {
      return;
    }

    if (!req.data || !req.data.text) {
      return {
        statusCode: 400,
        data: { msg: "Invalid data field" },
      };
    }

    const result = await service.insertText(req.data.text);

    return {
      statusCode: 200,
      data: result,
    };
  }
};

export const router = async (
  data: MessageRequest,
): Promise<MessageResponse | void> => {
  const res = await routing(data);

  return res;
};
