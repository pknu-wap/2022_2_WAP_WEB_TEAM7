import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Header from './layout/header/Header';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          <Route path="/menu" component={Menu}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;