"use client";

import { ThemeProvider } from "next-themes";

export default function DashboardThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="aurela-workspace-theme">
      {children}
    </ThemeProvider>
  );
}
