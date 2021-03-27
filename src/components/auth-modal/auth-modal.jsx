import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ActionCreator } from "../../reducer/auth/auth";

const AuthModal = (props) => {
  const { closePopup } = props;
  return (
    <article className="auth-popup">
      <div className="auth-popup__wrapper">
        <button className="auth-popup__btn--close" onClick={() => closePopup()}>
          <span className="visually-hidden">close</span>
        </button>

        <h2 className="auth-popup__title">
          You need to be logged in to use this functionality!
        </h2>

        <Link
          className="auth-popup__btn"
          to={"/login"}
          onClick={() => closePopup()}
        >
          Login
        </Link>
        <Link
          className="auth-popup__btn"
          to={"/signup"}
          onClick={() => closePopup()}
        >
          Sign Up
        </Link>
      </div>
    </article>
  );
};

AuthModal.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    popupModal: state.auth.popupModal,
  });

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(ActionCreator.togglePopup());
  },
});

export { AuthModal };

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
