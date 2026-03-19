"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reviews } from "@/data/products";
import { ProductPage } from "@/types/products";
import { motion } from "framer-motion";
import { toast } from "sonner";
import ProductReviews from "./ProductReviews";

export default function ProductDetails({ product }: ProductPage) {
  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-16"
    >
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({productReviews.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {product.tags.map((tag) => (
                      <li key={tag} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b last:border-b-0"
                  >
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <ProductReviews
            reviews={productReviews}
            averageRating={product.rating}
            totalReviews={product.reviewCount}
            onHelpfulClick={(reviewId) => {
              toast("Thank you!", {
                description: "Your feedback helps other customers.",
              });
            }}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
