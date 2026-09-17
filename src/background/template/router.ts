import type { MessageRequest } from "../../core/message-types";

export const router = async (req: MessageRequest) => {
  if (req.dst !== "BACKGROUND") {
    return;
  }

  if (!req.path.startsWith("/template")) {
    return;
  }

  if (req.path === "/template/put") {
    if (req.method === "PUT") {
    }
  }
};
