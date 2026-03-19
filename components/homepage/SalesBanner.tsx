import Image from "next/image";
import { Button } from "../ui/button";

const AngledColumnsGallery = () => {
  const DATA = [
    "/products/women.jpeg",
    "/products/kids.jpeg",
    "/products/men.jpeg",
  ];

  return (
    <section className="py-16 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="skew grid grid-cols-6 filter-[drop-shadow(2px_2px_5px_#000)] text-white rounded-2xl relative overflow-hidden">
          <div className="clip col-span-3 gallery-section">
            <div className="text-sm font-medium mb-2">20% OFF</div>
            <h2 className="text-4xl font-bold mb-4">Summer Sale</h2>
            <div className="text-sm mb-6">15 Nov To 7 Dec</div>
            <Button className="bg-white text-red-400 rounded-full w-45">
              Shop Now
            </Button>
          </div>

          {DATA.map((code, idx) => (
            <div key={idx} className="relative gallery-img">
              <Image
                fill
                className="object-cover object-top-left"
                src={code}
                alt={`Gallery image ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AngledColumnsGallery;
