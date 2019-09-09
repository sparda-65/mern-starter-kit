import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ActionsList from "./components/actions-list.component";
import EditAction from "./components/edit-action.component";
import CreateAction from "./components/create-action.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={ActionsList} />
        <Route path="/edit/:id"  component={EditAction} />
        <Route path="/create"  component={CreateAction} />
        <Route path="/user"  component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
