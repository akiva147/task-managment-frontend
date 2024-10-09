import { FormTask, Task, TaskSchema } from "../models/task.model";
import { axiosInstance } from "./index.service";

const PREFIX = "task";

class TaskService {
  async getAll() {
    try {
      const result = (await axiosInstance.get<Task[]>(`${PREFIX}`)).data;

      const tasks = TaskSchema.array().parse(result);

      return tasks;
    } catch (error) {
      throw new Error("Failed to fetch property listings");
    }
  }
  async edit(task: Task | FormTask) {
    try {
      if (!("_id" in task)) throw new Error("Task _id is undefined");
      const response = await axiosInstance.put(`/${PREFIX}/${task._id}`, task);
      return response.data;
    } catch (e) {
      throw new Error("Error updating note");
    }
  }
  async delete(_id: string) {
    try {
      const response = await axiosInstance.delete(`/${PREFIX}/${_id}`);
      return response.data;
    } catch (e) {
      throw new Error("Error updating note");
    }
  }
  async updateAll(tasks: Task[]) {
    try {
      const response = await axiosInstance.put(`/${PREFIX}/save`, tasks);
      return response.data;
    } catch (e) {
      throw new Error("Error updating note");
    }
  }
  async create(task: FormTask) {
    try {
      const response = await axiosInstance.post(`/${PREFIX}`, task);
      return response.data;
    } catch (e) {
      throw new Error("Error updating note");
    }
  }
}

export const taskService = new TaskService();
