import React from 'react';
import {Comments} from './comments.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

/* eslint-disable camelcase*/

test(`Comments's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Comments
      id={'1'}
      comments={[
        {
          id: 1,
          user: {
            id: 10,
            is_pro: true,
            name: 'Max',
            avatar_url:
              'https://htmlacademy-react-2.appspot.com/six-cities/static/avatar/1.jpg'
          },
          rating: 4,
          comment:
            'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
          date: '2020-03-19T00:32:20.983Z'
        }
      ]}
      getComments={jest.fn()}
    />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
/* eslint-enable camelcase*/
