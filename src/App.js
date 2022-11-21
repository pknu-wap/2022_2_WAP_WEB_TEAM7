import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Menu from "./Menu/Menu.js";
import Header from "./Header";
function App() {
  return (
    <header>
      <Router>
        <Header />
        <Switch>
          <Route path={"/menu"}>
            <Menu />
          </Route>
          <Route path={"/album"}>
            <Album />
          </Route>
          <Route path={"/pricing"}>
            <Pricing />
          </Route>
          <Route path={"/"}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </header>
  );
}

function Home() {
  return <h1>Home</h1>;
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
