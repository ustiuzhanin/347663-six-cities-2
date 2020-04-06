import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Operations} from '../../reducer/comments/comments';
import PropTypes from 'prop-types';

/* eslint-disable camelcase*/

const Comments = (props) => {
  const {id, getComments, comments} = props;
  useEffect(() => {
    getComments(id);
  }, []);

  return (
    <>
      <h2 className='reviews__title'>
        Reviews &middot;{' '}
        <span className='reviews__amount'>{comments.length}</span>
      </h2>

      <ul className='reviews__list'>
        {comments.map((comment, i) => {
          const date = new Date(comment.date);
          const month = date.toLocaleString('default', {month: 'long'});
          const year = date.getFullYear();

          return (
            <li key={i} className='reviews__item'>
              <div className='reviews__user user'>
                <div
                  className={`reviews__avatar-wrapper user__avatar-wrapper ${comment
                    .user.is_pro && 'user__avatar-wrapper--pro'}`}
                >
                  <img
                    className='reviews__avatar user__avatar'
                    src={comment.user.avatar_url}
                    width='54'
                    height='54'
                    alt='Reviews avatar'
                  />
                </div>
                <span className='reviews__user-name'>{comment.user.name}</span>
              </div>
              <div className='reviews__info'>
                <div className='reviews__rating rating'>
                  <div className='reviews__stars rating__stars'>
                    <span
                      style={{width: `${(comment.rating / 5) * 100}%`}}
                    ></span>
                    <span className='visually-hidden'>Rating</span>
                  </div>
                </div>
                <p className='reviews__text'>{comment.comment}</p>
                <time className='reviews__time' dateTime='2019-04-24'>
                  {month} {year}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        is_pro: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export {Comments};

const mapStateToProps = (state) =>
  Object.assign({}, null, {
    comments: state.comments.comments
  });

const mapDispatchToProps = (dispatch) => ({
  getComments: (id) => {
    dispatch(Operations.loadComments(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

/* eslint-enable camelcase*/
