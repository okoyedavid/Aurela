"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Laptop },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted) return <div className="h-10 w-28 rounded-full bg-muted" />;

  return (
    <div className="flex rounded-full border border-border bg-card p-1" aria-label="Color theme">
      {options.map(({ value, label, Icon }) => (
        <button key={value} type="button" title={label} aria-label={`Use ${label.toLowerCase()} theme`} onClick={() => setTheme(value)}
          className={`grid h-8 w-8 place-items-center rounded-full transition ${theme === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
