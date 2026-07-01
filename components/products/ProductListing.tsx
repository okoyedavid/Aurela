"use client";
import ProductControls from "@/components/products/ProductControls";
import { Button } from "@/components/ui/button";
import {
  clearFilter,
  clearPriceFilter,
  clearRating,
  selectFilteredProducts,
  selectFilters,
  setQuery as setProductQuery,
  toggleBrand,
  toggleCategory,
} from "@/features/products/productsSlice";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/products/ProductCard";
import ProductSearch from "../../components/products/ProductSearch";

interface ProductListingProps {
  categoryFilter?: string;
  initialQuery?: string;
  subcategoryFilter?: string;
}

export default function ProductListing({
  categoryFilter,
  initialQuery = "",
  subcategoryFilter,
}: ProductListingProps) {
  const allFilteredProducts = useSelector(selectFilteredProducts);
  const products = allFilteredProducts.filter(product =>
    (!categoryFilter || product.category === categoryFilter) &&
    (!subcategoryFilter || product.subcategory === subcategoryFilter)
  );
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const [query, setLocalQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setProductQuery(initialQuery));
  }, [dispatch, initialQuery]);

  const handleSearchChange = (value: string) => {
    setLocalQuery(value);
    dispatch(setProductQuery(value));
    const params = new URLSearchParams();
    if (subcategoryFilter) params.set("subcategory", subcategoryFilter);
    if (value.trim()) params.set("q", value.trim());
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
  };

  return (
    <div className={`space-y-6 max-w-7xl px-6 mx-auto`}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {subcategoryFilter
              ? `${subcategoryFilter} in ${categoryFilter}`
              : categoryFilter
                ? `${categoryFilter} Products`
                : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-96">
          <ProductSearch
            value={query}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
        </div>
      </div>

      {/* Controls Bar */}
      <ProductControls />

      <div className="flex-1 space-y-6">
        {(filters.categories?.length ||
          filters.brands?.length ||
          filters.tags?.length ||
          filters.priceRange ||
          filters.rating) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Active filters:</span>

            {filters.categories?.map((category) => (
              <Button
                key={category}
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => dispatch(toggleCategory(category))}
              >
                {category}
                <X className="w-3 h-3 ml-1" />
              </Button>
            ))}

            {filters.brands?.map((brand) => (
              <Button
                key={brand}
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => dispatch(toggleBrand(brand))}
              >
                {brand}
                <X className="w-3 h-3 ml-1" />
              </Button>
            ))}

            {filters.priceRange && (
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => dispatch(clearPriceFilter())}
              >
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <X className="w-3 h-3 ml-1" />
              </Button>
            )}

            {filters.rating > 0 && (
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => dispatch(clearRating())}
              >
                {filters.rating}+ Stars
                <X className="w-3 h-3 ml-1" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => dispatch(clearFilter())}
            >
              Clear all
            </Button>
          </div>
        )}

        {products.length > 0 ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} id={product.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No products found matching your criteria
            </div>
            <Button className="mt-4">Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
