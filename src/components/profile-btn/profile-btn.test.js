import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {ProfileBtn} from './profile-btn.jsx';
/* eslint-disable camelcase*/

test(`ProfileBtn's Snapshot`, () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <ProfileBtn
          isAuthorizationRequired={true}
          user={{
            avatar_url: '/222/',
            email: 'ww@gg.com',
            id: 3,
            ispro: 'no',
            name: 'qwe erd'
          }}
        />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
/* eslint-enable camelcase*/
