import React from "react";
import Container from "@material-ui/core/Container";

import { useSelector } from "react-redux";

import AppBar from "../../compounds/AppBar";

import Home from "../Home";
import Signin from "../Signin";

export default ({ history }) => {
  const user = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <AppBar history={history} />
      <Container>
        {user.loggedIn ? <Home /> : <Signin history={history} />}
      </Container>
    </React.Fragment>
  );
};
