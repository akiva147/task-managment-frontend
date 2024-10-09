import classes from "./single-task.module.scss";
import { Form } from "../Form";
import { Task } from "../../models/task.model";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useSingleTask } from "./useSingleTask";

export interface SingleTaskProps {
  task: Task;
}

export const SingleTask = ({ task }: SingleTaskProps) => {
  const {
    dnd: { attributes, listeners, setNodeRef, transform },
    form,
    handleDelete,
    showModal,
  } = useSingleTask(task);

  const { description } = task;

  return (
    <div
      className={classes.container}
      ref={setNodeRef}
      style={{
        transform: `translate3d(${transform?.x ?? 0}px, ${
          transform?.y ?? 0
        }px, 0)`,
      }}
      {...listeners}
      {...attributes}
    >
      <main>
        <li>{description}</li>
        <div className={classes.buttons}>
          <Button icon={<PlusOutlined />} onClick={showModal} />
          <Button icon={<MinusOutlined />} onClick={handleDelete} />
        </div>
      </main>
      <Form defaultValues={task} variant="edit" {...form} />
    </div>
  );
};
