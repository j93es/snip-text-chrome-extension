import type { EditorStatus } from "../../core/editor-status";
import type { MessageResponse } from "../../core/message-types";
import { MessageBus } from "../../common/message-bus";
import { repository } from "./repository";

const bus = new MessageBus("BACKGROUND");

const getEditorStatus = async (
  venderName: string,
): Promise<EditorStatus | void> => {
  return (await repository.read(venderName)) ?? undefined;
};

const insertText = async (
  venderName: string,
  text: string,
): Promise<MessageResponse | void> => {
  const res = await bus.send({
    src: "BACKGROUND",
    dst: "CONTENT",
    method: "PUT",
    path: "/editor/insert-text",
    data: { venderName, text },
  });

  return res;
};

const updateEditorStatus = async (
  venderName: string,
  status: EditorStatus,
): Promise<void> => {
  await repository.update(venderName, status);

  await bus.send({
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
