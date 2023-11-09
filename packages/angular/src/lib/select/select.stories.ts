import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { FueLabelDirective } from "../label/label.directive";

import { FueSelectComponent } from "./select.component";
import { FueSelectTriggerComponent } from "./select-trigger.component";
import { FueSelectOptionDirective } from "./select-option.directive";
import { FueSelectLabelComponent } from "./select-label.component";
import { FueSelectContentDirective } from "./select-content.directive";
import { FueSelectValueComponent } from "./select-value.component";

import { FueMenuTriggerDirective } from "../menu/menu-trigger.directive";
import { FueMenuDirective } from "../menu/menu.directive";

const meta: Meta<{}> = {
  title: "Select",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FueLabelDirective,
        FueSelectComponent,
        FueSelectTriggerComponent,
        FueSelectOptionDirective,
        FueSelectLabelComponent,
        FueSelectContentDirective,
        FueSelectValueComponent,
        FueMenuTriggerDirective,
        FueMenuDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<{}>;

export const Default: Story = {
  render: () => ({
    props: { fruitGroup: new FormGroup({ fruit: new FormControl() }) },
    template: `
    <form [formGroup]="fruitGroup">
	<fue-select formControlName="fruit">
		<fue-select-trigger [fueMenuTriggerFor]="menu">
			<fue-select-value placeholder="Select a Fruit"/>
		</fue-select-trigger>
		<ng-template #menu>
			<ul class="w-56" fueSelectContent>
				<li fueSelectOption="Refresh">Refresh</li>
				<li fueSelectOption="Settings">Settings</li>
				<li fueSelectOption="Help">Help</li>
				<li fueSelectOption="Signout">Sign out</li>
			</ul>
  		</ng-template>
	</fue-select>
  <form>`,
  }),
};
