"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  selectFilterCounts,
  selectFilters,
  setSortBy,
} from "@/features/products/products-slice";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilters from "./product-filters";
import ProductSort from "./product-sort";
import { Button } from "../ui/button";
export default function ProductControls() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filterCounts = useSelector(selectFilterCounts);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-2">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 sm:w-96">
            <div className="h-screen overflow-hidden">
              <div className="h-full overflow-y-auto">
                <ProductFilters
                  className="border-none shadow-none"
                  filters={filters}
                  filterCounts={filterCounts}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <ProductSort
        sort={filters.sortBy}
        onSortChange={(sort) => dispatch(setSortBy(sort))}
      />
    </div>
  );
}
