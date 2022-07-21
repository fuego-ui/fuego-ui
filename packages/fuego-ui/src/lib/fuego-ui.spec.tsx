import { render } from '@testing-library/react';

import FuegoUi from './fuego-ui';

describe('FuegoUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FuegoUi />);
    expect(baseElement).toBeTruthy();
  });
});
