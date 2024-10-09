import { useLocation, useNavigate } from "react-router";
import classes from "./nav-bar.module.scss";
import { Button, message } from "antd";
import { useMemo } from "react";
import { routes } from "../../constants/route.const";
import { taskService } from "../../services/task.service";
import { useQueryClient } from "@tanstack/react-query";
import { Task } from "../../models/task.model";

export interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const data: Task[] | undefined = queryClient.getQueryData(["tasks"]);

  const navButtons = useMemo(() => {
    const pages = Object.values(routes);

    return pages.map(({ path, title }) => {
      const isCurrentPath = path === location.pathname;
      return (
        <Button
          key={path + title}
          variant="link"
          type="link"
          onClick={isCurrentPath ? undefined : () => navigate(path)}
        >
          {isCurrentPath ? <strong>{title}</strong> : title}
        </Button>
      );
    });
  }, [location.pathname, navigate]);

  const saveTasks = async () => {
    try {
      if (!data) throw new Error("No tasks found");
      await taskService.updateAll(data);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      message.success({
        content: "Tasks saved",
      });
    } catch (error) {
      message.error({
        content: "Save failed",
      });
      console.error("Save failed", error);
    }
  };

  return (
    <header className={classes.container}>
      <section className={classes.pages}>{navButtons}</section>
      {location.pathname === "/tasks" && (
        <Button type="primary" onClick={saveTasks}>
          Save
        </Button>
      )}
    </header>
  );
};
