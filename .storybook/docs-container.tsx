import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import * as React from "react";
import { darkTheme, lightTheme } from "./theme";

const GLOBALS_UPDATED = "globalsUpdated";

function initialChoice(): string {
  const globals = new URLSearchParams(window.location.search).get("globals") ?? "";
  return /(?:^|;)theme:(system|light|dark)/.exec(globals)?.[1] ?? "light";
}

function isDark(choice: string): boolean {
  return choice === "dark" || (choice === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

// MDX pages render no story, so the story decorator cannot set the theme for them
export function ThemedDocsContainer(props: React.PropsWithChildren<DocsContainerProps>): React.JSX.Element {
  const { channel } = props.context;
  const [choice, setChoice] = React.useState(initialChoice);

  React.useEffect(() => {
    const onGlobals = ({ globals }: { globals: { theme?: string } }): void => {
      if (globals.theme) setChoice(globals.theme);
    };
    channel.on(GLOBALS_UPDATED, onGlobals);
    return () => channel.off(GLOBALS_UPDATED, onGlobals);
  }, [channel]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (choice === "system") delete root.dataset.theme;
    else root.dataset.theme = choice;
  }, [choice]);

  return <DocsContainer {...props} theme={isDark(choice) ? darkTheme : lightTheme} />;
}
