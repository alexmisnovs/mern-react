import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
import Users from "./users/pages/Users";
import AuthContext from "./shared/context/auth-context";

const App = () => {
  // app state..
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);
  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/place/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Redirect to="/users" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/" exact>
          <div className="App">
            <h1>Whatsaaapp</h1>
          </div>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
