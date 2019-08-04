import React from 'react';
import { render, cleanup } from 'react-testing-library';

import ClubGo from './ClubGo';

describe('App', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<ClubGo />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<ClubGo />);
    expect(getByText('Welcome to website!')).toBeTruthy();
  });
});
