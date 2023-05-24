import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AccordionItemComponent } from './accordion.component';
export default {
  title: 'Accordion',
  component: AccordionItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta<AccordionItemComponent>;

const Template: Story<AccordionItemComponent> = (
  args: AccordionItemComponent
) => ({
  props: args,
  template: `<accordion-item title="Accordion Heading"><p>Content</p></accordion-item>
`,
});

export const Primary = Template.bind({});
Primary.args = {};
