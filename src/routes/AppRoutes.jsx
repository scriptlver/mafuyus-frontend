import { Routes, Route } from "react-router-dom";
import CardsList from "../pages/CardsList/CardsList";
import Home from "../pages/Home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cardslist" element={<CardsList />} />
    </Routes>
  );
};

export default AppRoutes;