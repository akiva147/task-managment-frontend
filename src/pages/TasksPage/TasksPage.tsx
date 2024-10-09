import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import { TasksColumn } from "../../components/TasksColumn";
import { SingleTask } from "../../components/Task";
import { statusEnum, Task } from "../../models/task.model";
import classes from "./tasks-page.module.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../../services/task.service";
import { loader } from "../../constants/general.const";
import { message } from "antd";

export interface TasksPageProps {}

export const TasksPage = (props: TasksPageProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await taskService.getAll(),
  });

  // Use data directly from the query
  const tasks = useMemo(() => (data ? data : []), [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskIndex = tasks.findIndex((task) => task._id === active.id);
    const overStatus = over.id as Task["status"];

    // Move task to a new column
    if (tasks[activeTaskIndex].status !== overStatus) {
      const updatedTasks = tasks.map((task) =>
        task._id === active.id ? { ...task, status: overStatus } : task
      );

      // Update the query cache
      queryClient.setQueryData(["tasks"], updatedTasks);
    } else {
      const overTaskIndex = tasks.findIndex((task) => task._id === over.id);
      const columnTasks = tasks.filter(
        (task) => task.status === tasks[activeTaskIndex].status
      );
      const updatedColumnTasks = arrayMove(
        columnTasks,
        activeTaskIndex,
        overTaskIndex
      );

      // Update tasks in the original array
      const updatedTasks = tasks.map(
        (task) => updatedColumnTasks.find((t) => t._id === task._id) || task
      );

      // Update the query cache
      queryClient.setQueryData(["tasks"], updatedTasks);
    }
  };

  if (isLoading || isFetching) return loader;
  if (isError) {
    message.error({
      content: "Error fetching tasks",
      key: "error-fetching-tasks",
    });
    return <></>;
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={classes.container}>
        {statusEnum.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status);
          return (
            <SortableContext
              key={status}
              items={columnTasks.map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              <TasksColumn _id={status} type={status}>
                {columnTasks.map((task) => (
                  <SingleTask key={task._id} task={task} />
                ))}
              </TasksColumn>
            </SortableContext>
          );
        })}
      </div>
    </DndContext>
  );
};
