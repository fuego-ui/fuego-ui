import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  render: () => ({
    props: { title: 'Accordion Heading', content: `Content` },
    template: `<input type="checkbox" checked="checked" class="checkbox" />`,
  }),
};

// export const AccordionGroup: Story = {
//   render: () => ({
//     props: { title: 'Accordion Heading', content: `Content` },
//     template: `<input type="checkbox" checked="checked" class="checkbox" />`,
//   }),
// };
