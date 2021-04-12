import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
import Users from "./users/pages/Users";
import AuthContext from "./shared/context/auth-context";

let logoutTimer;

const App = () => {
  // app state..
  const [token, setToken] = useState(false);
  const [appTokenExpirationDate, setAppTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // +1h
    setAppTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token, expiration: tokenExpirationDate.toISOString() })
    );
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(false);
    setAppTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  // check local storage for login info
  // sadly shit will still load since useEffect loads after content first time.
  // Could manage the isLoading stage and display a loading screen
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.expiration);
    }
  }, [login]);
  // auto logout, not sure if thats a good practice really but ok
  useEffect(() => {
    if (token && appTokenExpirationDate) {
      const tokenRemainingTime = appTokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, tokenRemainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, appTokenExpirationDate]);

  let routes;
  if (token) {
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
      value={{ isLoggedIn: !!token, token, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
