import type { EditorStatus, EditorVendorName } from "../../core/data-types";
import type { MessageResponse } from "../../core/message-types";
import { repository } from "./repository";
import { sendToActiveTab } from "../../common/message-bus";

const getEditorStatus = async (
  venderName: EditorVendorName,
): Promise<EditorStatus | void> => {
  return (await repository.read(venderName)) ?? undefined;
};

const updateEditorStatus = async (
  venderName: EditorVendorName,
  status: EditorStatus,
): Promise<EditorStatus | void> => {
  const res = await repository.update(venderName, status);
  if (!res) {
    return;
  }

  return res;
};

const insertText = async (text: string): Promise<MessageResponse | void> => {
  const response = await sendToActiveTab({
    src: "BACKGROUND",
    dst: "CONTENT",
    path: "/editor/insert-text",
    method: "PUT",
    data: { text },
  });

  return response;
};

// backend api에서 커멘드 목록 불러오기
const command: Record<string, string> = {
  "\\1": "template1",
  "\\2": "template2",
  "\\3": "template3",
};
const commandInsertTemplate = async (
  venderName: EditorVendorName,
): Promise<MessageResponse | void> => {
  const data = await repository.read(venderName);

  if (!data) {
    return;
  }

  let matchedKey = null;
  for (let key in command) {
    if (data.text.startsWith(key)) {
      matchedKey = key;
      break;
    }
  }

  if (!matchedKey) {
    return;
  }

  const response = await sendToActiveTab({
    src: "BACKGROUND",
    dst: "CONTENT",
    path: "/editor/insert-text",
    method: "PUT",
    data: { text: command[matchedKey] },
  });

  return response;
};

export const service = {
  getEditorStatus,
  updateEditorStatus,
  insertText,
  commandInsertTemplate,
};
