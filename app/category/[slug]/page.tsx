import ProductListing from "@/components/products/ProductListing";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import Subcategories from "./Subcategories";
import CategoryHeader from "./CategoryHeader";

const HomePage = async ({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ q?: string; subcategory?: string }> }) => {
  const routeParams = await params;
  const currentSlug = routeParams.slug;

  const category = categories.find((cat) => cat.slug === currentSlug);
  const query = await searchParams;

  if (!category) {
    return (
      <div className="container min-h-screen flex items-center justify-center mx-auto px-4 py-8">
        <div className="text-center space-y-4 w-full">
          <Package className="w-16 h-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Category Not Found</h1>
          <p className="text-muted-foreground">
            {" The category you're looking for doesn't exist."}
          </p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CategoryHeader category={category} />
      <Subcategories category={category.name} />
      <div id="collection" className="scroll-mt-20 pb-12">
        <ProductListing categoryFilter={category.name} subcategoryFilter={query.subcategory} initialQuery={query.q} />
      </div>
    </div>
  );
};

export default HomePage;
