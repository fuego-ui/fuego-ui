import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { AccordionComponent } from './accordion.component';
import { AccordionModule } from './accordion.module';

export default {
  title: 'Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, AccordionModule],
    }),
  ],
} as Meta<AccordionComponent>;

const Template: Story<AccordionComponent> = (args: AccordionComponent) => ({
  props: args,
  template: `
  <fue-accordion>
    <fue-accordion-header>Header</fue-accordion-header>
    <fue-accordion-content><p>Content!</p></fue-accordion-content>
  </fue-accordion>
`,
});

export const Primary = Template.bind({});
Primary.args = {};
