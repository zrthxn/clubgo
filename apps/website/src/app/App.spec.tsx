import React from 'react';
import { render, cleanup } from 'react-testing-library';

import WebsiteController from './Website';

describe('App', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<WebsiteController />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<WebsiteController />);
    expect(getByText('Welcome to website!')).toBeTruthy();
  });
});
