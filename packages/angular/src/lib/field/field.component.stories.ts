import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FieldComponent } from './field.component';

export default {
  title: 'Field',
  component: FieldComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta<FieldComponent>;

const Template: Story<FieldComponent> = (args: FieldComponent) => ({
  props: args,
  template: `<fue-field label="lol"></fue-field>
`,
});

export const Primary = Template.bind({});
Primary.args = {};
