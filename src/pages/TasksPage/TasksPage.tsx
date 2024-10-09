// import { TasksColumn } from "../../components/TasksColumn";
// import { Status, statusEnum } from "../../models/task.model";
// import classes from "./tasks-page.module.scss";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { TasksColumn } from "../../components/TasksColumn";
import { Task } from "../../components/Task";

interface Task {
  id: string;
  content: string;
  status: "pending" | "in-progress" | "completed";
}

const initialTasks: Task[] = [
  { id: "1", content: "Task 1", status: "pending" },
  { id: "2", content: "Task 2", status: "in-progress" },
  { id: "3", content: "Task 3", status: "completed" },
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* Pending Tasks */}
        <TasksColumn id="pending" type="pending">
          {tasks
            .filter((task) => task.status === "pending")
            .map((task) => (
              <Task key={task.id} id={task.id} content={task.content} />
            ))}
        </TasksColumn>

        {/* In Progress Tasks */}
        <TasksColumn id="in-progress" type="in progress">
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <Task key={task.id} id={task.id} content={task.content} />
            ))}
        </TasksColumn>

        {/* Completed Tasks */}
        <TasksColumn id="completed" type="completed">
          {tasks
            .filter((task) => task.status === "completed")
            .map((task) => (
              <Task key={task.id} id={task.id} content={task.content} />
            ))}
        </TasksColumn>
      </div>
    </DndContext>
  );

  // return (
  //   <div className={classes.container}>
  //     {statusEnum.map((status, index) => (
  //       <TasksColumn type={status as unknown as Status} key={status + index} />
  //     ))}
  //   </div>
  // );
};

// const getItems = (count: number, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k + offset}-${new Date().getTime()}`,
//     content: `item ${k + offset}`,
//   }));

// const reorder = (list: DemoTask[], startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

/**
 * Moves an item from one list to another list.
 */
// const move = (
//   source: DemoTask[],
//   destination: DemoTask[],
//   droppableSource: DraggableLocation,
//   droppableDestination: DraggableLocation
// ) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result: Record<string, DemoTask[]> = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };
// const grid = 8;

// const getItemStyle = (
//   isDragging: boolean,
//   draggableStyle: DraggingStyle | NotDraggingStyle | undefined
// ): CSSProperties | undefined => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });
// const getListStyle = (isDraggingOver: boolean) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

// function QuoteApp() {
//   const [state, setState] = useState([getItems(10), getItems(5, 10)]);

//   function onDragEnd(result) {
//     const { source, destination } = result;

//     // dropped outside the list
//     if (!destination) {
//       return;
//     }
//     const sInd = +source.droppableId;
//     const dInd = +destination.droppableId;

//     if (sInd === dInd) {
//       const items = reorder(state[sInd], source.index, destination.index);
//       const newState = [...state];
//       newState[sInd] = items;
//       setState(newState);
//     } else {
//       const result = move(state[sInd], state[dInd], source, destination);
//       const newState = [...state];
//       newState[sInd] = result[sInd];
//       newState[dInd] = result[dInd];

//       setState(newState.filter((group) => group.length));
//     }
//   }

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={() => {
//           setState([...state, []]);
//         }}
//       >
//         Add new group
//       </button>
//       <button
//         type="button"
//         onClick={() => {
//           setState([...state, getItems(1)]);
//         }}
//       >
//         Add new item
//       </button>
//       <div style={{ display: "flex" }}>
//         <DragDropContext onDragEnd={onDragEnd}>
//           {state.map((el, ind) => (
//             <Droppable key={ind} droppableId={`${ind}`}>
//               {(provided, snapshot) => (
//                 <div
//                   ref={provided.innerRef}
//                   style={getListStyle(snapshot.isDraggingOver)}
//                   {...provided.droppableProps}
//                 >
//                   {el.map((item, index) => (
//                     <Draggable
//                       key={item.id}
//                       draggableId={item.id}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={getItemStyle(
//                             snapshot.isDragging,
//                             provided.draggableProps.style
//                           )}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-around",
//                             }}
//                           >
//                             {item.content}
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 const newState = [...state];
//                                 newState[ind].splice(index, 1);
//                                 setState(
//                                   newState.filter((group) => group.length)
//                                 );
//                               }}
//                             >
//                               delete
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </DragDropContext>
//       </div>
//     </div>
//   );
// }
