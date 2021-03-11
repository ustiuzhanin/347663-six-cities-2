import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../../utils/PrivateRoute.jsx";
import Home from "../home/home.jsx";
import AuthPage from "../auth-page/auth-page.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import Profile from "../profile/profile.jsx";
import ErrorPage from "../error-page/error-page.jsx";

import { Operations } from "../../reducer/auth/auth";
import { Operations as UserOperaions } from "../../reducer/user/user";

const App = (props) => {
  const {
    autoAuth,
    isAuthorizationRequired,
    user,
    getUser,
    errorMessage,
  } = props;

  useEffect(() => {
    autoAuth();
  }, []);

  useEffect(() => {
    if (!isAuthorizationRequired) {
      getUser(user.userId);
    }
  }, [isAuthorizationRequired]);

  if (Object.entries(errorMessage).length !== 0) {
    return (
      <Route exact render={() => <ErrorPage error={errorMessage.err} />} />
    );
  }

  return (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/login" exact render={() => <AuthPage method="Login" />} />
      <Route
        path="/signup"
        exact
        render={() => <AuthPage method="Sign up" />}
      />
      <Route path="/offer/:id" exact component={OfferPage} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <Route exact component={ErrorPage} />
    </Switch>
  );
};

App.propTypes = {
  autoAuth: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    userId: PropTypes.string,
    email: PropTypes.string,
    bookmarks: PropTypes.array,
  }),
  errorMessage: PropTypes.object,
};

const mapStateToProps = () => (state, ownProps) =>
  Object.assign({}, ownProps, {
    errorMessage: state.errors.errorMessage,
    isAuthorizationRequired: state.auth.isAuthorizationRequired,
    user: state.auth.user,
  });

const mapDispatchToProps = (dispatch) => ({
  autoAuth: () => {
    dispatch(Operations.autoAuth());
  },
  getUser: (id) => {
    dispatch(UserOperaions.getUser(id));
  },
});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
