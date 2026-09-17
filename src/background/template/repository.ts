import type { TemplateScheme } from "./template-scheme";

const storage: TemplateScheme[] = [];

const create = async (data: TemplateScheme): Promise<TemplateScheme> => {
  storage.push(data);

  return data;
};

const readAll = async (): Promise<TemplateScheme[]> => {
  return storage;
};

const readLen = async (): Promise<number> => {
  return storage.length;
};

const read = async (id: string): Promise<TemplateScheme | null> => {
  const index = storage.findIndex((item) => item.id === id);
  return index === -1 ? null : storage[index];
};

const update = async (
  id: string,
  data: Partial<TemplateScheme>,
): Promise<TemplateScheme | null> => {
  const index = storage.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const current = storage[index];
  const updated: TemplateScheme = {
    ...current,
    ...data,
    id: current.id,
    modTime: new Date(),
  };

  storage[index] = updated;
  return updated;
};

const deleteOne = async (id: string): Promise<TemplateScheme | null> => {
  const index = storage.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [deleted] = storage.splice(index, 1);
  return deleted ?? null;
};

export const repository = {
  create,
  readAll,
  readLen,
  read,
  update,
  deleteOne,
};
