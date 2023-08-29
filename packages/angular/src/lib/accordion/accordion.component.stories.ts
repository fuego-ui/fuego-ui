import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { FueAccordionItemComponent } from "./accordion.component";
import { FueAccordionGroupDirective } from "./accordion-group.directive";
import { FueAccordionTriggerComponent } from "./accordion-trigger.component";
import { FueAccordionContentComponent } from "./accordion-content.component";
const meta: Meta<FueAccordionItemComponent> = {
  title: "Accordion",
  component: FueAccordionItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FueAccordionGroupDirective,
        FueAccordionTriggerComponent,
        FueAccordionContentComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FueAccordionItemComponent>;

export const Default: Story = {
  render: () => ({
    props: { title: "Accordion Heading", content: `Content` },
    template: `<fue-accordion-item>
    <fue-accordion-trigger>{{title}}</fue-accordion-trigger>
    <fue-accordion-content><p>ndasndkjsndjsa</p><p>ndasndkjsndjsa</p><p>ndasndkjsndjsa</p></fue-accordion-content>
   </fue-accordion-item>`,
  }),
};

export const AccordionGroup: Story = {
  render: () => ({
    props: { title: "Accordion Heading", content: `Content` },
    template: `<fue-accordion-group>
      <fue-accordion-item>
        <fue-accordion-trigger>{{title}}</fue-accordion-trigger>
        <fue-accordion-content>{{content}}</fue-accordion-content>
      </fue-accordion-item>
      <fue-accordion-item>
        <fue-accordion-trigger>{{title}}</fue-accordion-trigger>
        <fue-accordion-content>{{content}}</fue-accordion-content>
      </fue-accordion-item>
      <fue-accordion-item>
      <fue-accordion-trigger>{{title}}</fue-accordion-trigger>
      <fue-accordion-content>{{content}}</fue-accordion-content>
    </fue-accordion-item>
    <fue-accordion-item >
    <fue-accordion-trigger>{{title}}</fue-accordion-trigger>
    <fue-accordion-content>{{content}}</fue-accordion-content>
  </fue-accordion-item>
    </fue-accordion-group>`,
  }),
};
