"use client";
import Categories from "@/components/homepage/category-grid";
import Hero from "@/components/homepage/hero";
import NewDrops from "@/components/homepage/new-drops";
import Newsletter from "@/components/homepage/newsletter-form";
import Recommendations from "@/components/homepage/recommendations";
import SalesBanner from "@/components/homepage/sales-banner";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/site-footer";
import ReelsTeaser from "@/components/homepage/reels-teaser";

const Page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <NewDrops />
      <ReelsTeaser />
      <SalesBanner />
      <Recommendations />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Page;
