export type Editorial = {
  slug: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  quote?: string;
};

export const editorials: Editorial[] = [
  {
    slug: "the-new-language-of-occasionwear",
    eyebrow: "The styling report",
    title: "The new language of occasionwear",
    excerpt: "Less ceremony, more character: a considered approach to dressing for the moments that matter.",
    image: "/products/weddingredDress.jpeg",
    date: "June 24, 2026",
    readTime: "6 min read",
    intro: "Modern occasionwear is no longer a uniform. It is a conversation between ease and intention—pieces with enough presence for the room, and enough personality to feel entirely your own.",
    sections: [
      { heading: "Begin with the feeling", paragraphs: ["Before colour or silhouette, decide how you want to feel. A fluid dress carries a different confidence from precise tailoring; neither is more formal, only more personal.", "Choose one element to lead the look. A sculptural neckline, unusual texture or generous proportion can do the work while everything around it remains quiet."] },
      { heading: "Let contrast create character", paragraphs: ["The most memorable combinations rarely arrive as a complete set. Pair polish with something lived-in: silk with a clean flat, a tailored jacket over an unfussy column dress, or a striking accessory against a tonal base."] },
      { heading: "Buy beyond the invitation", paragraphs: ["A piece earns its place when it survives the event. Look for adaptable proportions, thoughtful finishing and a fabric you will want to meet again. The best occasionwear returns in a different context, styled with less ceremony each time."] },
    ],
    quote: "The dress code matters less than the sense of self you bring to it.",
  },
  {
    slug: "movement-is-part-of-the-design",
    eyebrow: "In motion",
    title: "Movement is part of the design",
    excerpt: "Why drape, weight and rhythm reveal more about a garment than a perfect still frame.",
    image: "/products/squattingmodel.jpeg",
    date: "June 17, 2026",
    readTime: "5 min read",
    intro: "A garment is never truly still. It folds when we sit, changes shape when we walk and catches light differently with every gesture. Understanding movement makes online discovery more honest—and more useful.",
    sections: [
      { heading: "Read the fabric", paragraphs: ["Weight determines the architecture of a piece. Dense cloth holds a line; lighter fabric follows the body. Neither quality is inherently better, but each creates a different relationship with movement.", "Video helps expose that relationship. Watch hems, sleeves and the point where fabric leaves the body: these are often more informative than a front-facing pose."] },
      { heading: "Look beyond the first frame", paragraphs: ["Use still images for colour, construction and close detail. Use motion to understand pace, proportion and ease. Together they provide a fuller view of what may arrive at your door."] },
      { heading: "Style should live", paragraphs: ["The purpose of a look is not to remain composed for a photograph. It should carry you through a day, respond to the environment and become more recognisably yours with wear."] },
    ],
    quote: "Fit is a measurement. Movement is the experience.",
  },
  {
    slug: "independent-hands-shared-marketplace",
    eyebrow: "Seller stories",
    title: "Independent hands, one shared marketplace",
    excerpt: "A closer look at the people, judgement and specialist knowledge behind a considered edit.",
    image: "/products/tobi.jpeg",
    date: "June 8, 2026",
    readTime: "7 min read",
    intro: "A marketplace is most valuable when it preserves the distinct point of view of each seller while making discovery feel coherent for the customer. Aurela is designed around that balance.",
    sections: [
      { heading: "Curation still has an author", paragraphs: ["Every independent seller brings a different eye: knowledge of a material, a community, a silhouette or a way of dressing. The platform should make that expertise legible without fragmenting the shopping experience.", "Clear product information, consistent imagery standards and visible seller context allow individuality to travel with the item."] },
      { heading: "Trust is part of the product", paragraphs: ["Credibility is built through accurate descriptions, transparent fulfilment expectations and responsive aftercare. Marketplace standards are not decoration; they are the infrastructure that lets smaller sellers compete on quality."] },
      { heading: "One destination, many perspectives", paragraphs: ["Customers should not have to choose between discovery and clarity. The goal is a single, calm destination where distinct sellers can be found, compared and understood on equal terms."] },
    ],
    quote: "A shared standard should strengthen a seller’s point of view, not erase it.",
  },
];

export function getEditorial(slug: string) {
  return editorials.find((article) => article.slug === slug);
}
