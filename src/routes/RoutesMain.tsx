import { Route, Routes } from "react-router-dom";
import { App } from "../App";
import { Search } from "../components/Search";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}