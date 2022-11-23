import React from "react";
import Home from "./Menu/MenuEdit/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Menu from "./Menu/Menu.js";
import Header from "./Header";
function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
        <Routes>
          <Route path={"/menu"} element={<Menu />} />
          <Route path={"/album"} element={<Album />} />
          <Route path={"/pricing"} element={<Pricing />} />
          <Route path={"/"} element={<Home />} />
        </Routes>
      </header>
    </BrowserRouter>
  );
}

function SignIn() {
  return <h1>Sign In</h1>;
}

function Album() {
  return <h1>Album</h1>;
}

function Pricing() {
  return <h1>Pricing</h1>;
}
export default App;
