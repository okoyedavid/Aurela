"use client";
import Categories from "@/components/homepage/Categories";
import Hero from "@/components/homepage/hero";
import NewDrops from "@/components/homepage/new-drops";
import Newsletter from "@/components/homepage/NewsLetter";
import Recommendations from "@/components/homepage/recommendations";
import SalesBanner from "@/components/homepage/SalesBanner";
import Navbar from "@/components/navBar";
import Footer from "@/components/navigation/Footer";
import ReelsTeaser from "@/components/homepage/ReelsTeaser";

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
