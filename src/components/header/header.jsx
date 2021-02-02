import React from "react";

import ProfileBtn from "../profile-btn/profile-btn.jsx";
import LogoutBtn from "../logout-btn/logout-btn.jsx";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  const { isAuthorizationRequired, user } = props;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link">
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorizationRequired ? (
                <>
                  <ProfileBtn url="/login" title="Login" />
                  <ProfileBtn url="/signup" title="Sign Up" />
                </>
              ) : (
                <>
                  <ProfileBtn url="/profile" title={user.email} />
                  <LogoutBtn />
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) =>
  Object.assign({}, null, {
    user: state.auth.user,
    isAuthorizationRequired: state.auth.isAuthorizationRequired,
  });

export { Header };

export default connect(mapStateToProps, null)(Header);
