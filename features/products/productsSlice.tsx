import { generateProducts } from "@/data/generatorfakeproducts";
import { matchesQuery, normalizeString } from "@/lib/utils";
import { RootState } from "@/store/store";
import { ProductProps } from "@/types/products";
import {
  Filters,
  RelatedProductsOptions,
  SortBy,
  Status,
} from "@/types/productSlice";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter<ProductProps>();

const initialState = productsAdapter.setAll(
  productsAdapter.getInitialState<{
    status: Status;
    error: string | null;
    filters: Filters;
  }>({
    status: "idle",
    error: null,
    filters: {
      query: "",
      tags: [],
      categories: [],
      brands: [],
      priceRange: [0, 10000],
      rating: 0,
      sortBy: "newest",
    },
  }),
  generateProducts(80) // ✅ Call function directly
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state) => {
      state.status = "loading";
    },
    loadProductsSuccess: (state, action: PayloadAction<ProductProps[]>) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "succeeded";
    },
    loadProductsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "failed";
    },

    setMinRating: (state, action: PayloadAction<number>) => {
      state.filters.rating = action.payload;
    },

    clearRating: (state) => {
      state.filters.rating = 0;
    },

    setCategoriesFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.categories = action.payload;
    },

    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.filters.categories.indexOf(category);

      if (index > -1) {
        state.filters.categories.splice(index, 1);
      } else {
        state.filters.categories.push(category);
      }
    },

    clearFilter: (state) => {
      state.filters = initialState.filters;
    },

    clearCategories: (state) => {
      state.filters.categories = [];
    },
    setBrandsFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.brands = action.payload;
    },

    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      const index = state.filters.brands.indexOf(brand);

      if (index > -1) {
        state.filters.brands.splice(index, 1);
      } else {
        state.filters.brands.push(brand);
      }
    },

    clearBrands: (state) => {
      state.filters.brands = [];
    },

    setTagsFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.brands = action.payload;
    },

    toggleTags: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      const index = state.filters.tags.indexOf(brand);

      if (index > -1) {
        state.filters.tags.splice(index, 1);
      } else {
        state.filters.tags.push(brand);
      }
    },

    clearTags: (state) => {
      state.filters.tags = [];
    },

    setPriceFilter: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },

    clearPriceFilter: (state) => {
      state.filters.priceRange = initialState.filters.priceRange;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.filters.sortBy = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.filters.query = action.payload;
    },
    productAdded: productsAdapter.addOne,
    productsReceived: productsAdapter.setAll,
    productUpdated: productsAdapter.updateOne,
    productRemoved: productsAdapter.removeOne,
  },
});

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state: RootState) => state.products);

export const selectFilteredProducts = createSelector(
  [(state: RootState) => state.products.filters, selectAllProducts],
  (filters, products) => {
    let filtered = products;

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(
        (p) => p.tags?.some((tag) => filters.tags.includes(tag)) || false
      );
    }

    if (filters.rating > 0) {
      if (filters.rating)
        filtered = filtered.filter((p) => (p.rating ?? 0) >= filters.rating);
    }

    // Search Query Filter
    if (filters.query) {
      const normalizedQuery = normalizeString(filters.query);

      filtered = filtered.filter((product) => {
        if (matchesQuery(product.name, normalizedQuery)) return true;
        if (matchesQuery(product.description, normalizedQuery)) return true;
        if (matchesQuery(product.brand, normalizedQuery)) return true;
        if (product.tags?.some((tag) => matchesQuery(tag, normalizedQuery))) {
          return true;
        }

        return false;
      });
    }

    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;

        switch (filters.sortBy) {
          case "name": {
            const aName = normalizeString(a.name);
            const bName = normalizeString(b.name);
            comparison = aName.localeCompare(bName);
            break;
          }

          case "price": {
            comparison = a.price - b.price;
            break;
          }

          case "rating": {
            const aRating = a.rating ?? 0;
            const bRating = b.rating ?? 0;
            comparison = bRating - aRating;
            break;
          }

          case "newest": {
            const aId = parseInt(a.id, 10);
            const bId = parseInt(b.id, 10);
            comparison = bId - aId;
            break;
          }

          case "popularity": {
            const aCount = a.reviewCount ?? 0;
            const bCount = b.reviewCount ?? 0;
            comparison = bCount - aCount;
            break;
          }

          default: {
            const aName = normalizeString(a.name);
            const bName = normalizeString(b.name);
            comparison = aName.localeCompare(bName);
          }
        }

        return comparison;
      });
    }

    return filtered;
  }
);

export const selectFilterCounts = createSelector(
  [selectAllProducts],
  (products) => {
    const categories = new Map<string, number>();
    const brands = new Map<string, number>();
    const tags = new Map<string, number>();

    products.forEach((product) => {
      categories.set(
        product.category,
        (categories.get(product.category) || 0) + 1
      );
      brands.set(product.brand, (brands.get(product.brand) || 0) + 1);
      product.tags?.forEach((tag) => {
        tags.set(tag, (tags.get(tag) || 0) + 1);
      });
    });

    return { categories, brands, tags };
  }
);

export const selectRelatedProducts = createSelector(
  [
    selectAllProducts,
    (state: RootState, productId: string) =>
      selectProductById(state, productId),
    (state: RootState, productId: string, options: RelatedProductsOptions) =>
      options,
  ],
  (allProducts, currentProduct, options) => {
    if (!currentProduct) {
      return [];
    }
    let filtered = allProducts;

    if (options.excludeCurrent) {
      filtered = filtered.filter((product) => product.id !== currentProduct.id);
    }

    if (options.matchBy) {
      switch (options.matchBy) {
        case "category": {
          filtered = filtered.filter(
            (product) => product.category === currentProduct.category
          );
          break;
        }

        case "brand": {
          filtered = filtered.filter(
            (product) => product.brand === currentProduct.brand
          );
          break;
        }

        case "tags": {
          filtered = filtered.filter((product) =>
            product.tags?.some((tag) => currentProduct.tags?.includes(tag))
          );
          break;
        }
        case "both": {
          filtered = filtered.filter(
            (product) =>
              product.category === currentProduct.category &&
              product.brand === currentProduct.brand
          );
          break;
        }
      }
    }
    if (options.sortBy === "random") {
      filtered = [...filtered];
      for (let i = filtered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
      }
    } else {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;

        switch (options.sortBy) {
          case "price": {
            comparison = a.price - b.price;
            break;
          }

          case "rating": {
            const aRating = a.rating ?? 0;
            const bRating = b.rating ?? 0;
            comparison = bRating - aRating;
            break;
          }

          case "popularity": {
            const aCount = a.reviewCount ?? 0;
            const bCount = b.reviewCount ?? 0;
            comparison = bCount - aCount;
            break;
          }

          default: {
            const aName = normalizeString(a.name);
            const bName = normalizeString(b.name);
            comparison = aName.localeCompare(bName);
          }
        }

        return comparison;
      });
    }

    if (filtered.length === 0 && options?.fallback) {
      filtered = allProducts
        .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
        .slice(0, options.limit ?? 6);
    }

    return filtered.slice(0, options.limit ?? 6);
  }
);

export const selectFilteredProductsCount = createSelector(
  [selectFilteredProducts],
  (products) => products.length
);

export const selectHotDrops = createSelector(
  [selectAllProducts, (state: RootState, limit: number = 8) => limit],
  (products, limit) => {
    return products
      .filter((p) => p.badge === "Hot" || p.badge === "Trending")
      .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)) // Sort by popularity
      .slice(0, limit);
  }
);

export const selectLatestDrops = createSelector(
  [selectAllProducts, (state: RootState, limit: number = 8) => limit],
  (products, limit) => {
    return products
      .filter((p) => p.badge === "New" || p.featured)
      .sort((a, b) => {
        // Sort by ID descending (newer = higher ID in our mock data)
        const aId = parseInt(a.id, 10);
        const bId = parseInt(b.id, 10);
        return bId - aId;
      })
      .slice(0, limit);
  }
);

export const selectFeaturedProducts = createSelector(
  [selectAllProducts, (state: RootState, limit: number = 6) => limit],
  (products, limit) => {
    return products
      .filter((p) => p.featured)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)) // Sort by rating
      .slice(0, limit);
  }
);

export const selectSaleProducts = createSelector(
  [selectAllProducts, (state: RootState, limit: number = 12) => limit],
  (products, limit) => {
    return products
      .filter((p) => p.originalPrice && p.originalPrice > p.price)
      .sort((a, b) => {
        // Sort by discount percentage (highest discount first)
        const aDiscount =
          ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
        const bDiscount =
          ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
        return bDiscount - aDiscount;
      })
      .slice(0, limit);
  }
);

export const selectBestSellers = createSelector(
  [selectAllProducts, (state: RootState, limit: number = 8) => limit],
  (products, limit) => {
    return products
      .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
      .slice(0, limit);
  }
);

export const selectTopRated = createSelector(
  [selectAllProducts, (state: RootState, limit: number = 8) => limit],
  (products, limit) => {
    return products
      .filter((p) => p.rating && p.rating >= 4.5)
      .sort((a, b) => {
        // Sort by rating first, then by review count
        const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0);
        if (ratingDiff !== 0) return ratingDiff;
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      })
      .slice(0, limit);
  }
);

export const selectFilters = createSelector(
  (state: RootState) => state.products,
  (products) => products.filters
);

export const selectStatus = createSelector(
  (state: RootState) => state.products,
  (products) => products.status
);

export const {
  productAdded,
  loadProducts,
  clearRating,
  loadProductsFailure,
  loadProductsSuccess,
  clearBrands,
  setMinRating,
  clearCategories,
  toggleBrand,
  toggleCategory,
  setBrandsFilter,
  productsReceived,
  productUpdated,
  toggleTags,
  setTagsFilter,
  clearTags,
  productRemoved,
  clearFilter,
  clearPriceFilter,
  setCategoriesFilter,
  setPriceFilter,
  setSortBy,
  setQuery,
} = productsSlice.actions;

export default productsSlice.reducer;
