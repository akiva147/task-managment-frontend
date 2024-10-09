import { useDroppable } from "@dnd-kit/core";
import { message } from "antd";
import { useState } from "react";
import { FormTask } from "../../models/task.model";
import { taskService } from "../../services/task.service";
import { useQueryClient } from "@tanstack/react-query";

export const useTasksColumn = (_id: string) => {
  const queryClient = useQueryClient();

  const { setNodeRef } = useDroppable({
    id: _id,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: FormTask) => {
    setIsModalOpen(false);
    try {
      await taskService.create(data);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      console.log("Task created successfully");
    } catch (error) {
      message.error({
        content: "Edit failed",
      });
      console.error("Edit failed", error);
    }
  };

  return {
    form: {
      isModalOpen,
      handleCancel,
      onSubmit,
    },
    showModal,
    setNodeRef,
  };
};
