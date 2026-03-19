"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

export function NavSearch() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div
        className={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md bg-transparent text-base transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "flex items-center overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]",
          open ? "w-64 shadow-sm px-3 py-2 border border-input" : "w-auto"
        )}
      >
        <Search
          size={25}
          className="cursor-pointer text-gray-600"
          onClick={() => setOpen(!open)}
        />
        <input
          type="text"
          placeholder="Search..."
          className={`ml-2 bg-transparent outline-none text-sm transition-opacity duration-300 ${
            open ? "opacity-100 w-full" : "opacity-0 w-0"
          }`}
        />
      </div>
    </div>
  );
}
