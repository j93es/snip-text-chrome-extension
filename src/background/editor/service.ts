import type { EditorStatus, EditorVendorName } from "../../core/data-types";
import { repository } from "./repository";
import { sendToActiveTab, sendMessage } from "../../common/message-bus";

const getEditorStatus = async (
  vendorName: EditorVendorName,
): Promise<EditorStatus | void> => {
  const res = await repository.read(vendorName);
  if (!res) {
    return;
  }

  return res;
};

const updateEditorStatus = async (
  vendorName: EditorVendorName,
  status: Partial<EditorStatus>,
): Promise<EditorStatus | void> => {
  const res = await repository.update(vendorName, status);
  if (!res) {
    return;
  }

  return res;
};

const addPrevText = async (
  vendorName: EditorVendorName,
  prevText: string,
): Promise<EditorStatus | void> => {
  const res = await repository.appendPrevTexts(vendorName, prevText);
  if (!res) {
    return;
  }

  sendMessage({
    src: "BACKGROUND",
    dst: "POPUP",
    method: "PUT",
    path: "/editor/notify-status",
    data: res,
  });

  return res;
};

const insertText = async (text: string): Promise<EditorStatus | void> => {
  const res = await sendToActiveTab({
    src: "BACKGROUND",
    dst: "CONTENT",
    path: "/editor/insert-text",
    method: "PUT",
    data: { text },
  });
  if (!res) {
    return;
  }

  await repository.update(res.data.vendorName, { text });

  const response = addPrevText(res.data.vendorName, res.data.prevText);
  if (!response) {
    return;
  }

  return response;
};

// backend api에서 커멘드 목록 불러오기
const command: Record<string, string> = {
  "/1": "template1",
  "/2": "template2",
  "/3": "template3",
};
const commandInsertTemplate = async (
  vendorName: EditorVendorName,
): Promise<EditorStatus | void> => {
  const data = await repository.read(vendorName);
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

  const res = await sendToActiveTab({
    src: "BACKGROUND",
    dst: "CONTENT",
    path: "/editor/insert-text",
    method: "PUT",
    data: { text: command[matchedKey] },
  });
  if (!res) {
    return;
  }

  return await getEditorStatus(res.data.vendorName);
};

export const service = {
  getEditorStatus,
  updateEditorStatus,
  addPrevText,
  insertText,
  commandInsertTemplate,
};
