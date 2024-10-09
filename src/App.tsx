import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { TasksPage } from "./pages/TasksPage";
import { RootErrorBoundary } from "./components/RootErrorBoundary";
import { defaultRoute } from "./constants/route.const";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<RootErrorBoundary />}>
        <Route index element={<Navigate to={defaultRoute} />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
