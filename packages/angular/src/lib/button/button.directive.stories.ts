import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FueButtonDirective } from "./button.directive";

const meta: Meta<FueButtonDirective> = {
  title: "Button",
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FueButtonDirective],
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
type Story = StoryObj<FueButtonDirective>;

export const Default: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<button fueBtn>Button</button>`,
  }),
};

export const Secondary: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<button fueBtn variant="secondary">Button</button>`,
  }),
};

export const Destructive: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<button fueBtn variant="destructive">Button</button>`,
  }),
};

export const Outline: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<button fueBtn variant="outline">Button</button>`,
  }),
};

export const Ghost: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<button fueBtn variant="ghost">Button</button>`,
  }),
};

export const Link: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<button fueBtn variant="link">Button</button>`,
  }),
};
