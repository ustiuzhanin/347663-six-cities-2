import React, { useState } from "react";
import Header from "../header/header.jsx";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Operations } from "../../reducer/auth/auth";

const Login = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthorizationRequired, method } = props;

  const onFormSubmit = (event) => {
    event.preventDefault();
    const { requestSignUp, requestLogin } = props;

    return method === "Sign up"
      ? requestSignUp(email, password, name)
      : requestLogin(email, password);
  };

  if (!isAuthorizationRequired) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div style={{ display: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            ></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            ></path>
          </symbol>
        </svg>
      </div>

      <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">{method}</h1>
              <form
                className="login__form form"
                action="#"
                method="post"
                onSubmit={(evt) => onFormSubmit(evt)}
              >
                {method === "Sign up" && (
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Name</label>
                    <input
                      className="login__input form__input"
                      type="text"
                      name="name"
                      placeholder="Name"
                      required=""
                      onChange={(evt) => setName(evt.target.value)}
                    />
                  </div>
                )}
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    onChange={(evt) => setPassword(evt.target.value)}
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                >
                  {method}
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

Login.propTypes = {
  requestSignUp: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) =>
  Object.assign({}, null, {
    isAuthorizationRequired: state.auth.isAuthorizationRequired,
  });

const mapDispatchToProps = (dispatch) => ({
  requestSignUp: (email, password, name) => {
    dispatch(Operations.requestSignUp(email, password, name));
  },
  requestLogin: (email, password) => {
    dispatch(Operations.requestLogin(email, password));
  },
});

export { Login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
