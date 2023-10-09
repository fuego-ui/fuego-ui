import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FueRadioComponent } from "./radio.component";
import { FueRadioGroupDirective } from "./radio-group.component";
import { FueLabelDirective } from "../label/label.directive";

const meta: Meta<FueRadioComponent> = {
  title: "Radio",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FueLabelDirective,
        FueRadioComponent,
        FueRadioGroupDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FueRadioComponent>;

export const Default: Story = {
  render: () => ({
    props: { box: new FormControl(null) },
    template: `
    <fue-radio-group [formControl]="box" name="box">
      <fue-radio value="want">
        <label fueLabel>I want Fue Library</label>
      </fue-radio>
      <fue-radio value="wantMore">
        <label fueLabel>I want more Fue Library</label>
      </fue-radio>
      <fue-radio value="wantMuchMore">
        <label fueLabel>I want so much more of Fue Library</label>
      </fue-radio>
      <fue-radio value="needMore">
        <label fueLabel>I NEED MORE Fue Library</label>
      </fue-radio>
    </fue-radio-group>`,
  }),
};
