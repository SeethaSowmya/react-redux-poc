import React from "react";
import { useSelector } from "react-redux";
import Login from "./Components/Login/Login";
import { createBrowserHistory } from "history";

const ProtectedRoute = ({ element: Component }) => {
  const history = createBrowserHistory();
  let loginCheck = useSelector((state) => {
    return state.log;
  });
  if (loginCheck) {
    return <Component />;
  } else {
    history.replace("/");
    return <Login />;
  }
};

export default ProtectedRoute;
