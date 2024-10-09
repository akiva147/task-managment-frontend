import { TasksPage } from "../pages/TasksPage";

export type Route = { title: string; path: string; element: JSX.Element };

export type Routes = Record<string, Route>;

export const defaultRoute = "/tasks";

export const routes: Routes = {
  "/tasks": {
    title: "Tasks",
    path: "/tasks",
    element: <TasksPage />,
  },
};
