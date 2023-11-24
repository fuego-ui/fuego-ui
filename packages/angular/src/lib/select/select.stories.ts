import { CommonModule } from "@angular/common";
import {
	argsToTemplate,
	Meta,
	moduleMetadata,
	StoryObj,
} from "@storybook/angular";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from "@angular/forms";
import { FueLabelDirective } from "../label/label.directive";

import { FueSelectComponent } from "./select.component";
import { FueSelectTriggerComponent } from "./select-trigger.component";
import { FueSelectLabelComponent } from "./select-label.component";
import { FueSelectValueComponent } from "./select-value.component";

import { FueMenuTriggerDirective } from "../menu/menu-trigger.directive";
import { FueMenuDirective } from "../menu/menu.directive";
import { FueOptionComponent } from "./fue-option.component";
import { FueSelectContentComponent } from "./fue-select-content.component";

const meta: Meta<{}> = {
	title: "Select",
	args: {
		disabled: false,
		placeholder: "Select a Fruit",
		multiple: false,
	},
	decorators: [
		moduleMetadata({
			imports: [
				CommonModule,
				FormsModule,
				ReactiveFormsModule,
				FueLabelDirective,
				FueSelectComponent,
				FueSelectTriggerComponent,
				FueSelectLabelComponent,
				FueSelectValueComponent,
				FueMenuTriggerDirective,
				FueMenuDirective,
				FueSelectContentComponent,
				FueOptionComponent,
			],
		}),
	],
};

export default meta;
type Story = StoryObj<{}>;

export const Default: Story = {
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl() }) },
		template: `
    <form [formGroup]="fruitGroup">
	<fue-select formControlName="fruit" placeholder="Select a Fruit">
		<fue-select-trigger> 
			<fue-select-value />
		</fue-select-trigger>
    <fue-select-content class="w-56">
      <fue-option value="Refresh">Refresh</fue-option>
      <fue-option value="Settings">Settings</fue-option>
      <fue-option value="Help">Help</fue-option>
      <fue-option value="Signout">Sign out</fue-option>
    </fue-select-content>
	</fue-select>
  <form>`,
	}),
};

export const ReactiveFormControl: Story = {
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl() }) },
		template: `
		<div class="mb-3">
		<pre>Form Control Value: {{ fruitGroup.controls.fruit.valueChanges | async | json }}</pre>
		</div>
    <form [formGroup]="fruitGroup">
	<fue-select formControlName="fruit" placeholder="Select a Fruit">
		<fue-select-trigger> 
			<fue-select-value />
		</fue-select-trigger>
    <fue-select-content class="w-56">
      <fue-option value="Refresh">Refresh</fue-option>
      <fue-option value="Settings">Settings</fue-option>
      <fue-option value="Help">Help</fue-option>
      <fue-option value="Signout">Sign out</fue-option>
    </fue-select-content>
	</fue-select>
  <form>`,
	}),
};

export const NgModelFormControl: Story = {
	render: (args) => ({
		props: args,
		template: `
		<form #model="ngForm">
		<div class="mb-3">
		<pre>Form Control Value: {{ model.fruit }}</pre>
		</div>
	<fue-select ${argsToTemplate(
		args
	)} [(ngModel)]="model.fruit" name="fruit" placeholder="Select a Fruit">
		<fue-select-trigger> 
			<fue-select-value />
		</fue-select-trigger>
    <fue-select-content class="w-56">
      <fue-option value="Refresh">Refresh</fue-option>
      <fue-option value="Settings">Settings</fue-option>
      <fue-option value="Help">Help</fue-option>
      <fue-option value="Signout">Sign out</fue-option>
    </fue-select-content>
	</fue-select>
	</form>`,
	}),
};

export const MultiSelect: Story = {
	args: { multiple: true },
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl() }) },
		template: `
  <form [formGroup]="fruitGroup">
    <fue-select ${argsToTemplate(args)} formControlName="fruit">
      <fue-select-trigger> 
        <fue-select-value />
      </fue-select-trigger>
      <fue-select-content class="w-56">
        <fue-option value="Refresh">Refresh</fue-option>
        <fue-option value="Settings">Settings</fue-option>
        <fue-option value="Help">Help</fue-option>
        <fue-option value="Signout">Sign out</fue-option>
      </fue-select-content>
    </fue-select>
  <form>`,
	}),
};

export const SelectWithLabel: Story = {
	args: {
		label: "Fruit Selections",
	},
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl() }) },
		template: `
  <form [formGroup]="fruitGroup">
    <fue-select formControlName="fruit" ${argsToTemplate(args)}>
	<fue-label>{{label}}</fue-label>
      <fue-select-trigger> 
        <fue-select-value />
      </fue-select-trigger>
      <fue-select-content class="w-56">
        <fue-option value="Refresh">Refresh</fue-option>
        <fue-option value="Settings">Settings</fue-option>
        <fue-option value="Help">Help</fue-option>
        <fue-option value="Signout">Sign out</fue-option>
      </fue-select-content>
    </fue-select>
  <form>`,
	}),
};

export const LargeOptionsList: Story = {
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl() }) },
		template: `
    <form [formGroup]="fruitGroup">
	<fue-select formControlName="fruit" ${argsToTemplate(args)}>
		<fue-select-trigger> 
			<fue-select-value />
		</fue-select-trigger>
    <fue-select-content class="w-56 max-h-44">
      <fue-option value="Refresh">Refresh</fue-option>
      <fue-option value="Settings">Settings</fue-option>
      <fue-option value="Help">Help</fue-option>
      <fue-option value="Signout">Sign out</fue-option>

      <fue-option value="Account">Account</fue-option>
      <fue-option value="Rewards">Rewards</fue-option>
      <fue-option value="Subscriptions">Subscriptions</fue-option>
      <fue-option value="Lending">Lending</fue-option>

      <fue-option value="Deposit">Deposit</fue-option>
      <fue-option value="Withdrawel">Withdrawel</fue-option>
    </fue-select-content>
	</fue-select>
  <form>`,
	}),
};
