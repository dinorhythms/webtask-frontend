import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Add from "./Add";
import Update from "./Update";

function App() {

	return (
    <Router>
      <Switch>
        <Route exact path="/" component={Add}/>
        <Route path="/update/:id" component={Update}/>
      </Switch>
    </Router>
	);
}

export default App;
