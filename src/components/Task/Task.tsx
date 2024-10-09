import { useDraggable } from "@dnd-kit/core";
import classes from "./task.module.scss";

export interface TaskProps {
  id: string;
  content: string;
}

export const Task = ({ content, id }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    padding: "16px",
    marginBottom: "8px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {content}
    </li>
  );
};
