import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  toggleBrand as changeBrand,
  toggleCategory as changeCategory,
  toggleTags as changeTag,
  clearFilter,
  setMinRating,
  setPriceFilter,
} from "@/features/products/products-slice";
import { Filters } from "@/features/products/types";
import { ChevronDown, Filter, X } from "lucide-react";
import { useDispatch } from "react-redux";

interface ProductFiltersProps {
  filters: Filters;

  filterCounts: {
    categories: Map<string, number>;
    brands: Map<string, number>;
    tags: Map<string, number>;
  };
  className?: string;
}

export default function ProductFilters({
  filters,

  filterCounts,
  className = "",
}: ProductFiltersProps) {
  const dispatch = useDispatch();

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    dispatch(setPriceFilter(range));
  };

  const toggleCategory = (category: string) =>
    dispatch(changeCategory(category));

  const toggleBrand = (brand: string) => dispatch(changeBrand(brand));
  const toggleTag = (tag: string) => dispatch(changeTag(tag));

  const hasActiveFilters = !!(
    filters.categories?.length ||
    filters.brands?.length ||
    filters.tags?.length ||
    filters.priceRange ||
    filters.rating
  );

  return (
    <Card className={`h-fit ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearFilter())}
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Categories */}
        {filterCounts.categories.size > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium">
              Categories
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-3">
              {Array.from(filterCounts.categories.entries()).map(
                ([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={
                          filters.categories?.includes(category) || false
                        }
                        onCheckedChange={() => toggleCategory(category)}
                      />

                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                )
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Brands */}
        {filterCounts.brands.size > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium">
              Brands
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-3">
              {Array.from(filterCounts.brands.entries()).map(
                ([brand, count]) => (
                  <div
                    key={brand}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brands?.includes(brand) || false}
                        onCheckedChange={() => toggleBrand(brand)}
                      />

                      <Label
                        htmlFor={`brand-${brand}`}
                        className="text-sm cursor-pointer"
                      >
                        {brand}
                      </Label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                )
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={() => dispatch(setMinRating(rating))}
                />

                <Label
                  htmlFor={`rating-${rating}`}
                  className="text-sm cursor-pointer flex items-center"
                >
                  {rating} stars & up
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        {filterCounts.tags.size > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium">
              Tags
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-3">
              <div className="flex flex-wrap gap-2">
                {Array.from(filterCounts.tags.entries())
                  .slice(0, 10)
                  .map(([tag, count]) => (
                    <Badge
                      key={tag}
                      variant={
                        filters.tags?.includes(tag) ? "default" : "outline"
                      }
                      className="cursor-pointer text-xs"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag} ({count})
                    </Badge>
                  ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
