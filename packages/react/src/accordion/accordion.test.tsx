import {
  render,
  cleanup,
  waitForElementToBeRemoved,
  queryByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';
window.scrollTo = jest.fn();

test('Expands Accordion on Click when closed', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Accordion label="Accordion Item">
      <span>Accordion Content</span>
    </Accordion>
  );
  await user.click(container.querySelector('button') as Element);
  const accordionPanel = container.querySelector('.accordion-panel');
  expect(accordionPanel).toBeTruthy();
  cleanup();
});

test('Collapses Accordion on Click when open', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Accordion label="Accordion Item" expanded={true}>
      <span>Accordion Content</span>
    </Accordion>
  );
  await user.click(container.querySelector('button') as Element);
  await waitForElementToBeRemoved(queryByText(container, 'Accordion Content'));
  const accordionPanel = container.querySelector('.accordion-panel');
  expect(accordionPanel).toBeFalsy();
  cleanup();
});

test('collapsed by default', async () => {
  const { container } = render(
    <Accordion label="Accordion Item 2">
      <span>Accordion Content</span>
    </Accordion>
  );
  expect(queryByText(container, 'Accordion Content')).toBeFalsy();
  cleanup();
});

test('title is rendered in accordion button', () => {
  const title = 'Accordion Item 2';
  const { container } = render(
    <Accordion label={title} expanded={true}>
      <span>Accordion Content</span>
    </Accordion>
  );

  const button = container.querySelector('button');
  const hasText = button?.innerHTML.includes(title);
  expect(hasText).toBeTruthy();
  cleanup();
});

test('Children is rendered in accordion panel', () => {
  const children = <span>Accordion Content</span>;
  const { container } = render(
    <Accordion label="Accordion Item" expanded={true}>
      {children}
    </Accordion>
  );

  const accordionPanel = container.querySelector('.accordion-panel');
  const innerDiv = accordionPanel?.firstChild as HTMLElement;
  expect(innerDiv.querySelector('span')).toBeTruthy();
  cleanup();
});
