import { Route, Routes } from "react-router";
import { MainPage } from "../pages/main/main";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
