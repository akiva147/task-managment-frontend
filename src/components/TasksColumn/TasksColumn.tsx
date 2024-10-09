import { useDroppable } from "@dnd-kit/core";
import { FormTask, Status, statusEnum, Task } from "../../models/task.model";
import classes from "./tasks-column.module.scss";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { taskService } from "../../services/task.service";
import { Form } from "../Form";
import { useTasksColumn } from "./useTasksColumn";

export interface TasksColumnProps {
  type: (typeof statusEnum)[number];
  id: string;
  children: React.ReactNode;
}

export const TasksColumn = ({ children, id, type }: TasksColumnProps) => {
  const { form, setNodeRef, showModal } = useTasksColumn(id);

  return (
    <div className={classes.container}>
      <header>
        <h2>{type}</h2>
        <Button icon={<PlusOutlined />} onClick={showModal} />
      </header>
      <ul ref={setNodeRef}>{children}</ul>
      <Form
        defaultValues={{
          status: type,
          description: "",
          id: "",
          title: "",
        }}
        variant="create"
        {...form}
      />
    </div>
  );
};
