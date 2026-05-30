import ring1 from "@/assets/ring-1.jpg";
import ring2 from "@/assets/ring-2.jpg";
import ring3 from "@/assets/ring-3.jpg";
import necklace1 from "@/assets/necklace-1.jpg";
import necklace2 from "@/assets/necklace-2.jpg";
import necklace3 from "@/assets/necklace-3.jpg";
import earring1 from "@/assets/earring-1.jpg";
import earring2 from "@/assets/earring-2.jpg";
import bracelet1 from "@/assets/bracelet-1.jpg";
import bracelet2 from "@/assets/bracelet-2.jpg";
import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";

export type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets" | "Watches";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
}

export const categories: Category[] = ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"];

export const products: Product[] = [
  {
    id: "celeste-solitaire",
    name: "Céleste Solitaire Ring",
    price: 4850,
    category: "Rings",
    image: ring1,
    description:
      "A brilliant-cut diamond crowned on 18k yellow gold. The Céleste is our most timeless silhouette — a singular stone, suspended in light.",
  },
  {
    id: "eternite-band",
    name: "Éternité Rose Gold Band",
    price: 6200,
    category: "Rings",
    image: ring2,
    description:
      "Seven brilliant diamonds set in a continuous arc of 18k rose gold. A modern eternity band designed to be worn forever.",
  },
  {
    id: "azure-halo",
    name: "Azure Halo Sapphire Ring",
    price: 7400,
    category: "Rings",
    image: ring3,
    description:
      "A 2.1ct Ceylon sapphire framed by a double halo of pavé diamonds in white gold. Cool, regal, and quietly arresting.",
  },
  {
    id: "lumiere-pendant",
    name: "Lumière Diamond Pendant",
    price: 2980,
    category: "Necklaces",
    image: necklace1,
    description:
      "A hexagonal diamond suspended from a fine 18k gold chain. Designed to catch the light at the hollow of the throat.",
  },
  {
    id: "perla-strand",
    name: "Perla Akoya Strand",
    price: 3650,
    category: "Necklaces",
    image: necklace2,
    description:
      "Hand-knotted Akoya pearls graded for luster, finished with a signed 18k gold clasp set with brilliant accents.",
  },
  {
    id: "verde-emerald",
    name: "Verde Emerald Necklace",
    price: 8900,
    category: "Necklaces",
    image: necklace3,
    description:
      "A 5.4ct Colombian emerald in pear cut, framed in 18k yellow gold and flanked by emerald-set chain stations.",
  },
  {
    id: "goutte-pearl",
    name: "Goutte Pearl Drops",
    price: 1450,
    category: "Earrings",
    image: earring1,
    description:
      "Baroque drop pearls on 18k gold French hooks. Quiet, weightless, made for the everyday and the unforgettable.",
  },
  {
    id: "etoile-stud",
    name: "Étoile Diamond Studs",
    price: 3200,
    category: "Earrings",
    image: earring2,
    description:
      "1.5ct total weight, four-prong brilliant-cut studs in platinum. The single most-worn pair in any collection.",
  },
  {
    id: "lumen-tennis",
    name: "Lumen Tennis Bracelet",
    price: 5600,
    category: "Bracelets",
    image: bracelet1,
    description:
      "Forty-two brilliant diamonds in seamless bezel settings of 18k gold. A continuous line of light around the wrist.",
  },
  {
    id: "ondes-bangle",
    name: "Ondes Pavé Bangle",
    price: 4200,
    category: "Bracelets",
    image: bracelet2,
    description:
      "Sculpted 18k yellow gold cuff with a wave of cognac and white diamonds. Sold as a single bangle; designed to stack.",
  },
  {
    id: "meridien-classic",
    name: "Méridien Classic Watch",
    price: 9800,
    category: "Watches",
    image: watch1,
    description:
      "A 38mm 18k gold case with a champagne dial and hand-stitched alligator strap. Swiss automatic movement.",
  },
  {
    id: "soleil-diamond",
    name: "Soleil Diamond Watch",
    price: 14500,
    category: "Watches",
    image: watch2,
    description:
      "Rose gold bracelet watch with a fully diamond-set bezel and mother-of-pearl dial. Swiss automatic, 32mm.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);