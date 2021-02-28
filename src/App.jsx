import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainHeader from "./shared/components/Navigation/MainHeader";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from "./users/pages/Users";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <div className="App">
              <h1>Whatsaaapp</h1>
            </div>
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/places/new">
            <NewPlace />
          </Route>

          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
