import { useDroppable } from "@dnd-kit/core";
import { Status, statusEnum } from "../../models/task.model";
import classes from "./tasks-column.module.scss";

export interface TasksColumnProps {
  type: (typeof statusEnum)[number];
  id: string;
  children: React.ReactNode;
}

export const TasksColumn = ({ children, id, type }: TasksColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div style={{ margin: "16px", flex: 1 }}>
      <h2>{type}</h2>
      <ul
        ref={setNodeRef}
        style={{
          listStyle: "none",
          padding: 0,
          minHeight: "200px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          // padding: "16px",
        }}
      >
        {children}
      </ul>
    </div>
  );
};
