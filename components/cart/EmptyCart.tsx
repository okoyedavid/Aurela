import React from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const EmptyCart: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-4xl border border-border bg-card">
          <div className="p-6">
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto mb-6 h-14 w-14 text-muted-foreground" />
              <h3 className="mb-3 text-4xl font-semibold tracking-[-.04em] text-card-foreground">
                Your bag is waiting
              </h3>
              <p className="mb-8 text-muted-foreground">
                {"  Looks like you haven't added any items to your cart yet."}
              </p>
              <Button asChild className="rounded-full px-7">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
