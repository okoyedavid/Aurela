import React, { useState } from "react";
import { Star, ThumbsUp, Verified } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ProductReviewsProps {
  reviews: any[];
  averageRating: number;
  totalReviews: number;
  onHelpfulClick?: (reviewId: string) => void;
  className?: string;
}

export default function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
  onHelpfulClick,
  className = "",
}: ProductReviewsProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      totalReviews > 0
        ? (reviews.filter((review) => review.rating === rating).length /
            totalReviews) *
          100
        : 0,
  }));

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClass = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    }[size];

    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClass} ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Average Rating */}
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center">
            {renderStars(averageRating, "lg")}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm">{rating}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
              </div>
              <Progress value={percentage} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>

          <div className="space-y-4">
            {displayedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Review Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={review.userAvatar}
                            alt={review.userName}
                          />
                          <AvatarFallback>
                            {review.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{review.userName}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Verified className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(review.date), "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="space-y-2">
                      {review.title && (
                        <h5 className="font-medium">{review.title}</h5>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => onHelpfulClick?.(review.id)}
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show More/Less Button */}
          {reviews.length > 3 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews
                  ? "Show Less Reviews"
                  : `Show All ${reviews.length} Reviews`}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* No Reviews State */}
      {reviews.length === 0 && (
        <div className="text-center py-8">
          <div className="text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </div>
          <Button className="mt-4">Write a Review</Button>
        </div>
      )}
    </div>
  );
}
