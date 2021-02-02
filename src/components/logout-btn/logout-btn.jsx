import React from "react";

import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/auth/auth";

const logoutBtn = (props) => {
  const logoutClickHandler = () => {
    const { logoutUser } = props;

    localStorage.removeItem("token");
    logoutUser();
  };

  return (
    <button type="button" onClick={logoutClickHandler}>
      Logout
    </button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => {
    dispatch(ActionCreator.logoutUser());
    dispatch(ActionCreator.requireAuthorization(true));
  },
});

export default connect(null, mapDispatchToProps)(logoutBtn);
