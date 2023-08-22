import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { AccordionItemComponent } from "./accordion.component";
import { AccordionGroupDirective } from "./accordion-group.directive";
import { AccordionTriggerComponent } from "./accordion-trigger.component";
import { AccordionContentComponent } from "./accordion-content.component";
const meta: Meta<AccordionItemComponent> = {
  title: "Accordion",
  component: AccordionItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        AccordionGroupDirective,
        AccordionTriggerComponent,
        AccordionContentComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AccordionItemComponent>;

export const Default: Story = {
  render: () => ({
    props: { title: "Accordion Heading", content: `Content` },
    template: `<accordion-item>
    <accordion-trigger>{{title}}</accordion-trigger>
    <accordion-content><p>ndasndkjsndjsa</p><p>ndasndkjsndjsa</p><p>ndasndkjsndjsa</p></accordion-content>
   </accordion-item>`,
  }),
};

export const AccordionGroup: Story = {
  render: () => ({
    props: { title: "Accordion Heading", content: `Content` },
    template: `<accordion-group>
      <accordion-item>
        <accordion-trigger>{{title}}</accordion-trigger>
        <accordion-content>{{content}}</accordion-content>
      </accordion-item>
      <accordion-item >
        <accordion-trigger>{{title}}</accordion-trigger>
        <accordion-content>{{content}}</accordion-content>
      </accordion-item>
      <accordion-item >
      <accordion-trigger>{{title}}</accordion-trigger>
      <accordion-content>{{content}}</accordion-content>
    </accordion-item>
    <accordion-item >
    <accordion-trigger>{{title}}</accordion-trigger>
    <accordion-content>{{content}}</accordion-content>
  </accordion-item>
    </accordion-group>`,
  }),
};
