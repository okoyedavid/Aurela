"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const imageSets = {
  men: ["/auth/men-2.jpg", "/auth/men-3.jpg"],
  women: ["/auth/women.jpg", "/auth/women-2.jpg", "/auth/women-4.jpg"],
};

export default function AuthHeroImage({
  set,
}: {
  set: keyof typeof imageSets;
}) {
  const images = imageSets[set];
  const [src, setSrc] = useState(images[0]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSrc(images[Math.floor(Math.random() * images.length)]);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [images]);

  return (
    <Image
      src={src}
      alt="Aurela editorial fashion"
      fill
      priority
      className="object-cover object-top-left"
    />
  );
}
