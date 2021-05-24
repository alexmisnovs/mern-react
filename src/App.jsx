import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
// import Users from "./users/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import Auth from "./users/pages/Auth";
import FindPlace from "./places/pages/FindPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingError/LoadingSpinner";

import AuthContext from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

const App = () => {
  // app state..
  const { token, userId, login, logout } = useAuth();

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
          <FindPlace />
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
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
