"use client";
import Image from "next/image";
import clsx from "clsx";
import { colord, random } from "colord";

interface FashionCardProps {
  title: string;
  subtitle: string;
  image: string;
}

const base = random(); // random color
const palette = [
  base.toHex(),
  base.lighten(0.2).toHex(),
  base.darken(0.2).toHex(),
  base.saturate(0.3).toHex(),
];

function getColorFromTitle(title: string) {
  let sum = 0;
  for (let i = 0; i < title.length; i++) sum += title.charCodeAt(i);
  return palette[sum % palette.length];
}

export default function FashionCard({
  title,
  subtitle,
  image,
}: FashionCardProps) {
  const bgColor = getColorFromTitle(title);

  return (
    <figure
      style={{ backgroundColor: bgColor }}
      className={clsx(
        "relative overflow-hidden text-left text-white shadow-md rounded-md cursor-pointer group w-full min-h-[220px]"
      )}
    >
      <Image
        src={image}
        alt={title}
        width={310}
        height={220}
        className="absolute inset-0 w-full h-full object-top-left object-cover opacity-30 grayscale transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:grayscale-0"
      />

      <div className="absolute h-7 w-7 flex items-center justify-center bg-black text-center rounded-full m-1 right-0">
        <span className="font-extrabold ">{subtitle}</span>
      </div>
      <figcaption className="absolute bottom-5 left-5 right-5 bg-black/90 p-2 text-center transition-all duration-500 ease-in-out group-hover:bg-black/70">
        <h3 className="uppercase text-md tracking-tight font-normal mb-1">
          {title}
        </h3>
      </figcaption>
    </figure>
  );
}
