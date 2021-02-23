import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { ActionCreator as AuthActionCreator } from "../../reducer/auth/auth";
import { ActionCreator } from "../../reducer/user/user";

const LogoutBtn = (props) => {
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

LogoutBtn.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => {
    dispatch(AuthActionCreator.logoutUser());
    dispatch(ActionCreator.clearUser());
    dispatch(AuthActionCreator.requireAuthorization(true));
  },
});

export default connect(null, mapDispatchToProps)(LogoutBtn);
