import { Outlet } from "react-router";
import classes from "./layout.module.scss";
import { NavBar } from "../NavBar";

export interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  return (
    <div className={classes.container}>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
