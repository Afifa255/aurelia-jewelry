import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia — Fine Jewelry, Hand-Finished in Paris" },
      { name: "description", content: "Heirloom diamond, gold, and pearl jewelry from the Aurelia atelier. Shop rings, necklaces, earrings, bracelets, and watches." },
      { property: "og:title", content: "Aurelia — Fine Jewelry" },
      { property: "og:description", content: "Heirloom diamond, gold, and pearl jewelry, hand-finished in our Parisian atelier." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  return (
    <div>
      {/* HERO */}
      <section className="relative -mt-20 h-screen min-h-[680px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Aurelia diamond necklace on black silk"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6 animate-fade-in">
                Maison Aurelia · Est. 1924
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground animate-fade-in">
                Light, set <br />
                <span className="italic gradient-gold">in eternity.</span>
              </h1>
              <p className="mt-8 max-w-lg text-base text-muted-foreground leading-relaxed animate-fade-in">
                A century of fine jewelry, hand-finished in our Parisian atelier.
                Discover the new collection — diamond, gold, and pearl, designed to be inherited.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 animate-fade-in">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-primary/90 transition-all shadow-gold"
                >
                  Shop Collection
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-10 py-4 border border-primary/40 text-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-primary/10 transition-all"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-28 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Collections</p>
            <h2 className="font-display text-4xl md:text-5xl">Crafted to be Treasured</h2>
            <div className="luxury-divider w-24 mx-auto mt-8" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {categories.map((cat) => {
              const sample = products.find((p) => p.category === cat)!;
              return (
                <Link
                  key={cat}
                  to="/shop"
                  search={{ category: cat }}
                  className="group relative aspect-[3/4] overflow-hidden bg-card border border-border/40"
                >
                  <img
                    src={sample.image}
                    alt={cat}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                    <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                      {cat}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-28 bg-card/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Featured</p>
              <h2 className="font-display text-4xl md:text-5xl">New Arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="text-xs tracking-[0.3em] uppercase text-primary border-b border-primary/40 pb-1 hover:border-primary"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">The Aurelia Promise</p>
          <p className="font-display text-3xl md:text-4xl leading-tight text-foreground">
            "Every Aurelia piece is hand-finished by a single master jeweler,
            signed, and accompanied by a lifetime guarantee."
          </p>
          <div className="luxury-divider w-24 mx-auto mt-10" />
          <p className="mt-6 text-sm tracking-[0.25em] uppercase text-muted-foreground">— Hélène Aurelia, Atelier Directrice</p>
        </div>
      </section>
    </div>
  );
}
