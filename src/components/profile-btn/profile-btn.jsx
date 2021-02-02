import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const ProfileBtn = (props) => {
  const { url, title } = props;
  return (
    <li className="header__nav-item user">
      <Link to={url} className="header__nav-link header__nav-link--profile">
        {url === "/profile" && (
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        )}
        <span className="header__login">{title}</span>
      </Link>
    </li>
  );
  // return (
  //   <nav className="header__nav">
  //     <ul className="header__nav-list">
  //       <li className="header__nav-item user">
  //         <Link to={url} className="header__nav-link header__nav-link--profile">
  //           {url === "/profile" && (
  //             <div className="header__avatar-wrapper user__avatar-wrapper"></div>
  //           )}
  //           <span className="header__login">{title}</span>
  //         </Link>
  //       </li>
  //     </ul>
  //   </nav>
  // );
};

ProfileBtn.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ProfileBtn;
