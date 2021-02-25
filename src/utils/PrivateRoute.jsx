import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthorizationRequired,
  ...rest
}) => {
  const isAuthenticated =
    localStorage.getItem("token") && !isAuthorizationRequired;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
};

const mapStateToProps = () => (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorizationRequired: state.auth.isAuthorizationRequired,
  });

export default connect(mapStateToProps, null)(PrivateRoute);
