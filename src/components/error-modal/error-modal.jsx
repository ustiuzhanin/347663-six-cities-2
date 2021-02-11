import React from "react";
import PropTypes from "prop-types";

const ModalError = (props) => {
  const { error } = props;

  return (
    <section className="modal">
      <h2 className="modal__title">An error occurred!</h2>
      <p className="modal__text">
        {error.response &&
          `Status: ${error.response.status} ${error.response.statusText}`}
        <br />
        {error.message}
        <br />
        Please reload the page
      </p>
    </section>
  );
};

ModalError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    response: PropTypes.shape({
      statusText: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ModalError;
export { ModalError };
