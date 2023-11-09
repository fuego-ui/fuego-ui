import { FueLabelDirective } from "../label/label.directive";
import { FieldComponent } from "./field.component";
import { FueInputDirective } from "./input.directive";
import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

const meta: Meta<FieldComponent> = {
  title: "Field",
  component: FieldComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FieldComponent,
        FueInputDirective,
        FueLabelDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FieldComponent>;

export const Textfield: Story = {
  render: () => ({
    props: {},
    template: `<fue-field><input fueInput placeholder="placeholder" type="text"></fue-field>`,
  }),
};

export const TextfieldWithLabel: Story = {
  render: () => ({
    props: {},
    template: `<fue-field><label fueLabel>Email</label><input fueInput type="text"></fue-field>`,
  }),
};

export const Textarea: Story = {
  render: () => ({
    props: {},
    template: `<fue-field><textarea fueInput placeholder="Type your message here."></textarea></fue-field>`,
  }),
};

export const TextareaWithLabel: Story = {
  render: () => ({
    props: {},
    template: `<fue-field><label fueLabel>Email</label><textarea fueInput></textarea></fue-field>`,
  }),
};

export const File: Story = {
  render: () => ({
    props: {},
    template: `<fue-field><label fueLabel>Email</label><input fueInput type="file"></fue-field>`,
  }),
};
