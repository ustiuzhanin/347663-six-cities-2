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
    <li className="header__nav-item user">
      <button
        className="header__nav-link header__nav-link--btn"
        type="button"
        onClick={logoutClickHandler}
      >
        <div className="header__nav-link--logout"></div>
        <div className="visually-hidden">Logout</div>
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => {
    dispatch(ActionCreator.logoutUser());
    dispatch(ActionCreator.requireAuthorization(true));
  },
});

export default connect(null, mapDispatchToProps)(logoutBtn);
