import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FueCardDirective } from "./card.directive";
import { FueCardTitleDirective } from "./card-title.directive";
import { FueCardFooterDirective } from "./card-footer.directive";
import { FueCardHeaderDirective } from "./card-header.directive";
import { FueCardContentDirective } from "./card-content.directive";
import { FueCardDescriptionDirective } from "./card-description.directive";
import { FueButtonDirective } from "../button/button.directive";

const meta: Meta<FueCardDirective> = {
  title: "Card",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FueButtonDirective,
        FueCardTitleDirective,
        FueCardHeaderDirective,
        FueCardFooterDirective,
        FueCardFooterDirective,
        FueCardDirective,
        FueCardDescriptionDirective,
        FueCardContentDirective,
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
type Story = StoryObj<FueCardDirective>;

export const Default: Story = {
  render: () => ({
    props: { title: "Accordion Heading", content: `Content` },
    template: `<div fueCard class="max-w-[312px] mx-3">
    <fue-card-header>
      <fue-card-title>Deal of a Lifetime</fue-card-title>
      <fue-card-description>The deets fo the deal</fue-card-description>
    </fue-card-header>
    <fue-card-content><p>This deal is fiya!!</p></fue-card-content>
    <fue-card-footer><button fueBtn class="w-full">Check out deals</button></fue-card-footer>
    </div>`,
  }),
};
