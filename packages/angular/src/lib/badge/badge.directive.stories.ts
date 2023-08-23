import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FueBadgeDirective } from "./badge.directive";

const meta: Meta<FueBadgeDirective> = {
  title: "Badge",
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FueBadgeDirective],
    }),
    // With template
    // componentWrapperDecorator(
    //   (story) => `<div style="margin: 3em">${story}</div>`
    // ),
    // // With component which contains ng-content
    // componentWrapperDecorator(Parent),
  ],
};

export default meta;
type Story = StoryObj<FueBadgeDirective>;

export const Default: Story = {
  render: () => ({
    template: `<div fueBadge>default</div>`,
  }),
};

export const Secondary: Story = {
  render: () => ({
    template: `<div fueBadge variant="secondary">secondary</div>`,
  }),
};

export const Destructive: Story = {
  render: () => ({
    template: `<div fueBadge variant="destructive">destructive</div>`,
  }),
};

export const Outline: Story = {
  render: () => ({
    template: `<div fueBadge variant="outline">outline</div>`,
  }),
};
