// import { CommonModule } from '@angular/common';
// import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FieldComponent } from './field.component';

// export default {
//   title: 'Field',
//   component: FieldComponent,
//   decorators: [
//     moduleMetadata({
//       imports: [CommonModule],
//     }),
//   ],
// } as Meta<FieldComponent>;

// const Template: Story<FieldComponent> = (args: FieldComponent) => ({
//   props: args,
//   template: `<fue-field label="Username"></fue-field>
// `,
// });

// export const Primary = Template.bind({});
// Primary.args = {};

import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<FieldComponent> = {
  title: 'Field',
  component: FieldComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FieldComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<FieldComponent>;

export const Textfield: Story = {
  render: () => ({
    props: { label: 'Username' },
  }),
};

export const Textarea: Story = {
  render: () => ({
    props: { label: 'Username', inputType: 'textarea' },
  }),
};
