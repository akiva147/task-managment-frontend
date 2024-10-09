import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { taskService } from "../../services/task.service";
import { FormTask, Task } from "../../models/task.model";
import { message } from "antd";

export const useSingleTask = (task: Task) => {
  const { id } = task;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: Task | FormTask) => {
    // uncomment for debug purposes
    // console.log("onSubmit  data:", data);
    setIsModalOpen(false);
    try {
      await taskService.edit(data);
    } catch (error) {
      message.error({
        content: "Edit failed",
      });
      console.error("Edit failed", error);
    }
  };
  const handleDelete = async () => {
    // uncomment for debug purposes
    // console.log("handleDelete  data:", data);

    try {
      await taskService.delete(id);
    } catch (error) {
      message.error({
        content: "Delete failed",
      });
      console.error("Delete failed", error);
    }
  };

  return {
    form: {
      handleCancel,
      onSubmit,
      isModalOpen,
    },
    dnd: {
      attributes,
      listeners,
      setNodeRef,
      transform,
    },
    showModal,
    handleDelete,
  };
};
