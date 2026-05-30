import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type ShopSearch = { category?: Category | "All" };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => {
    const c = s.category;
    if (typeof c === "string" && (c === "All" || (categories as string[]).includes(c))) {
      return { category: c as Category | "All" };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Shop the Collection — Aurelia" },
      { name: "description", content: "Browse Aurelia's fine jewelry: rings, necklaces, earrings, bracelets, and watches." },
      { property: "og:title", content: "Shop the Collection — Aurelia" },
      { property: "og:description", content: "Browse Aurelia's fine jewelry collection." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { category } = Route.useSearch();
  const [active, setActive] = useState<Category | "All">(category ?? "All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = active === "All" || p.category === active;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">The Collection</p>
        <h1 className="font-display text-5xl md:text-6xl">Shop Aurelia</h1>
        <div className="luxury-divider w-24 mx-auto mt-8" />
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jewelry..."
          className="w-full bg-card border border-border/60 pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-5 py-2 text-[11px] tracking-[0.25em] uppercase border transition-all ${
              active === c
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/60 text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No pieces found.{" "}
          <Link to="/shop" className="text-primary underline">View all</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}