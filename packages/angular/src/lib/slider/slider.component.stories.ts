import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FueSliderComponent } from "./slider.component";
import { FueLabelDirective } from "../label/label.directive";

const meta: Meta<FueSliderComponent> = {
  title: "Slider",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FueLabelDirective,
        FueSliderComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FueSliderComponent>;

export const Default: Story = {
  render: () => ({
    props: { box: new FormControl(false) },
    template: `
    <fue-slider [formControl]="box">
      <label fueLabel>Fire Mode</label>
    </fue-slider>`,
  }),
};
