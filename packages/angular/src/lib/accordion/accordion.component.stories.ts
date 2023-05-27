import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { AccordionItemComponent } from './accordion.component';
import { AccordionGroupDirective } from './accordion-group.directive';

const meta: Meta<AccordionItemComponent> = {
  title: 'Accordion',
  component: AccordionItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, AccordionGroupDirective],
    }),
    // With template
    // componentWrapperDecorator(
    //   (story) => `<div style="margin: 3em">${story}</div>`
    // ),
    // // With component which contains ng-content
    // componentWrapperDecorator(Parent),
  ],
};

export default meta;
type Story = StoryObj<AccordionItemComponent>;

export const Default: Story = {
  render: () => ({
    props: { title: 'Accordion Heading', content: `Content` },
    template: `<accordion-item [title]="title">{{content}}</accordion-item>`,
  }),
};

export const AccordionGroup: Story = {
  render: () => ({
    props: { title: 'Accordion Heading', content: `Content` },
    template: `<accordion-group>
    <accordion-item [title]="title">{{content}}</accordion-item>
    <accordion-item [title]="title">{{content}}</accordion-item></accordion-group>`,
  }),
};
