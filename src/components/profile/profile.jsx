import React, { useEffect } from "react";

import Header from "../header/header.jsx";
import { Operations } from "../../reducer/user/user";

import { connect } from "react-redux";

const Profile = (props) => {
  const { userAuth, getUser, user } = props;
  const { avatar_url, name, is_pro, email, offers, bookmarks } = props.user;

  useEffect(() => {
    userAuth.userId && getUser(userAuth.userId);
  }, [userAuth]);

  return (
    <>
      <Header />
      <section className="profile">
        <div className="dd">
          <pre>{JSON.stringify(userAuth, null, 4)}</pre>
        </div>
        {user && (
          <div className="property__avatar-wrapper user__avatar-wrapper property__avatar-wrapper--pro">
            <img
              className="property__avatar user__avatar"
              src={avatar_url}
              width="74"
              height="74"
              alt="Host avatar"
            ></img>
            <span className="property__user-name">{name}</span>
            {is_pro && <span className="property__user-status">{is_pro}</span>}
            <span className="property__user-name">{email}</span>
            <div className="offers">
              <h2>Your listings</h2>
              <ul>
                {offers && offers.length > 0 ? (
                  offers.map((offer) => <li>{offer}</li>)
                ) : (
                  <p>No listings yet</p>
                )}
              </ul>
            </div>
            <div className="bookmarks">
              <h2>Your bookmarks</h2>
              <ul>
                {bookmarks && bookmarks.length > 0 ? (
                  bookmarks.map((bookmark) => <li>{bookmark}</li>)
                ) : (
                  <p>No bookmarks yet</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

const mapStateToProps = () => (state, ownProps) =>
  Object.assign({}, ownProps, {
    userAuth: state.auth.user,
    user: state.user.user,
  });

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => {
    dispatch(Operations.getUser(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
