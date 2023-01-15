import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes } from "./router";
import DashboardView from "./views/overview";
import SignInWeb from "./views/sign-in";
import SignUpWeb from "./views/sign-up";
import NotFoundView from "./views/not-found";
import ProjectDetail from "./views/project-detail";
import { useAppSelector } from "./app/hooks";

function App() {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={Routes.INDEX}>
            {user && <DashboardView />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!user && <SignInWeb />}
            {user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.SIGN_UP}>
            {!user && <SignUpWeb />}
            {user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.PROJECT_DETAIL}/:id`}>
            {user && <ProjectDetail />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={Routes.NOT_FOUND}>
            <NotFoundView />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
