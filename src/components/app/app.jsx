import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from "../home/home.jsx";
import Signup from "../signup/signup.jsx";
import OfferPage from "../offer-page/offer-page.jsx";

const App = (props) => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Home key={Math.random()} />} />
      <Route path="/login" exact render={() => <Signup method="Login" />} />
      <Route path="/signup" exact render={() => <Signup method="Sign up" />} />
      <Route path="/offer/:id" exact component={OfferPage} />
    </Switch>
  );
};

export { App };
export default App;
