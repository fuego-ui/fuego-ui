import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('Html selector will switch to an anchor tag when an href prop is present', () => {
    const { container } = render(
      //   <ThemeProvider theme={minimalButtonTheme}>
      <Button href="https://unbyte.io">Button</Button>
      //   </ThemeProvider>
    );

    expect(container.querySelector('a')).toBeTruthy();
  });

  it('Html selector will switch to an anchor tag when as prop is set', () => {
    const { container } = render(
      <Button clasName="bg-primary text-primary-content" as="a">
        Button
      </Button>
    );

    expect(container.querySelector('a')).toBeTruthy();
  });

  //   it('Defaults to primary level, when no level provided', () => {
  //     const { getByText } = render(
  //       <ThemeProvider theme={minimalButtonTheme}>
  //         <Button>Button</Button>
  //       </ThemeProvider>
  //     );

  //     expect(getByText('Button')).toHaveStyle({
  //       borderRadius: '1rem',
  //     });
  //   });

  //   it('Correctly renders 3rd party library link, I.E Next.js Link', () => {
  //     const thirdPartyLink = ({ href }) => <div data-href={href}></div>;
  //     const { container } = render(
  //       <ThemeProvider theme={minimalButtonTheme}>
  //         <Button href="https://unbyte.io">Button</Button>
  //       </ThemeProvider>
  //     );

  //     expect(container.querySelector('a')).toBeTruthy();
  //   });

  it('Fires Event on Click', () => {
    const handleClick = jest.fn();
    const { container } = render(<Button onClick={handleClick}>Button</Button>);

    const button = container.querySelector('button');
    fireEvent(
      button as Element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
