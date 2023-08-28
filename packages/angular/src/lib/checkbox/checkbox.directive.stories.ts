import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ReactiveFueCheckboxComponentStory } from "./story-wrappers/checkbox.component";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FueCheckboxComponent } from "./checkbox.component";
import { FueLabelDirective } from "../label/label.directive";

const meta: Meta<ReactiveFueCheckboxComponentStory> = {
  title: "Checkbox",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FueCheckboxComponent,
        FueLabelDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ReactiveFueCheckboxComponentStory>;

export const Default: Story = {
  render: () => ({
    props: { box: new FormControl(false) },
    template: `
    <fue-checkbox [formControl]="box">
      <label fueLabel>I accept that fuego UI is absolutely fireeee!</label>
    </fue-checkbox>`,
  }),
};

export const CheckboxWithLink: Story = {
  render: () => ({
    props: { box: new FormControl(false) },
    template: `
    <fue-checkbox [formControl]="box">
      <label fueLabel>I accept that fuego UI is absolutely fireeee! <a class="hover:underline" href="#" target="_blank">Click here for more fire </a></label>
    </fue-checkbox>`,
  }),
};
