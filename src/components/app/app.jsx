import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from "../home/home.jsx";
import Signup from "../signup/signup.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import Profile from "../profile/profile.jsx";
import ErrorModal from "../error-modal/error-modal.jsx";
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
