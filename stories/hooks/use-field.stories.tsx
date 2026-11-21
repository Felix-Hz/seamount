import { Field, useField, useFieldControlProps } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";

function Control(): React.JSX.Element {
  const field = useField();
  const props = useFieldControlProps({});
  return (
    <input
      className="sm-input"
      {...props}
      aria-label={field ? undefined : "Custom control"}
      defaultValue="Custom control"
    />
  );
}
function Demo(): React.JSX.Element {
  return (
    <div style={{ maxWidth: "20rem" }}>
      <Field label="Custom control" help="Wired to the label and help text.">
        <Control />
      </Field>
    </div>
  );
}

const meta: Meta<typeof Demo> = { title: "Hooks/useField", component: Demo, tags: ["!autodocs"] };
export default meta;
export const Default: StoryObj<typeof Demo> = {};
