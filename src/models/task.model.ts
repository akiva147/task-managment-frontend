import { DefaultOptionType } from "antd/es/select";
import { z } from "zod";

export const statusEnum = ["pending", "in progress", "completed"] as const;

export const statusOptions: DefaultOptionType[] = [
  {
    label: statusEnum[0],
    value: statusEnum[0],
    title: statusEnum[0],
  },
  {
    label: statusEnum[1],
    value: statusEnum[1],
    title: statusEnum[1],
  },
  {
    label: statusEnum[2],
    value: statusEnum[2],
    title: statusEnum[2],
  },
];
export type Status = typeof statusEnum;

export const TaskSchema = z.object({
  title: z.string(),
  id: z.string(),
  description: z.string(),
  status: z.enum(statusEnum),
});

export const FormTaskSchema = TaskSchema.omit({
  id: true,
});

export type FormTask = z.infer<typeof FormTaskSchema>;
export type Task = z.infer<typeof TaskSchema>;
