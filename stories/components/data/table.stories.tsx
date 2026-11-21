import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "../../../src/react";

const rows = [
  ["Fri 20 Nov", "Countdown Ponsonby", "Groceries", "−84.12"],
  ["Thu 19 Nov", "Salary", "Income", "+4,230.00"],
  ["Wed 18 Nov", "Wellington Electricity", "Utilities", "−142.60"],
] as const;

const meta: Meta<typeof Table> = {
  title: "Components/Data/Table",
  component: Table,
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th data-numeric>Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([date, description, category, amount]) => (
          <tr key={description}>
            <td>{date}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td data-numeric>{amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {};
