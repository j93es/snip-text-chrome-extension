import { listenMessage } from "../common/message-bus";
import type { MessageRequest, MessageResponse } from "../core/message-types";
import { router as editorRouter } from "./editor/router";

listenMessage(async (req: MessageRequest): Promise<MessageResponse> => {
  if (req.path.startsWith("/editor/")) {
    const editorRouterRes = await editorRouter(req);
    if (editorRouterRes) {
      return editorRouterRes;
    }
  }

  return {
    statusCode: 404,
    data: { msg: "router not founded" },
  };
});
