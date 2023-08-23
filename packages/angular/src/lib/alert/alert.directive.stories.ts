import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FueAlertDirective } from "./alert.directive";
import { FueAlertTitleDirective } from "./alert-title.directive";
import { FueAlertDescriptionDirective } from "./alert-description.directive";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { lucideFlame } from "@ng-icons/lucide";

const meta: Meta<FueAlertDirective> = {
  title: "Alert",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FueAlertDirective,
        FueAlertTitleDirective,
        FueAlertDescriptionDirective,
        NgIconComponent,
      ],
      providers: [provideIcons({ lucideFlame })],
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
type Story = StoryObj<FueAlertDirective>;

export const Default: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<div fueAlert>
      <ng-icon
        class="h-4 w-4 shrink-0"
        name="lucideFlame"
      />
      <h5 fueAlertTitle>Fire Alert!</h5>
      <div fueAlertDescription>Be on the look out for fuego UI. Proceed with caution as you spark a flaming desire to build something!</div>
    </div>`,
  }),
};

export const Destructive: Story = {
  render: () => ({
    props: { title: "Button", content: `Content` },
    template: `<div fueAlert variant="destructive">
    <ng-icon
    class="h-4 w-4 shrink-0"
    name="lucideFlame"
  />
    <h5 fueAlertTitle>Fire Alert!</h5>
    <div fueAlertDescription>Be on the look out for fuego UI. Proceed with caution as you spark a flaming desire to build something new!</div>
  </div>`,
  }),
};
