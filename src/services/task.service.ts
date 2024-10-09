import { FormTask, Task } from "../models/task.model";
import { axiosInstance } from "./index.service";

const PREFIX = "task";

class TaskService {
  async getAll() {
    try {
      return (await axiosInstance.get<Task>(`${PREFIX}`)).data;
    } catch (error) {
      throw new Error("Failed to fetch property listings");
    }
  }
  async edit(task: Task | FormTask) {
    try {
      if (!("id" in task)) throw new Error("Task id is undefined");
      const response = await axiosInstance.put(`/${PREFIX}/:${task.id}`, task);
      return response.data;
    } catch (e) {
      throw new Error("Error updating note");
    }
  }
  async delete(id: string) {
    try {
      const response = await axiosInstance.delete(`/${PREFIX}/:${id}`);
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
