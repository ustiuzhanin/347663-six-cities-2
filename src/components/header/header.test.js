import React from 'react';
import Header from './header.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

test(`Login's Snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Header />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
