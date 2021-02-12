import React from "react";

import Header from "../header/header.jsx";

import { connect } from "react-redux";

const Profile = (props) => {
  const { user } = props;
  return (
    <>
      <Header></Header>
      <section className="profile">
        qq
        <div className="dd">{JSON.stringify(user)}</div>
      </section>
    </>
  );
};

const mapStateToProps = () => (state, ownProps) =>
  Object.assign({}, ownProps, {
    user: state.auth.user,
  });

export default connect(mapStateToProps, null)(Profile);
