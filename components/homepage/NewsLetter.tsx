"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Newsletter() {
  return (
    <section className="my-8 relative max-w-6xl h-[500px] overflow-hidden items-end grid grid-cols-2 mx-auto  text-white rounded-lg">
      <div className="relative p-12 z-2 ">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Our New Stuff?</h2>
        <p className="text-gray-300 mb-8">
          Auvé for Homes and Heads.
          <br />
          Subscribe to our newsletter to get the best products, and then create
          a handout smart EV category selection that&apos;s right for you.
        </p>
        <div className="flex space-x-4">
          <Input
            type="email"
            placeholder="Your Email"
            className="flex-1 px-4 py-5 rounded text-white placeholder:text-gray-200"
          />
          <Button className="bg-white text-gray-900 px-6 py-5 rounded font-semibold hover:bg-gray-100 transition-colors">
            Send
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 absolute rounded-lg inset-0 top-40"></div>
      <div className="relative h-full z-8">
        <Image
          fill
          src={"/ads/womansuit.png"}
          alt="woman in a suit"
          className="object-contain h-full"
        />
      </div>
    </section>
  );
}
