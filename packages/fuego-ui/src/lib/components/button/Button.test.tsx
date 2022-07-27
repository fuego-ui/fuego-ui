import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button } from './Button';

const minimalButtonTheme = {
  buttons: {
    corners: '',
    primary: {
      bg: '#fff',
      fg: '#000000',
      hfg: '#fff',
      hbg: '#212121',
      accent: '',
    },
    secondary: {
      bg: '#484848',
      fg: '#fff',
      hfg: '#212121',
      hbg: '#fff',
      accent: '',
    },
    tertiary: {
      bg: '#212121',
      fg: '#fff',
      hfg: '#fff',
      hbg: '#212121',
      accent: '#484848',
      haccent: '#fff',
    },
  },
};

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
      <ThemeProvider theme={minimalButtonTheme}>
        <Button as="a">Button</Button>
      </ThemeProvider>
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
    const { container } = render(
      <ThemeProvider theme={minimalButtonTheme}>
        <Button onClick={handleClick}>Button</Button>
      </ThemeProvider>
    );

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
