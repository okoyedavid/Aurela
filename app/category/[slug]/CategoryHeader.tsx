"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryPage } from "@/types/category";
import { motion } from "framer-motion";
import { ArrowLeft, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryHeader({ category }: CategoryPage) {
  return (
    <div className="relative bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center lg:text-left p-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Products
              </Button>
            </Link>
            <span className="text-muted-foreground">/</span>
            <Badge className="px-2 py-1" variant="outline">
              {category.name}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>

          {category.description && (
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {category.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {category.productCount} products
              </span>
            </div>
            {category.featured && <Badge>Featured Category</Badge>}
          </div>
        </motion.div>

        {category.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="shrink-0 relative min-h-[400px] h-full w-full overflow-hidden "
          >
            <div className="absolute inset-0 bg-linear-to-r from-gray-50  to-transparent z-10"></div>
            <Image
              fill
              src={category.image}
              alt={category.name}
              className="object-cover object-top-left"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
