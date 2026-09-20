import type { EditorStatus } from "../../core/data-types";
import type { EditorVendorName } from "../../core/data-types";

const storage: Record<EditorVendorName, EditorStatus> = {
  NAVER: { isEditorRendered: false, text: "" },
  GOOGLE: { isEditorRendered: false, text: "" },
};

const create = async (
  venderName: EditorVendorName,
  data: EditorStatus,
): Promise<EditorStatus> => {
  const key = venderName;
  storage[key] = { ...storage[key], ...data };

  return storage[key];
};

const readAll = async (): Promise<EditorStatus[]> => {
  return Object.values(storage);
};

const readLen = async (): Promise<number> => {
  return Object.keys(storage).length;
};

const read = async (venderName: EditorVendorName): Promise<EditorStatus> => {
  const key = venderName;
  return storage[key]
    ? { ...storage[key] }
    : { isEditorRendered: false, text: "" };
};

const update = async (
  venderName: EditorVendorName,
  data: Partial<EditorStatus>,
): Promise<EditorStatus | null> => {
  const key = venderName;
  if (!storage[key]) {
    return null;
  }

  const updated: EditorStatus = {
    ...storage[key],
    ...data,
  };

  storage[key] = updated;
  return updated;
};

const deleteOne = async (
  venderName: EditorVendorName,
): Promise<EditorStatus | null> => {
  const key = venderName;
  if (!storage[key]) {
    return null;
  }

  const deleted = { ...storage[key] };
  delete storage[key];

  return deleted;
};

export const repository = {
  create,
  readAll,
  readLen,
  read,
  update,
  deleteOne,
};
