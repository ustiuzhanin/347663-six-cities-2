import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from "../home/home.jsx";
import Signup from "../signup/signup.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import { Operations } from "../../reducer/auth/auth";

const App = (props) => {
  useEffect(() => {
    const { autoAuth } = props;
    autoAuth();
  }, []);

  return (
    <Switch>
      <Route path="/" exact render={() => <Home key={Math.random()} />} />
      <Route path="/login" exact render={() => <Signup method="Login" />} />
      <Route path="/signup" exact render={() => <Signup method="Sign up" />} />
      <Route path="/offer/:id" exact component={OfferPage} />
    </Switch>
  );
};

const mapDispatchToProps = (dispatch) => ({
  autoAuth: () => {
    dispatch(Operations.autoAuth());
  },
});

export { App };
export default connect(null, mapDispatchToProps)(App);
