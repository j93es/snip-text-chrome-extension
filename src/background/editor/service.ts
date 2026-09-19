import type { EditorStatus } from "../../core/data-types";
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
};

export const service = {
  getEditorStatus,
  updateEditorStatus,
};
