import { listenMessage } from "../common/message-bus";
import type { MessageRequest, MessageResponse } from "../core/message-types";
import { router as editorContentRouter } from "./editor/content-router";
import { router as popupContentRouter } from "./editor/popup-router";

listenMessage(async (req: MessageRequest): Promise<MessageResponse> => {
  const editorContentRouterRes = await editorContentRouter(req);
  if (editorContentRouterRes) {
    return editorContentRouterRes;
  }

  const popupContentRouterRes = await popupContentRouter(req);
  if (popupContentRouterRes) {
    return popupContentRouterRes;
  }

  return {
    statusCode: 404,
    data: { msg: "not founded" },
  };
});
