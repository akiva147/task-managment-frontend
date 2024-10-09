import { useLocation, useNavigate } from "react-router";
import classes from "./nav-bar.module.scss";
import { Button } from "antd";
import { useMemo } from "react";
import { routes } from "../../constants/route.const";

export interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <header className={classes.container}>
      <section className={classes.pages}>{navButtons}</section>
    </header>
  );
};
