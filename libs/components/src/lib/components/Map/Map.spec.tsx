import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Map from './Map';

describe(' Map', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<Map />);
    expect(baseElement).toBeTruthy();
  });
});
