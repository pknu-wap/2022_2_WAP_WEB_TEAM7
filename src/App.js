import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Categories from "./layout/categories/Categories";
import CurrentOrder from "./routes/CurrentOrder";
import PastOrder from "./routes/PastOrder";
import Menu from "./Menu/Menu";
import Home from "./Menu/MenuEdit/Home.js";
import { useCookies } from "react-cookie"; // useCookies import

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["id"]); // 쿠키 훅

  return (
    <Router>
      <div>
        <Categories />
        <Routes>
          <Route path="/" element={<Navigate to="/current_order" />} />
          <Route path="/login" element={<Home />} />
          <Route path="/current_order" element={<CurrentOrder />} />
          <Route path="/past_order" element={<PastOrder />} />
          <Route path="/menu_modify" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
