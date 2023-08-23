import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FueAvatarComponent } from "./avatar.component";
import { FueAvatarImageDirective } from "./avatar-image.directive";
import { FueAvatarFallbackDirective } from "./avatar-fallback.directive";

const meta: Meta<FueAvatarComponent> = {
  title: "Avatar",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FueAvatarComponent,
        FueAvatarImageDirective,
        FueAvatarFallbackDirective,
      ],
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
type Story = StoryObj<FueAvatarComponent>;

export const Default: Story = {
  render: () => ({
    template: `<fue-avatar>
    <img src="https://avatars.githubusercontent.com/u/22568206?v=4" alt="" fueAvatarImage/>
    <span fueAvatarFallback>SM</span>
    </fue-avatar>`,
  }),
};

export const DelayedFallback: Story = {
  render: () => ({
    template: `<fue-avatar fallbackDelay="1000">
    <img src="https://avatars.githubusercontent.com/u/22568206?v=4" alt="" fueAvatarImage/>
    <span fueAvatarFallback>SM</span>
    </fue-avatar>`,
  }),
};
