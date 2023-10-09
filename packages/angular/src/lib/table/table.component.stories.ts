import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FueLabelDirective } from "../label/label.directive";
import { FueTableModule } from "./table.module";
import { FueTableComponent } from "./table.component";

const meta: Meta<FueTableComponent> = {
  title: "Table",
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FueLabelDirective, FueTableModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<FueTableComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      invoices: [
        {
          invoice: "INV001",
          paymentStatus: "Paid",
          totalAmount: "$250.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV002",
          paymentStatus: "Pending",
          totalAmount: "$150.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV003",
          paymentStatus: "Unpaid",
          totalAmount: "$350.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV004",
          paymentStatus: "Paid",
          totalAmount: "$450.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV005",
          paymentStatus: "Paid",
          totalAmount: "$550.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV006",
          paymentStatus: "Pending",
          totalAmount: "$200.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV007",
          paymentStatus: "Unpaid",
          totalAmount: "$300.00",
          paymentMethod: "Credit Card",
        },
      ],
    },
    template: `
    <fue-table>
	<caption fueTableCaption>A list of your recent invoices.</caption>
	<thead fueTableHeader>
	  <tr fueTableRow>
		<th fueTableHead className="w-[100px]">Invoice</th>
		<th fueTableHead>Status</th>
		<th fueTableHead>Method</th>
		<th fueTableHead className="text-right">Amount</th>
	  </tr>
	</thead>
	<tbody fueTableBody>
	<ng-container *ngFor="let invoice of invoices">
	  <tr fueTableRow>
	  <td fueTableCell>{{invoice.invoice}}</td>
	  <td fueTableCell>{{invoice.paymentStatus}}</td>
	  <td fueTableCell>{{invoice.paymentMethod}}</td>
	  <td fueTableCell>{{invoice.totalAmount}}</td>
	  </tr>
	  </ng-container>
	</tbody>
    </fue-table>`,
  }),
};
