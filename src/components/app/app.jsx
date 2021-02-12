import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from "../home/home.jsx";
import Signup from "../signup/signup.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import Profile from "../profile/profile.jsx";
import ErrorModal from "../error-modal/error-modal.jsx";
import { Operations } from "../../reducer/auth/auth";

const App = (props) => {
  useEffect(() => {
    const { autoAuth } = props;
    autoAuth();
  }, []);

  const { errorMessage } = props;
  const showMessage = Object.entries(errorMessage).length !== 0 && (
    <ErrorModal error={errorMessage.err} />
  );

  return (
    <Switch>
      {showMessage}
      <Route path="/" exact render={() => <Home key={Math.random()} />} />
      <Route path="/login" exact render={() => <Signup method="Login" />} />
      <Route path="/signup" exact render={() => <Signup method="Sign up" />} />
      <Route path="/offer/:id" exact component={OfferPage} />
      <Route path="/profile" exact component={Profile} />
    </Switch>
  );
};

const mapStateToProps = () => (state, ownProps) =>
  Object.assign({}, ownProps, {
    errorMessage: state.errors.errorMessage,
  });

const mapDispatchToProps = (dispatch) => ({
  autoAuth: () => {
    dispatch(Operations.autoAuth());
  },
});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
