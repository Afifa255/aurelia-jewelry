import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Collections — Aurelia" },
      { name: "description", content: "Explore Aurelia's collections: Rings, Necklaces, Earrings, Bracelets, and Watches." },
      { property: "og:title", content: "Collections — Aurelia" },
      { property: "og:description", content: "Explore Aurelia's fine jewelry collections." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Maison</p>
        <h1 className="font-display text-5xl md:text-6xl">Collections</h1>
        <div className="luxury-divider w-24 mx-auto mt-8" />
        <p className="mt-8 max-w-2xl mx-auto text-muted-foreground">
          Five disciplines, one century of craft. Each collection is hand-finished
          in our Parisian atelier and signed by the master jeweler who completed it.
        </p>
      </div>

      <div className="grid gap-8 md:gap-10">
        {categories.map((cat, idx) => {
          const sample = products.find((p) => p.category === cat)!;
          const count = products.filter((p) => p.category === cat).length;
          const reverse = idx % 2 === 1;
          return (
            <Link
              key={cat}
              to="/shop"
              search={{ category: cat }}
              className={`group grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                reverse ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-card md:[direction:ltr]">
                <img
                  src={sample.image}
                  alt={cat}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="md:[direction:ltr]">
                <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
                  0{idx + 1} · {count} pieces
                </p>
                <h2 className="font-display text-4xl md:text-5xl mb-6 group-hover:text-primary transition-colors">
                  {cat}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                  {descriptions[cat]}
                </p>
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary border-b border-primary/40 pb-1 group-hover:border-primary">
                  Discover {cat}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const descriptions: Record<string, string> = {
  Rings: "From solitaires to eternity bands — diamond, sapphire, and emerald, set by hand in 18k gold and platinum.",
  Necklaces: "Pendants, strands, and statement pieces. Hand-knotted pearls, fine gold chains, and rare colored stones.",
  Earrings: "Studs, drops, and chandeliers, weighted to sit perfectly. Designed for both the everyday and the unforgettable.",
  Bracelets: "Tennis bracelets, sculpted bangles, and cuffs. Continuous lines of light, made to stack or stand alone.",
  Watches: "Swiss automatic movements housed in 18k gold and platinum cases. Engineered for a lifetime of wear.",
};