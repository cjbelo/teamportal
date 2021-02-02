import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./containers/Main";
import Profile from "./containers/Profile";
import ForgotPassword from "./containers/ForgotPassword";
import NotFound from "./containers/NotFound";
import { useDispatch } from "react-redux";

import { GET_USER } from "./reducers/userAction";
import { Get } from "./api";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Get("/user", true).then((res) => {
      if (!res.data.error) {
        dispatch({ type: GET_USER, payload: res.data.userData });
      }
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <div />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route
              exact
              path={["/profile", "/profile/:page"]}
              component={Profile}
            />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      )}
    </React.Fragment>
  );
};

export default App;
