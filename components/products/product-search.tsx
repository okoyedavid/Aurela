import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setQuery } from "@/features/products/products-slice";
import { Search, X } from "lucide-react";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ProductSearch({
  value,
  onChange,
  placeholder = "Search products...",
}: ProductSearchProps) {
  const dispatch = useDispatch();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setQuery(value));
  };
  return (
    <form onSubmit={handleSearch} className={`relative`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
          onClick={() => onChange("")}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </form>
  );
}
