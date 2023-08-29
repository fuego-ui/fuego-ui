import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FueSkeletonDirective } from "./skeleton.component";

const meta: Meta<FueSkeletonDirective> = {
  title: "Skeleton",
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FueSkeletonDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<FueSkeletonDirective>;

export const Default: Story = {
  render: () => ({
    props: { box: new FormControl(false) },
    template: `
    <div class="flex items-center space-x-4">
    <div fueSkeleton class="h-12 w-12 rounded-full"></div>
    <div class="space-y-2">
      <div fueSkeleton class="h-4 w-[250px]"> </div>
      <div fueSkeleton class="h-4 w-[200px]"> </div>
    </div>
  </div>`,
  }),
};
