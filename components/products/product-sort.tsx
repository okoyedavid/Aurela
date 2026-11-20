import React from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortBy = "name" | "price" | "rating" | "newest" | "popularity";
interface ProductSortProps {
  sort: SortBy;
  onSortChange: (sort: SortBy) => void;
  className?: string;
}

export default function ProductSortComponent({
  sort,
  onSortChange,
  className = "",
}: ProductSortProps) {
  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price", label: "Price (Low to High)" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
    { value: "popularity", label: "Most Popular" },
  ];

  const handleSortChange = (value: string) => {
    onSortChange(value as SortBy);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
