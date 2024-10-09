import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { TasksColumn } from "../../components/TasksColumn";
import { SingleTask } from "../../components/Task";
import { statusEnum, Task } from "../../models/task.model";
import classes from "./tasks-page.module.scss";

const initialTasks: Task[] = [
  { id: "1", description: "Task 1", title: "dsfsdfs", status: "pending" },
  { id: "2", description: "Task 2", title: "dfds", status: "in progress" },
  { id: "3", description: "Task 3", status: "completed", title: "dfds" },
];

export interface TasksPageProps {}

export const TasksPage = (props: TasksPageProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);
    const overStatus = over.id as Task["status"]; // "pending", "in-progress", "completed"

    // Move task to the new status (column)
    const updatedTasks = [...tasks];
    updatedTasks[activeTaskIndex].status = overStatus;

    setTasks(updatedTasks);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={classes.container}>
        {statusEnum.map((status) => (
          <TasksColumn key={status} id={status} type={status}>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <SingleTask key={task.id} task={task} />
              ))}
          </TasksColumn>
        ))}
      </div>
    </DndContext>
  );
};
