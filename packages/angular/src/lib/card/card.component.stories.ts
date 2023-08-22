import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { CardDirective } from "./card.directive";
// import { CardTitleDirective } from './card-title.directive';
// import { CardFooterDirective } from './card-footer.directive';
// import { CardHeaderComponent } from './card-header.component';
// import { CardContentComponent } from './card-content.component';
// import { CardDescriptionDirective } from './card-description.directive';
import { CardModule } from "./card.module";
import { FueButtonDirective } from "../button/button.directive";

const meta: Meta<CardDirective> = {
  title: "Card",
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CardModule, FueButtonDirective],
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
type Story = StoryObj<CardDirective>;

export const Default: Story = {
  render: () => ({
    props: { title: "Accordion Heading", content: `Content` },
    template: `<fue-card class="max-w-[312px]">
    <fue-card-header>
      <fue-card-title>Deal of a Lifetime</fue-card-title>
      <fue-card-description>The deets fo the deal</fue-card-description>
    </fue-card-header>
    <fue-card-content><p>This deal is fiya!!</p></fue-card-content>
    <fue-card-footer><button fueBtn class="w-full">Check out deals</button></fue-card-footer>
    </fue-card>`,
  }),
};
