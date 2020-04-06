import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/* eslint-disable camelcase*/

const ProfileBtn = (props) => {
  const {isAuthorizationRequired, user} = props;
  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <Link
            to={isAuthorizationRequired ? '/login' : '/profile'}
            className='header__nav-link header__nav-link--profile'
          >
            <div className='header__avatar-wrapper user__avatar-wrapper'></div>
            <span className='header__login'>
              {isAuthorizationRequired ? 'Sign in' : user.email}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

ProfileBtn.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    ispro: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = (state) =>
  Object.assign({}, null, {
    user: state.auth.user,
    isAuthorizationRequired: state.auth.isAuthorizationRequired
  });
/* eslint-enable camelcase*/

export {ProfileBtn};

export default connect(mapStateToProps, null)(ProfileBtn);
