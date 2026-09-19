import type { EditorStatus } from "../../core/data-types";

const storage: Record<string, EditorStatus> = {
  NAVER: { isEditorRendered: false, text: "" },
  GOOGLE: { isEditorRendered: false, text: "" },
};

const create = async (
  venderName: string,
  data: EditorStatus,
): Promise<EditorStatus> => {
  const key = venderName.toUpperCase();
  storage[key] = { ...storage[key], ...data };

  return storage[key];
};

const readAll = async (): Promise<EditorStatus[]> => {
  return Object.values(storage);
};

const readLen = async (): Promise<number> => {
  return Object.keys(storage).length;
};

const read = async (venderName: string): Promise<EditorStatus | null> => {
  const key = venderName.toUpperCase();
  return storage[key] ? { ...storage[key] } : null;
};

const update = async (
  venderName: string,
  data: Partial<EditorStatus>,
): Promise<EditorStatus | null> => {
  const key = venderName.toUpperCase();
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

const deleteOne = async (venderName: string): Promise<EditorStatus | null> => {
  const key = venderName.toUpperCase();
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
