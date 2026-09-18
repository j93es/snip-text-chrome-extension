import type { EditorStatus } from "../../core/editor-status";
import { sendMessage, sendToActiveTab } from "../../common/message-bus";
import type { MessageResponse } from "../../core/message-types";
import { repository } from "./repository";

const getEditorStatus = async (
  venderName: string,
): Promise<EditorStatus | void> => {
  return (await repository.read(venderName)) ?? undefined;
};

const insertText = async (text: string): Promise<MessageResponse | void> => {
  const res = await sendToActiveTab({
    src: "BACKGROUND",
    dst: "CONTENT",
    method: "PUT",
    path: "/editor/insert-text",
    data: { text },
  });

  return res;
};

const updateEditorStatus = async (
  venderName: string,
  status: EditorStatus,
): Promise<void> => {
  await repository.update(venderName, status);

  await sendMessage({
    src: "BACKGROUND",
    dst: "POPUP",
    method: "PUT",
    path: "/editor/insert-text",
    data: { venderName, status },
  });
};

export const service = {
  getEditorStatus,
  insertText,
  updateEditorStatus,
};
