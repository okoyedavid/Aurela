import { ProductProps } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

export default function EditorialProductCard({
  product,
  length,
  index,
}: {
  product: ProductProps;
  length?: number;
  index?: number;
}) {
  let spantwo = false;
  if (length)
    spantwo = index === 0 ? true : index === length - 1 ? true : false;

  return (
    <Link
      href={`/products/${product.id}`}
      className={`${spantwo && "col-span-2"} group`}
    >
      <div className="relative w-full h-96 overflow-hidden rounded-lg mb-4">
        <Image
          src={product.image}
          fill
          alt={product.name}
          className="object-cover object-top-left group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute inset-0 bg-linear-to-b ${
            length ? "from-black/30 to-black" : "from-transparent to-black/50"
          } z-3`}
        ></div>

        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.category}
        </div>

        {length && (
          <div className="z-4 absolute inset-0 flex items-end p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold text-muted">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-200 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {!length && (
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-black">{product.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-black">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
