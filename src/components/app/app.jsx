import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from "../home/home.jsx";
import Login from "../login/login.jsx";
import OfferPage from "../offer-page/offer-page.jsx";

const App = (props) => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Home key={Math.random()} />} />
      <Route path="/login" exact component={Login} />
      <Route path="/offer/:id" exact component={OfferPage} />
    </Switch>
  );
};

export { App };
export default App;
