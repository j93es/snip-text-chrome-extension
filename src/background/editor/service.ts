import type { EditorStatus } from "../../core/editor-status";
import { sendMessage } from "../../common/message-bus";
import { repository } from "./repository";

const getEditorStatus = async (
  venderName: string,
): Promise<EditorStatus | void> => {
  return (await repository.read(venderName)) ?? undefined;
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
  updateEditorStatus,
};
