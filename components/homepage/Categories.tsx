import Image from "next/image";
import { Button } from "../ui/button";

export default function Categories() {
  return (
    <section className="py-16 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {categoriesCard.map((card, index) => (
            <div
              key={index}
              className="skew grid grid-cols-2 filter-[drop-shadow(2px_2px_5px_#000)] text-white rounded-2xl relative overflow-hidden"
            >
              <div className="clip gallery-section">
                <div className="text-sm font-medium mb-2">{card.title}</div>
                <h2 className="text-2xl font-bold mb-4">{card.subtitle}</h2>
                <Button className="bg-white hover:bg-muted text-red-400 rounded-full w-auto max-w-md">
                  Shop Now
                </Button>
              </div>

              <div className="relative flex-1 gallery-img">
                <Image
                  fill
                  className="object-cover object-top-right"
                  src={card.image}
                  alt={`Gallery image`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const categoriesCard = [
  {
    title: "New Arrival",
    subtitle: "DRESS",
    image: "/categories/shoes.jpeg",
  },
  {
    title: "Limited",
    subtitle: "SHOES",
    image: "/categories/dress.jpeg",
  },
  {
    title: "Classic",
    subtitle: "SUIT",

    image: "/categories/suits.jpeg",
  },
  {
    title: "Essential",
    subtitle: "BAG",

    image: "/categories/handBag.jpeg",
  },
  {
    title: "Hot",
    subtitle: "ACCESSORY",
    image: "/categories/watch.jpeg",
  },
  {
    title: "Featured",
    subtitle: "JACKET",
    image: "/categories/jacket.jpeg",
  },
];
