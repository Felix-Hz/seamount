import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  Banner,
  Button,
  Checkbox,
  ConfirmDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  Field,
  Input,
  Kbd,
  Label,
  Live,
  LoadingState,
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
  Meter,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Row,
  Section,
  SegmentedControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ShortcutLabel,
  Skeleton,
  SpecList,
  StatTile,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Textarea,
  Tooltip,
  toast,
} from "../src/react";

const meta: Meta = { title: "Components/All" };
export default meta;
type Story = StoryObj;

const stack: React.CSSProperties = { display: "grid", gap: "1rem", maxWidth: "40rem" };
const line: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" };

export const Buttons: Story = {
  render: () => (
    <div style={stack}>
      <div style={line}>
        <Button variant="primary">Apply preset</Button>
        <Button>Export</Button>
        <Button variant="ghost">Reset</Button>
        <Button variant="destructive">Delete account</Button>
        <Button variant="link">Details ›</Button>
      </div>
      <div style={line}>
        <Button size="sm" variant="primary">
          Save
        </Button>
        <Button size="sm">Cancel</Button>
        <Button disabled>Disabled</Button>
      </div>
      <p className="sm-field-help">
        One primary per view. Buttons name the action; Ember always says what it destroys.
      </p>
    </div>
  ),
};

export const Labels: Story = {
  render: () => (
    <div style={stack}>
      <div style={line}>
        <Label tone="accent">[ 01 ]</Label>
        <Label>6 of 21</Label>
        <Tag>OK</Tag>
        <Tag tone="ember">ERROR</Tag>
        <Tag tone="accent">3/7</Tag>
        <Live>Live · every 5 s</Live>
      </div>
      <div style={line}>
        <ShortcutLabel label="Type" shortcut="t" />
        <ShortcutLabel label="Books" shortcut="b" />
        <span className="sm-label">
          <Kbd>Esc</Kbd> to home
        </span>
        <span className="sm-label">
          Search <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>
        </span>
      </div>
      <ul className="sm-list">
        <li>Bullets are 6 px cobalt squares.</li>
        <li>Ordered lists number in mono cobalt.</li>
      </ul>
      <ol className="sm-list">
        <li>Install with one command.</li>
        <li>Import a bank statement.</li>
        <li>See where it went.</li>
      </ol>
    </div>
  ),
};

function FieldsDemo(): React.JSX.Element {
  const [interval, setInterval] = React.useState("0");
  const [touched, setTouched] = React.useState(true);
  const value = Number(interval);
  const error =
    touched && (!Number.isInteger(value) || value < 1 || value > 3600) ? "Enter 1 to 3,600 seconds." : undefined;
  return (
    <div style={stack}>
      <Field label="Description" help="Shown in the transaction list.">
        <Input placeholder="Countdown, groceries" />
      </Field>
      <Field label="Amount">
        <Input figures inputMode="decimal" defaultValue="42.10" />
      </Field>
      <Field label="Sample interval" error={error}>
        <Input
          figures
          inputMode="numeric"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          onBlur={() => setTouched(true)}
        />
      </Field>
      <Field label="Account">
        <Select defaultValue="everyday">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyday">Everyday</SelectItem>
            <SelectItem value="savings">Savings</SelectItem>
            <SelectItem value="credit">Credit card</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Note">
        <Textarea placeholder="Split with Sam" />
      </Field>
    </div>
  );
}

export const Fields: Story = { render: () => <FieldsDemo /> };

function ControlsDemo(): React.JSX.Element {
  const [period, setPeriod] = React.useState<"week" | "month" | "quarter" | "year">("month");
  const [sync, setSync] = React.useState(true);
  return (
    <div style={{ maxWidth: "40rem" }}>
      <Section label="Settings" title="Dashboard">
        <Row name="Period" help="The span every widget summarises.">
          <SegmentedControl
            aria-label="Period"
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "quarter", label: "Quarter" },
              { value: "year", label: "Year" },
            ]}
          />
        </Row>
        <Row
          name="Sync exchange rates"
          help="Fetch rates once a day for the 12 currencies in use."
          state={sync ? "Last fetched 4 min ago" : "Paused"}
          htmlFor="sync"
        >
          <Switch id="sync" checked={sync} onCheckedChange={setSync} />
        </Row>
        <Row name="Include transfers" help="Count moves between your own accounts as spending." htmlFor="transfers">
          <Checkbox id="transfers" />
        </Row>
        <Row
          name="Reverted by another device"
          help="Shows how a warning state reads."
          state="Your phone set this back to Week 2 min ago."
          warning
        >
          <Button size="sm">Set again</Button>
        </Row>
      </Section>
    </div>
  );
}

export const Controls: Story = { render: () => <ControlsDemo /> };

export const Overlays: Story = {
  render: () => (
    <div style={line}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New budget</Button>
        </DialogTrigger>
        <DialogContent sheet>
          <DialogTitle>New budget</DialogTitle>
          <DialogDescription>Track one category against a monthly limit.</DialogDescription>
          <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
            <Field label="Category">
              <Input defaultValue="Groceries" />
            </Field>
            <Field label="Monthly limit" help="In NZD; other currencies convert at the day's rate.">
              <Input figures defaultValue="500.00" />
            </Field>
          </div>
          <DialogFooter>
            <Button>Cancel</Button>
            <Button variant="primary">Create budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        trigger={<Button variant="destructive">Delete account</Button>}
        title="Delete Everyday?"
        consequences={[
          "Its 214 transactions are deleted.",
          "Budgets that use it stop tracking.",
          "This can't be undone.",
        ]}
        actionLabel="Delete"
        destructive
        onConfirm={() => toast.success({ title: "Deleted Everyday. 214 transactions." })}
      />

      <Menu>
        <MenuTrigger asChild>
          <Button>Sort ›</Button>
        </MenuTrigger>
        <MenuContent>
          <MenuLabel>Sort by</MenuLabel>
          <MenuRadioGroup value="date">
            <MenuRadioItem value="date">Date</MenuRadioItem>
            <MenuRadioItem value="amount">Amount</MenuRadioItem>
          </MenuRadioGroup>
          <MenuSeparator />
          <MenuItem shortcut="E">Export…</MenuItem>
          <MenuItem variant="destructive">Delete selected</MenuItem>
        </MenuContent>
      </Menu>

      <Popover>
        <PopoverTrigger asChild>
          <Button>Rates ›</Button>
        </PopoverTrigger>
        <PopoverContent>
          <SpecList
            items={[
              ["EUR", "1.8241"],
              ["USD", "1.6802"],
              ["Fetched", "Fri 20 Nov, 21:40"],
            ]}
          />
        </PopoverContent>
      </Popover>

      <Tooltip content="Average across the last 90 days.">
        <Button variant="ghost">Avg ?</Button>
      </Tooltip>
    </div>
  ),
};

export const Feedback: Story = {
  render: () => (
    <div style={stack}>
      <div style={line}>
        <Button
          onClick={() =>
            toast.success({
              title: "Applied Gaming. 3 changes.",
              action: { label: "Undo", onClick: () => toast.info({ title: "Restored Balanced." }) },
            })
          }
        >
          Success
        </Button>
        <Button onClick={() => toast.info({ title: "Recorder restarted after the update." })}>Info</Button>
        <Button
          onClick={() => {
            const id = toast.progress({ title: "Importing statement.", step: "1/3" });
            setTimeout(() => toast.update(id, { step: "2/3" }), 800);
            setTimeout(
              () => toast.update(id, { kind: "success", title: "Imported 214 transactions.", duration: 4000 }),
              1600,
            );
          }}
        >
          Progress
        </Button>
        <Button
          onClick={() =>
            toast.error({
              title: "Couldn't import the statement.",
              description: "Row 18 has no date. Fix the file and try again.",
              action: { label: "Retry", onClick: () => toast.dismiss() },
            })
          }
        >
          Error
        </Button>
      </div>
      <Banner action={<Button size="sm">Set a rate</Button>} onDismiss={() => undefined}>
        Exchange rates are 3 days old, so totals in other currencies may be off.
      </Banner>
      <EmptyState title="Nothing recorded this month." action={<Button variant="primary">Import a statement</Button>}>
        Transactions appear here as you add them or import a CSV from your bank.
      </EmptyState>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Skeleton style={{ width: "60%" }} />
        <Skeleton style={{ width: "40%" }} />
        <LoadingState delay={0}>Reading 3 of 7 days…</LoadingState>
      </div>
    </div>
  ),
};

export const Data: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "3rem", maxWidth: "48rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))", gap: "1.5rem" }}>
        <StatTile
          label="Spent · November"
          value="$2,627.49"
          change="12% less than October"
          spark={[3100, 2890, 3240, 2980, 3010, 2760, 2950, 3120, 2870, 2990, 2985, 2627]}
          sparkLabel="Monthly spending over 12 months, lowest now"
        />
        <StatTile label="Savings rate" value="37.9" unit="%" change="Up from 31.2% in October" />
        <div className="sm-stat">
          <Label>Groceries budget</Label>
          <div className="sm-stat-value">$412.80</div>
          <Meter label="Groceries budget used" value={412.8} max={500} valueText="$412.80 of $500" />
          <span className="sm-stat-change">$87.20 left for 9 days</span>
        </div>
      </div>
      <SpecList
        items={[
          ["Source", "github.com/Felix-Hz/cofr"],
          ["Licence", "AGPL-3.0"],
          ["Install", <code key="i">curl -fsSL https://cofr.cash/install.sh | bash</code>],
        ]}
      />
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th data-numeric>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fri 20 Nov</td>
            <td>Countdown Ponsonby</td>
            <td>Groceries</td>
            <td data-numeric>−84.12</td>
          </tr>
          <tr>
            <td>Thu 19 Nov</td>
            <td>Salary</td>
            <td>Income</td>
            <td data-numeric>+4,230.00</td>
          </tr>
          <tr>
            <td>Wed 18 Nov</td>
            <td>Wellington Electricity</td>
            <td>Utilities</td>
            <td data-numeric>−142.60</td>
          </tr>
        </tbody>
      </Table>
      <Tabs defaultValue="month">
        <TabsList>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
        <TabsContent value="month">
          <p>November so far.</p>
        </TabsContent>
        <TabsContent value="year">
          <p>2026 to date.</p>
        </TabsContent>
      </Tabs>
      <Section title="Collapsible section" label="Details" collapsible>
        <p style={{ color: "var(--sm-ink-2)" }}>The heading toggles; the chevron turns 90°.</p>
      </Section>
    </div>
  ),
};
