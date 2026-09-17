import { repository } from "./repository";
import type { TemplateScheme } from "./template-scheme";

const add = async (templateString: string): Promise<TemplateScheme> => {
  const template: TemplateScheme = {
    id: `template-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createTime: new Date(),
    modTime: new Date(),
    template: templateString,
  };

  return await repository.create(template);
};

const get = async (id: string): Promise<TemplateScheme | null> => {
  return await repository.read(id);
};

const getAll = async (): Promise<TemplateScheme[]> => {
  return await repository.readAll();
};

const update = async (data: TemplateScheme): Promise<TemplateScheme | null> => {
  return await repository.update(data.id, data);
};

const remove = async (data: TemplateScheme): Promise<TemplateScheme | null> => {
  return await repository.deleteOne(data.id);
};

export const service = {
  add,
  get,
  getAll,
  update,
  remove,
};
