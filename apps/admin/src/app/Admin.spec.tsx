import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Admin from './Admin';

describe('Admin', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<Admin />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<Admin />);
    expect(getByText('Welcome to admin!')).toBeTruthy();
  });
});
