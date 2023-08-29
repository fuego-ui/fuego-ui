import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FueSwitchComponent } from "./switch.component";
import { FueLabelDirective } from "../label/label.directive";

const meta: Meta<FueSwitchComponent> = {
  title: "Switch",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FueLabelDirective,
        FueSwitchComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FueSwitchComponent>;

export const Default: Story = {
  render: () => ({
    props: { box: new FormControl(false) },
    template: `
    <fue-switch [formControl]="box">
      <label fueLabel>Fire Mode</label>
    </fue-switch>`,
  }),
};
